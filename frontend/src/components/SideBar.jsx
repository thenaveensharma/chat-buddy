import { SettingsIcon } from "@chakra-ui/icons";
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

import {
  BsPeople,
  BsChatRight,
  BsTelephone,
  BsCameraVideo,
  BsSearch,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import SideBarSearchModal from "./SideBarSearchModal";

const SideBar = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
          <Icon as={BsSearch} w={8} h={8} onClick={onOpen} cursor={"pointer"} />
          <Icon as={BsChatRight} w={8} h={8} cursor={"pointer"} />
          <Icon as={BsPeople} w={8} h={8} cursor={"pointer"} />
          <Icon as={BsTelephone} w={8} h={8} cursor={"pointer"} />
          <Icon as={BsCameraVideo} w={8} h={8} cursor={"pointer"} />
        </VStack>
        <VStack marginBottom={"6"}>
          <Menu>
            <MenuButton colorScheme="blackAlpha" as={Button}>
              <SettingsIcon w={8} h={8} />
            </MenuButton>
            <MenuList bg={"black"}>
              <MenuItem bg={"black"}>Profile</MenuItem>
              <MenuItem bg={"black"} onClick={handleLogout}>
                Log Out
              </MenuItem>
            </MenuList>
          </Menu>
        </VStack>
      </Box>
      <SideBarSearchModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default SideBar;
