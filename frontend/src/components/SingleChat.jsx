import { Avatar, Box, HStack, Text, VStack } from "@chakra-ui/react";
import { getSender } from "../Config";
import { ChatState } from "../Context/ChatProvider";

const SingleChat = ({ chats }) => {
  const { selectedChat, setSelectedChat, user } = ChatState();
  return (
    chats &&
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
          bgColor={selectedChat?._id == chat?._id ? "gray.600" : "gray.800"}
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
    })
  );
};

export default SingleChat;
