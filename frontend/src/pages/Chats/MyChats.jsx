import {
  FormControl,
  Box,
  Input,
  InputLeftAddon,
  InputGroup,
  Icon,
  VStack,
  HStack,
  Avatar,
  Text,
  useToast,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";
import { memo, useCallback, useEffect } from "react";
import { getSender } from "../../Config";

const MyChats = memo(function MyChats() {
  const {
    selectedChat,
    setSelectedChat,
    user,
    // setUser,
    // notification,
    // setNotification,
    chats,
    setChats,
  } = ChatState();
  const toast = useToast();

  const fetchChat = useCallback(async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      };
      const { data } = await axios.get(`/api/chat`, config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [setChats, toast, user]);

  useEffect(() => {
    fetchChat();
  }, [fetchChat]);
  return chats ? (
    <Box w={"30%"} height={"95vh"} borderRight={"1px"} borderColor={"black"}>
      <FormControl>
        <InputGroup>
          <InputLeftAddon bg={"none"}>
            <Icon as={BsSearch} width={4} height={4} />
          </InputLeftAddon>

          <Input id="search" type="text" placeholder="Search" />
        </InputGroup>
      </FormControl>
      <Box
        overflowY={"auto"}
        maxH={"95vh"}
        width={"100%"}
        className="hide_scrollbar"
      >
        <VStack marginTop={"3"}>
          {chats &&
            chats.map((chat, index) => {
              let { chatName, isGroupChat, users, latestMessage } = chat;

              chatName = isGroupChat ? chatName : getSender(user, users).name;

              return (
                <Box
                  height={"80px"}
                  key={index}
                  width={"100%"}
                  padding={"2"}
                  borderRadius={"xl"}
                  onClick={() => setSelectedChat(chat)}
                  _hover={{
                    bgColor: "gray.900",
                  }}
                  bgColor={
                    selectedChat?._id == chat?._id ? "gray.600" : "gray.800"
                  }
                  cursor={"pointer"}
                >
                  <HStack alignItems={"center"}>
                    <Avatar name={chatName} size={"lg"} />
                    <VStack alignItems={"start"}>
                      <Text>{chatName}</Text>
                      <Text color={"gray.500"}>
                        {latestMessage
                          ? latestMessage.content
                          : "Click to send message..."}
                      </Text>
                    </VStack>
                  </HStack>
                </Box>
              );
            })}
        </VStack>
      </Box>
    </Box>
  ) : null;
});

export default MyChats;
