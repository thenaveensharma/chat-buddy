import {
  Avatar,
  Box,
  Button,
  FormControl,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
const SideBarSearchModal = (props) => {
  // eslint-disable-next-line react/prop-types
  const { isOpen, onClose } = props;
  const user = JSON.parse(localStorage.getItem("user"));
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const searchUsers = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      };
      const res = await axios.get(`/api/user?search=${searchValue}`, config);
      const { data } = res;
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay
        bg="grey.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      <ModalContent bg={"black"} h={"full"}>
        <ModalHeader>Connect with people</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <InputGroup>
              <InputLeftAddon bg={"none"}>
                <Icon as={BsSearch} width={4} height={4} />
              </InputLeftAddon>
              <Input
                id="search"
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search"
              />
              <InputRightAddon m={0} p={0}>
                <Button onClick={searchUsers}>Go</Button>
              </InputRightAddon>
            </InputGroup>
          </FormControl>
          <Box
            overflowY={"auto"}
            maxH={"95vh"}
            width={"100%"}
            className="hide_scrollbar"
          >
            {loading ? (
              <VStack marginTop={"3"}>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((value) => {
                  return (
                    <>
                      <Box
                        w={"full"}
                        boxShadow="lg"
                        height={"80px"}
                        width={"100%"}
                        padding={"2"}
                        bg={"gray.800"}
                        borderRadius={"xl"}
                        key={value}
                      >
                        <SkeletonCircle size="10" />
                        <SkeletonText
                          mt="1"
                          noOfLines={1}
                          spacing="1"
                          skeletonHeight="2"
                        />
                      </Box>
                    </>
                  );
                })}
              </VStack>
            ) : (
              <VStack marginTop={"3"}>
                {users.map((user) => {
                  const { _id, name, email } = user;
                  return (
                    <>
                      <Box
                        height={"80px"}
                        key={_id}
                        width={"100%"}
                        padding={"2"}
                        bg={"gray.800"}
                        borderRadius={"xl"}
                      >
                        <HStack alignItems={"center"}>
                          <Avatar
                            //   name={value + "The Naveen"}
                            size={"lg"}
                          />
                          <VStack alignItems={"start"}>
                            <Text>{name}</Text>
                            <Text color={"gray.500"}>{email}</Text>
                          </VStack>
                        </HStack>
                      </Box>
                    </>
                  );
                })}
              </VStack>
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

SideBarSearchModal.protoTypes = {
  isOpen: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default SideBarSearchModal;
