// import { useEffect } from "react";
// import { io } from "socket.io-client";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
// useEffect(() => {
//   const socket = io("http://localhost:3000/");
//   console.log("🚀 ~ file: Login.jsx:4 ~ socket:", socket);
//   socket.on("connection", (socket) => {
//     console.log("🚀 ~ file: Login.jsx:9 ~ socket.on ~ socket:", socket);
//   });
// }, []);
import axios from "axios";
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

const schema = yup
  .object()
  .shape({
    Email: yup.string().email().required(),
    Password: yup.string().required(),
  })
  .required();
const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = useForm({
    defaultValues: {
      Email: "naveen@gmail.com",
      Password: "Shadow@1212",
    },
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
  });
  async function onSubmit(values) {
    try {
      const res = await axios.post("/api/user/login", values);
      if (res.status == 200) {
        toast({
          title: "Logged in successfully.",
          description: "Happy to see you again.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/chats");
      }
    } catch (error) {
      if (error?.response?.status === 404) {
        toast({
          title: "Email does not exists.",
          description:
            "Email that you are using is not registered, please register it first.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } else if (error?.response?.status === 401) {
        toast({
          title: "Invalid email/password.",
          description: "",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    }
  }
  return (
    <Box display={"flex"} bg="black" h={"100vh"} w={"100%"}>
      <Box
        bg="black"
        h={"100vh"}
        display={"flex"}
        flexDir={"column"}
        width={["80%", "80%", "80%", "45%"]}
        paddingLeft={["10vw", "10vw", "10vw", "10vw"]}
      >
        <Text fontSize={"xl"} color={"gray.500"} marginTop={"20vh"}>
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
          color={"gray.500"}
          marginBottom={"1rem"}
        >
          Not a member?{" "}
          <Link as={ReactRouterLink} to={"/signup"}>
            <Highlight
              query={"Sign up"}
              styles={{
                color: "blue",
              }}
            >
              Sign up
            </Highlight>
          </Link>
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
                <Button
                  mt={"1.5rem"}
                  colorScheme="blue"
                  isLoading={isSubmitting}
                  type="submit"
                  loadingText="Signing up..."
                  _loading={{
                    color: "white",
                    bgColor: "black",
                  }}
                  width={"100%"}
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
