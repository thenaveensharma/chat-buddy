import { SettingsIcon } from "@chakra-ui/icons";
import { Box, Heading, VStack, Icon } from "@chakra-ui/react";

import {
  BsPeople,
  BsChatRight,
  BsTelephone,
  BsCameraVideo,
} from "react-icons/bs";

// The default icon size is 1em (16px)

// Use the `boxSize` prop to change the icon size

// Use the `color` prop to change the icon color
const SideBar = () => {
  return (
    <Box
      w={"80px"}
      height={"100vh"}
      display={"flex"}
      flexDir={"column"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <VStack gap={"10"}>
        <Heading color={"gray.400"} size={"3xl"} marginBottom={"2"}>
          CB
        </Heading>
        <Icon as={BsChatRight} w={8} h={8} />
        <Icon as={BsPeople} w={8} h={8} />
        <Icon as={BsTelephone} w={8} h={8} />
        <Icon as={BsCameraVideo} w={8} h={8} />
      </VStack>
      <VStack marginBottom={"6"}>
        <SettingsIcon w={8} h={8} />
      </VStack>
    </Box>
  );
};

export default SideBar;
