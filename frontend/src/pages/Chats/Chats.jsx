import { Box } from "@chakra-ui/react";
import SideBar from "../../components/SideBar";
import { ChatState } from "../../Context/ChatProvider";
import MyChats from "./MyChats";
import ChatBox from "./ChatBox";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Chats = () => {
  const { user, setUser } = ChatState();
  const navigate = useNavigate();
  const [fetchAgain, setFetchAgain] = useState(false);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    setUser(userInfo);
    if (!userInfo) navigate("/login");
  }, [navigate, setUser]);
  return (
    user && (
      <Box bg={"black"} display={"flex"}>
        {user && <SideBar setFetchAgain={setFetchAgain} />}
        <Box
          padding={"4"}
          w={"full"}
          margin={"1%"}
          bg={"gray.700"}
          marginY={"0"}
          borderLeftRadius={"xl"}
        >
          <Box display={"flex"}>
            {user && <MyChats fetchAgain={fetchAgain} />}
            {user && <ChatBox setFetchAgain={setFetchAgain} />}
          </Box>
        </Box>
      </Box>
    )
  );
};

export default Chats;
