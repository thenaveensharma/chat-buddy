/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Highlight,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";
import UserListItem from "./User/UserListItem";
import UserBadgeItem from "./User/UserBadgeItem";
import LoadingUser from "./User/LoadingUser";

const schema = yup
  .object()
  .shape({
    groupName: yup
      .string()
      .required("Group Name is required")
      .min(3, "Group Name must have at least 3 characters"),
    selectedusers: yup
      .array()
      .required()
      .min(
        2,
        "Please select atleast 2 group participants (excluding yourself)",
      ),
  })
  .required();
const CreateGroup = ({ children }) => {
  // eslint-disable-next-line react/prop-types
  const { user, chats, setChats } = ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    setValue,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    register,
  } = useForm({
    defaultValues: {
      groupName: "",
      selectedusers: [],
    },
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
  });

  async function onSubmit(values) {
    try {
      const { groupName, selectedusers } = values;
      if (!groupName || !selectedusers) {
        toast({
          title: "Please fill all the fields",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      };
      const { data } = await axios.post(
        `/api/chat/group`,
        {
          name: groupName,
          users: JSON.stringify(selectedusers.map((u) => u._id)),
        },
        config,
      );
      setChats([data, ...chats]);
      onClose();
      toast({
        title: "New Group Chat Created!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      reset();
      searchUsers("");
      setUsers([]);
      setSelectedUsers([]);
    } catch (error) {
      toast({
        title: "Failed to Create the Chat!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  }
  const searchUsers = async (value) => {
    try {
      setSearchValue(value);
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      };
      const res = await axios.get(`/api/user?search=${value}`, config);
      const { data } = res;

      setLoading(false);
      setUsers(data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const selectUsers = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast({
        title: "User already added",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
    setValue("selectedusers", [...selectedUsers, userToAdd]);
  };
  const handleDelete = (delUser) => {
    const filteredUsers = selectedUsers.filter(
      (sel) => sel._id !== delUser._id,
    );
    setSelectedUsers(filteredUsers);
    setValue("selectedusers", filteredUsers);
  };
  return (
    <>
      <span onClick={onOpen}>{children}</span>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          bg="grey.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent bg={"black"}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader marginTop={"4"}>Create a group</ModalHeader>
            <ModalCloseButton />
            <ModalBody marginBottom={"5"}>
              <Box width={"100%"} className="hide_scrollbar" height={"28rem"}>
                <FormControl isInvalid={errors?.groupName}>
                  <FormLabel htmlFor="groupName">
                    Group Name{" "}
                    <Highlight
                      query={"*"}
                      styles={{
                        color: "red",
                      }}
                    >
                      *
                    </Highlight>
                  </FormLabel>
                  <Input
                    id="groupName"
                    type="text"
                    placeholder="Type group name"
                    {...register("groupName")}
                  />
                  <FormErrorMessage color={"red"}>
                    {errors?.groupName && errors?.groupName?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors?.selectedusers} marginY={"2"}>
                  <FormLabel htmlFor="selectedusers">
                    Group Participants{" "}
                    <Highlight
                      query={"*"}
                      styles={{
                        color: "red",
                      }}
                    >
                      *
                    </Highlight>
                  </FormLabel>
                  <Input
                    id="selectedusers"
                    type="select"
                    placeholder="Select users to add in this group"
                    value={searchValue}
                    onChange={(e) => {
                      searchUsers(e.target.value);
                    }}
                  />
                  <FormErrorMessage color={"red"}>
                    {errors?.selectedusers && errors?.selectedusers.message}
                  </FormErrorMessage>
                </FormControl>
                <Box w="100%" d="flex" flexWrap="wrap">
                  {selectedUsers.map((u) => (
                    <UserBadgeItem
                      key={u._id}
                      user={u}
                      handleFunction={() => handleDelete(u)}
                    />
                  ))}
                </Box>
                {loading ? (
                  <LoadingUser length={3} />
                ) : (
                  users.slice(0, 4).map((userInUsers) => {
                    const { _id, name, email } = userInUsers;

                    return (
                      <UserListItem
                        key={_id}
                        name={name}
                        email={email}
                        onClick={() => selectUsers(userInUsers)}
                      />
                    );
                  })
                )}
              </Box>
            </ModalBody>
            <ModalFooter>
              <Button
                type="submit"
                colorScheme="blue"
                isLoading={isSubmitting}
                loadingText={"Creating"}
              >
                Create Group
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateGroup;
