/* eslint-disable react/prop-types */
import {
  Avatar,
  Box,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
const ProfileModal = (props) => {
  // eslint-disable-next-line react/prop-types
  const { isOpen, onClose, users, chatName } = props;
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay
        bg="grey.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      <ModalContent bg={"black"}>
        <ModalHeader marginTop={"4"}>
          {chatName ? chatName : "Your Profile"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody marginBottom={"5"}>
          <Box width={"100%"} className="hide_scrollbar">
            {users.map((userInUsers) => {
              const { name, email } = userInUsers;

              return (
                <HStack
                  alignItems={"center"}
                  key={userInUsers._id}
                  marginY={"3"}
                >
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
              );
            })}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ProfileModal;
