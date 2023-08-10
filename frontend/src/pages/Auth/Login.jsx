import React, { useEffect } from "react";
import { io } from "socket.io-client";
// useEffect(() => {
//   const socket = io("http://localhost:3000/");
//   console.log("🚀 ~ file: Login.jsx:4 ~ socket:", socket);
//   socket.on("connection", (socket) => {
//     console.log("🚀 ~ file: Login.jsx:9 ~ socket.on ~ socket:", socket);
//   });
// }, []);
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
  Image,
  Input,
  GridItem,
} from "@chakra-ui/react";

const schema = yup
  .object()
  .shape({
    Email: yup.string().email().required(),
    Password: yup.string().required(),
  })
  .required();
const Login = () => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = useForm({
    defaultValues: {
      Email: "",
      Password: "",
    },
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
  });
  function onSubmit(values) {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve();
      }, 3000);
    });
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
          Hi, Happy to see you today !
        </Text>
        <Text fontSize={"4em"} fontWeight={"bold"} color={"white"}>
          Login with your credentials
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
          Not a member?{" "}
          <Highlight
            query={"Sign up"}
            styles={{
              color: "blue",
            }}
          >
            Sign up
          </Highlight>
        </Text>
        <Box display={"flex"} flexDir={"column"}>
          <SimpleGrid column={1} spacing={2}>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                    placeholder="Password"
                    type="password"
                    {...register("Password")}
                  />
                  <FormErrorMessage color={"red"}>
                    {errors?.Password && errors?.Password.message}
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
                  loadingText="Login in..."
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

export default Login;
