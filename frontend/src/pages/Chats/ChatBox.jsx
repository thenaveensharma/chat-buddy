import { Box } from "@chakra-ui/react";
import { ChatState } from "../../Context/ChatProvider";

const ChatBox = () => {
  // const { selectedChat } = ChatState();
  const selectedChat = null;
  console.log(
    "🚀 ~ file: ChatBox.jsx:6 ~ ChatBox ~ selectedChat:",
    selectedChat,
  );

  return (
    <Box borderColor={"red"}>
      {selectedChat ? (
        <Box></Box>
      ) : (
        <Box display={"flex"}>
          <h1>Select a user to start chatting</h1>
        </Box>
      )}
    </Box>
  );
};

export default ChatBox;
