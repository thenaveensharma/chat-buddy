/* eslint-disable react/prop-types */
import { BellIcon, SettingsIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  VStack,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import NotificationBadge, { Effect } from "react-notification-badge";
import {
  // BsPeople,
  BsChatRight,
  // BsTelephone,
  // BsCameraVideo,
  BsSearch,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import SideBarSearchModal from "./SideBarSearchModal";
import ProfileModal from "./ProfileModal";
import { ChatState } from "../Context/ChatProvider";

const SideBar = ({ setFetchAgain }) => {
  const navigate = useNavigate();
  const { user, notifications, setNotifications, setSelectedChat } =
    ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: profileIsOpen,
    onOpen: profileOnOpen,
    onClose: profileOnClose,
  } = useDisclosure();

  const handleLogout = () => {
    navigate("/");
  };
  return (
    <>
      <Box
        w={"80px"}
        height={"100vh"}
        display={"flex"}
        flexDir={"column"}
        alignItems={"center"}
        justifyContent={"space-between"}
        paddingTop={"3"}
        paddingLeft={"3"}
      >
        <VStack gap={"10"}>
          <Heading color={"gray.400"} size={"3xl"} marginBottom={"2"}>
            CB
          </Heading>
          <Menu>
            <MenuButton colorScheme="blackAlpha" as={Button}>
              <NotificationBadge
                count={notifications.length}
                effect={Effect.SCALE}
              />
              <BellIcon w={10} h={10} />
            </MenuButton>
            <MenuList bg={"black"}>
              {!notifications.length && (
                <MenuItem bg={"black"}>No new messages</MenuItem>
              )}
              {notifications.map((notification) => {
                return (
                  <MenuItem
                    bg={"black"}
                    key={notification._id}
                    onClick={() => {
                      try {
                        setNotifications(
                          notifications.filter(
                            (notifi) =>
                              notification?.chat?._id !== notifi?.chat._id,
                          ),
                        );
                        setSelectedChat(notification.chat);
                      } catch (error) {
                        console.log(
                          "🚀 ~ file: SideBar.jsx:80 ~ {notifications.map ~ error:",
                          error,
                        );
                      }
                    }}
                  >
                    {notification.chat.isGroupChat
                      ? `New message in ${notification.chat.chatName}`
                      : `New message from ${notification.sender.name}`}
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>
          <Icon as={BsSearch} w={8} h={8} onClick={onOpen} cursor={"pointer"} />
          <Icon as={BsChatRight} w={8} h={8} cursor={"pointer"} />
          {/* <Icon as={BsPeople} w={8} h={8} cursor={"pointer"} /> */}
          {/* <Icon as={BsTelephone} w={8} h={8} cursor={"pointer"} /> */}
          {/* <Icon as={BsCameraVideo} w={8} h={8} cursor={"pointer"} /> */}
        </VStack>
        <VStack marginBottom={"6"} gap={10}>
          <Menu>
            <MenuButton colorScheme="blackAlpha" as={Button}>
              <SettingsIcon w={8} h={8} />
            </MenuButton>
            <MenuList bg={"black"}>
              <MenuItem bg={"black"} onClick={profileOnOpen}>
                Profile
              </MenuItem>
              <MenuItem bg={"black"} onClick={handleLogout}>
                Log Out
              </MenuItem>
            </MenuList>
          </Menu>
        </VStack>
      </Box>
      <SideBarSearchModal
        isOpen={isOpen}
        onClose={onClose}
        setFetchAgain={setFetchAgain}
      />
      <ProfileModal
        isOpen={profileIsOpen}
        onClose={profileOnClose}
        users={[user]}
      />
    </>
  );
};

export default SideBar;
