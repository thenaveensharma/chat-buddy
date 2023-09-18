import { createContext, useContext, useEffect, useState } from "react";

const ChatContext = createContext();

// eslint-disable-next-line react/prop-types
export const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  // const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    console.log(
      "🚀 ~ file: ChatProvider.jsx:14 ~ useEffect ~ userInfo:",
      userInfo,
    );
    setUser(userInfo);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        // notification,
        // setNotification,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatContext;
