/* eslint-disable react/prop-types */
import { Avatar, Box, HStack, Text, VStack } from "@chakra-ui/react";

const UserListItem = (props) => {
  const { name, email } = props;
  return (
    <Box
      cursor={"pointer"}
      _hover={{
        bgColor: "gray.900",
      }}
      height={"80px"}
      width={"100%"}
      padding={"2"}
      bg={"gray.800"}
      marginY={"2"}
      borderRadius={"xl"}
      {...props}
    >
      <HStack alignItems={"center"}>
        <Avatar name={name} size={"lg"} />
        <VStack alignItems={"start"}>
          <Text>{name}</Text>
          <Text color={"gray.500"}>{email}</Text>
        </VStack>
      </HStack>
    </Box>
  );
};

export default UserListItem;
