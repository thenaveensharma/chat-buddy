import {
  Box,
  FormControl,
  IconButton,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { io } from "socket.io-client";
// import { Box, IconButton, Spinner, Text } from "@chakra-ui/react";
import { ChatState } from "../../Context/ChatProvider";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender } from "../../Config";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import ScrollableMessages from "../../components/ScrollableMessages";
var socket, selectedChatCompare;
const ChatBox = () => {
  const toast = useToast();
  const { user, selectedChat, setSelectedChat } = ChatState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typer, setTyper] = useState(null);

  const sendMessage = useCallback(
    async (e) => {
      try {
        if (e.key == "Enter" && newMessage) {
          const config = {
            headers: {
              Authorization: `Bearer ${user?.accessToken}`,
            },
          };
          setNewMessage("");
          const { data } = await axios.post(
            `/api/message`,
            {
              content: newMessage,
              chatId: selectedChat?._id,
            },
            config,
          );
          setMessages([...messages, data]);
          socket.emit("send message", data);
        }
      } catch (error) {
        toast({
          title: "Error fetching the messages",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    },
    [toast, user?.accessToken, messages, newMessage, selectedChat?._id],
  );

  const fetchMessages = useCallback(async () => {
    try {
      if (!selectedChat) return;
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      };
      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config,
      );
      setMessages(data);
      setLoading(false);
      socket.emit("join room", selectedChat._id);
      selectedChatCompare = selectedChat._id;
    } catch (error) {
      toast({
        title: "Error fetching the messages",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [toast, user?.accessToken, selectedChat]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  useEffect(() => {
    socket = io("http://localhost:3000/");
    socket.emit("setup", user);
    socket.on("connected", () => {
      console.log("Socket is connected");
      setSocketConnected(true);
    });
    return () => {
      socket.off("setup", user);
      socket.disconnect();
    };
  }, [selectedChat, user]);
  const typingHandler = useCallback(
    async (e) => {
      try {
        setNewMessage(e.target.value);
        if (!socketConnected) return;
        socket.emit("start typing", {
          chat: selectedChat,
          user: user,
        });

        let lastTypingTime = new Date().getTime();
        var typingLength = 1000;
        setTimeout(() => {
          let currentTime = new Date().getTime();
          let diff = currentTime - lastTypingTime;
          if (diff > typingLength) {
            socket.emit("send stop typing", { chat: selectedChat });
          }
        }, typingLength);
      } catch (error) {
        console.log(error);
      }
    },
    [user, selectedChat, socketConnected],
  );

  useEffect(() => {
    socket.on("message recieved", (message) => {
      if (!selectedChatCompare || selectedChatCompare !== message.chat._id) {
        //send notification
        console.log("send notification");
      } else {
        setMessages([...messages, message]);
      }
    });
  });
  useEffect(() => {
    socket.on("recieve typing", ({ chat, user }) => {
      if (selectedChatCompare || selectedChatCompare === chat._id) {
        setTyper(user);
      }
    });
  });
  useEffect(() => {
    socket.on("recieve stop typing", ({ chat }) => {
      if (selectedChatCompare || selectedChatCompare === chat._id) {
        setTyper(null);
      }
    });
  });

  return selectedChat ? (
    <Box
      bgColor={"black"}
      borderRadius={"xl"}
      width={"100%"}
      height={"98vh"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
      padding={"1"}
    >
      <Text
        fontSize={{ base: "28px", md: "30px" }}
        display="flex"
        pb={1}
        px={2}
        justifyContent={{ base: "space-between" }}
        alignItems="center"
        borderBottom={"1px solid white"}
      >
        <IconButton
          display={["flex", "flex", "flex", "none"]}
          icon={<ArrowBackIcon />}
          onClick={() => setSelectedChat("")}
          bgColor={"gray.600"}
        />
        <span>
          {selectedChat?.isGroupChat
            ? selectedChat?.chatName?.toUpperCase()
            : getSender(user, selectedChat?.users)?.name?.toUpperCase()}
        </span>
      </Text>
      <ScrollableMessages messages={messages} loading={loading} />
      <FormControl
        onKeyDown={sendMessage}
        isRequired={true}
        bottom={"0px"}
        padding={2}
        bgColor={loading ? "black" : "black"}
      >
        {typer ? <label>{`${typer?.name} is typing...`}</label> : null}

        <Input
          value={newMessage}
          placeholder="Enter a message"
          onChange={typingHandler}
        />
      </FormControl>
    </Box>
  ) : (
    <Box
      width="full"
      height={"98vh"}
      display={["none", "none", "none", "flex"]}
      alignItems={"center"}
      justifyContent={"center"}
    >
      Please select a chat to start messaging
    </Box>
  );
};

export default ChatBox;
