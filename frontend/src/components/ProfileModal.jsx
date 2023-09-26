/* eslint-disable react/prop-types */
import { EditIcon } from "@chakra-ui/icons";
import { BsTrash3 } from "react-icons/bs";
import {
  Avatar,
  Box,
  HStack,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";
const ProfileModal = (props) => {
  // eslint-disable-next-line react/prop-types
  const { isOpen, onClose, users, chatName, chat } = props;
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();
  const toast = useToast();
  const [isVisible, setIsVisible] = useState(true);
  const [newChatName, setNewChatName] = useState(
    chat && chat.isGroupChat ? chat.chatName : "",
  );

  const sendMessage = async (e) => {
    try {
      if (
        e.key == "Enter" &&
        newChatName !== selectedChat?.chatName &&
        user._id === selectedChat?.groupAdmin?._id
      ) {
        const config = {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        };
        const { data } = await axios.put(
          `/api/chat/grouprename`,
          {
            chatName: newChatName,
            chatId: selectedChat?._id,
          },
          config,
        );
        setSelectedChat(data);
        setChats(
          chats.map((chat) =>
            chat._id === data._id ? { ...chat, chatName: data.chatName } : chat,
          ),
        );
        setIsVisible(true);
        toast({
          title: "Group name changed successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error changing the group name",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  const handleDeleteUserFromGroup = async (toBeDeletedUser) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/groupremove`,
        {
          userId: toBeDeletedUser,
          chatId: selectedChat?._id,
        },
        config,
      );

      setSelectedChat(data);
      setChats(
        chats.map((chat) =>
          chat._id === data._id ? { ...chat, users: data.users } : chat,
        ),
      );
      toast({
        title: "User deleted successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error deleting the user from group",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
    >
      <ModalOverlay
        bg="grey.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      <ModalContent bg={"black"}>
        <ModalHeader marginTop={"4"}>
          {!isVisible ? (
            <Input
              disabled={chat && !chat.isGroupChat}
              marginTop={"2"}
              value={newChatName}
              onChange={(e) => setNewChatName(e.target.value)}
              onKeyDown={sendMessage}
            />
          ) : chatName ? (
            chatName
          ) : (
            "Your Profile"
          )}

          {isVisible && chat && chat.isGroupChat ? (
            <span
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                setIsVisible(false);
              }}
            >
              {chat &&
                chat.isGroupChat &&
                user._id === selectedChat?.groupAdmin?._id && (
                  <EditIcon marginLeft={"4"} />
                )}
            </span>
          ) : null}
          <ModalCloseButton
            onClick={() => {
              setIsVisible(true);
            }}
          />
        </ModalHeader>
        <ModalBody marginBottom={"5"}>
          <Box width={"100%"} className="hide_scrollbar">
            {users.map((userInUsers) => {
              const { name, email } = userInUsers;

              return (
                <HStack
                  key={userInUsers._id}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <HStack alignItems={"center"} marginY={"3"}>
                    <Avatar name={name} size={"xl"} marginRight={"4"} />
                    <VStack alignItems={"start"}>
                      <Text fontWeight={"extrabold"} fontSize={"3xl"}>
                        {name}
                      </Text>
                      <Text textDecoration={"underline"} color={"gray.500"}>
                        {email}
                      </Text>
                    </VStack>
                  </HStack>
                  <Icon
                    as={BsTrash3}
                    h={5}
                    width={5}
                    cursor={"pointer"}
                    onClick={() => handleDeleteUserFromGroup(userInUsers._id)}
                  />
                </HStack>
              );
            })}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ProfileModal;
