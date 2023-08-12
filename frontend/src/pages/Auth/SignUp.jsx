import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Button,
  Box,
  Text,
  Highlight,
  SimpleGrid,
  Link,
  Input,
  GridItem,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const schema = yup
  .object()
  .shape({
    Name: yup.string().min(2).required(),
    Email: yup.string().email().required(),
    Password: yup.string().min(8).required(),
    ConfirmPassword: yup
      .string()
      .oneOf([yup.ref("Password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  })
  .required();
const SignUp = () => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = useForm({
    defaultValues: {
      Name: "Naveen",
      Email: "naveenkumar892014@gmail.com",
      Password: "Shadow@123",
      ConfirmPassword: "Shadow@123",
    },
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
  });

  const toast = useToast();
  async function onSubmit(values) {
    const res = await axios.post("/api/signup", values);
    if (res.status == 200) {
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      localStorage.setItem("user", JSON.stringify(res.data));
    }
    if (res.status == 409) {
      toast({
        title: "User already exists.",
        description:
          "Email that you are using is associate with an account already.",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
    }
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     alert(JSON.stringify(values, null, 2));
    //     resolve();
    //   }, 3000);
    // });
  }
  return (
    <Box display={"flex"} bg="black" h={"100vh"} w={"100%"}>
      <Box
        bg="black"
        h={"100vh"}
        display={"flex"}
        flexDir={"column"}
        width={"60%"}
        paddingLeft={"10rem"}
      >
        <Text fontSize={"xl"} color={"gray.500"} marginTop={"12rem"}>
          START FOR FREE
        </Text>
        <Text fontSize={"4em"} fontWeight={"bold"} color={"white"}>
          Create new account
          <Highlight
            query={"."}
            styles={{
              color: "blue",
            }}
          >
            .
          </Highlight>
        </Text>
        <Text
          fontSize={"xl"}
          letterSpacing={"wider"}
          color={"gray.600"}
          marginBottom={"1rem"}
        >
          Already a member?{" "}
          <Highlight
            query={"Log in"}
            styles={{
              color: "blue",
            }}
          >
            Log in
          </Highlight>
        </Text>
        <Box display={"flex"} flexDir={"column"}>
          <SimpleGrid column={1} spacing={2}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <GridItem colSpan={1}>
                <FormControl isInvalid={errors["Name"]}>
                  <FormLabel htmlFor="Name">
                    Name{" "}
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
                    className="custom_input"
                    id="'Name'"
                    placeholder="Name"
                    {...register("Name")}
                  />
                  <FormErrorMessage color={"red"}>
                    {errors["Name"] && errors["Name"]?.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={1}>
                <FormControl isInvalid={errors?.Email}>
                  <FormLabel htmlFor="email">
                    Email{" "}
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
                    className="custom_input"
                    id="email"
                    type="email"
                    placeholder="Email"
                    {...register("Email")}
                  />
                  <FormErrorMessage color={"red"}>
                    {errors?.Email && errors?.Email.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={1}>
                <FormControl isInvalid={errors?.Password}>
                  <FormLabel htmlFor="Password">
                    Password{" "}
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
                    className="custom_input"
                    id="Password"
                    type="password"
                    placeholder="Password"
                    {...register("Password")}
                  />
                  <FormErrorMessage color={"red"}>
                    {errors?.Password && errors?.Password.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={1}>
                <FormControl isInvalid={errors?.ConfirmPassword}>
                  <FormLabel htmlFor="ConfirmPassword">
                    Confirm Password{" "}
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
                    className="custom_input"
                    id="ConfirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    {...register("ConfirmPassword")}
                  />

                  <FormErrorMessage color={"red"}>
                    {errors?.ConfirmPassword && errors?.ConfirmPassword.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={1}>
                <Button
                  mt={"1.5rem"}
                  colorScheme="teal"
                  isLoading={isSubmitting}
                  type="submit"
                  borderRadius={"10px"}
                  loadingText="Signing up..."
                  _loading={{
                    color: "white",
                    bgColor: "black",
                  }}
                  h={"2rem"}
                  width={"50%"}
                  variant={"outline"}
                >
                  Submit
                </Button>
              </GridItem>
            </form>
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
