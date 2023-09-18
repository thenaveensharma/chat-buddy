import { Box, IconButton, Spinner, Text } from "@chakra-ui/react";
import { ChatState } from "../../Context/ChatProvider";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender } from "../../Config";
import { useState } from "react";

const ChatBox = () => {
  const { user, selectedChat, setSelectedChat } = ChatState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMessages, setNewMessages] = useState([]);
  return selectedChat ? (
    <Box width={"full"}>
      <Text
        fontSize={{ base: "28px", md: "30px" }}
        pb={3}
        px={2}
        w="100%"
        display="flex"
        justifyContent={{ base: "space-between" }}
        alignItems="center"
        color={"white"}
      >
        <IconButton
          d={{ base: "flex", md: "none" }}
          icon={<ArrowBackIcon />}
          onClick={() => setSelectedChat("")}
          bgColor={"gray.600"}
        />
        <span>
          {selectedChat.isGroupChat
            ? selectedChat?.chatName?.toUpperCase()
            : getSender(user, selectedChat?.users)?.name?.toUpperCase()}
        </span>
      </Text>
      <Box
        d="flex"
        flexDir="column"
        justifyContent="flex-end"
        padding={3}
        marginLeft={3}
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
        bgColor={"gray.900"}
      >
        {loading ? (
          <Spinner size="xl" w={20} h={20} margin="auto" />
        ) : (
          <h1>chats</h1>
        )}
      </Box>
    </Box>
  ) : (
    <Box
      width={"full"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Text fontSize={"2em"} color={"gray.300"}>
        Select a user to start chatting...
      </Text>
    </Box>
  );
};

export default ChatBox;
