import {
  FormControl,
  Box,
  Input,
  InputLeftAddon,
  InputGroup,
  Icon,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";
import { memo, useCallback, useEffect, useState } from "react";
import { getSender } from "../../Config";
import SingleChat from "../../components/SingleChat";

const MyChats = memo(function MyChats() {
  const { selectedChat, user, chats, setChats } = ChatState();
  const toast = useToast();
  const [filteredChats, setFilteredChats] = useState([]);
  const [searchValue, setSearchValue] = useState("");
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

  function handleSearch(e) {
    let value = e.target.value;
    setSearchValue(value);
    const filtered = chats.filter((chat) => {
      return chat.isGroupChat
        ? chat.name.toLowerCase().includes(value)
        : getSender(user, chat.users).name.toLowerCase().includes(value);
    });
    setFilteredChats(filtered);
  }
  return chats ? (
    <Box
      width={["100%", "100%", "100%", "40%"]}
      height={"95vh"}
      borderRight={"1px"}
      borderColor={"black"}
      display={[
        selectedChat ? "none" : "block",
        selectedChat ? "none" : "block",
        selectedChat ? "none" : "block",
        "block",
      ]}
    >
      <FormControl>
        <InputGroup>
          <InputLeftAddon bg={"none"}>
            <Icon as={BsSearch} width={4} height={4} />
          </InputLeftAddon>

          <Input
            id="search"
            type="text"
            placeholder="Search"
            onChange={handleSearch}
          />
        </InputGroup>
      </FormControl>
      <Box
        overflowY={"auto"}
        maxH={"95vh"}
        width={"100%"}
        className="hide_scrollbar"
      >
        <VStack marginTop={"3"}>
          <SingleChat chats={searchValue ? filteredChats : chats} />
        </VStack>
      </Box>
    </Box>
  ) : null;
});

export default MyChats;
