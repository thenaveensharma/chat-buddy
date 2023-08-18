import { Box, HStack } from "@chakra-ui/react";
import SideBar from "../../components/SideBar";
import { ChatState } from "../../Context/ChatProvider";
import MyChats from "./MyChats";
import ChatBox from "./ChatBox";
const Chats = () => {
  const { user } = ChatState();
  return (
    <Box bg={"black"} display={"flex"}>
      {user && <SideBar />}
      <Box
        padding={"4"}
        w={"full"}
        margin={"1%"}
        bg={"gray.700"}
        marginY={"0"}
        borderLeftRadius={"xl"}
      >
        <HStack>
          {user && <MyChats />}
          {user && <ChatBox />}
        </HStack>
      </Box>
    </Box>
  );
};

export default Chats;
