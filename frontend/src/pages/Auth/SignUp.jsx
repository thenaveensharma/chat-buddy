import React from "react";
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
  Grid,
  GridItem,
  Link,
  Image,
} from "@chakra-ui/react";
import CustomInput from "../../components/CustomInput";

const schema = yup
  .object()
  .shape({
    "First Name": yup.string().required(),
    "Last Name": yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  })
  .required();
const SignUp = () => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = useForm({
    defaultValues: {},
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
  });
  console.log("🚀 ~ file: SignUp.jsx:30 ~ SignUp ~ errors:", errors);
  function onSubmit(values) {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve();
      }, 3000);
    });
  }
  return (
    // <Box display={"flex"}>
    //   <Box
    //     bg="black"
    //     h={"100vh"}
    //     display={"flex"}
    //     flexDir={"column"}
    //     width={"50%"}
    //     paddingLeft={"10rem"}
    //   >
    //     <Text fontSize={"xl"} color={"gray.500"} marginTop={"12rem"}>
    //       START FOR FREE
    //     </Text>
    //     <Text fontSize={"4em"} fontWeight={"bold"} color={"white"}>
    //       Create new account
    //       <Highlight
    //         query={"."}
    //         styles={{
    //           color: "blue",
    //         }}
    //       >
    //         .
    //       </Highlight>
    //     </Text>
    //     <Text
    //       fontSize={"xl"}
    //       letterSpacing={"wider"}
    //       color={"gray.600"}
    //       marginBottom={"1rem"}
    //     >
    //       Already a member?{" "}
    //       <Highlight
    //         query={"Log in"}
    //         styles={{
    //           color: "blue",
    //         }}
    //       >
    //         Log in
    //       </Highlight>
    //     </Text>
    //     <form onSubmit={handleSubmit(onSubmit)}>
    //       <Box display={"flex"} flexDir={"column"}>
    //         <FormControl isInvalid={errors["First Name"]}>
    //           <FormLabel htmlFor="fname">First name</FormLabel>
    //           <CustomInput
    //             id="'First Name'"
    //             placeholder="First Name"
    //             width={"25%"}
    //             {...register("'First Name'")}
    //           />
    //           <FormErrorMessage color={"red"}>
    //             {errors["First Name"] && errors["First Name"]?.message}
    //           </FormErrorMessage>
    //         </FormControl>
    //         <FormControl isInvalid={errors?.["Last Name"]}>
    //           <FormLabel htmlFor="Last Name">Last name</FormLabel>
    //           <CustomInput
    //             id="Last Name"
    //             placeholder="Last Name"
    //             {...register("Last Name")}
    //             width="25%"
    //           />
    //           <FormErrorMessage color={"red"}>
    //             {errors["Last Name"] && errors["Last Name"]?.message}
    //           </FormErrorMessage>
    //         </FormControl>
    //         <FormControl isInvalid={errors?.email}>
    //           <FormLabel htmlFor="email">Email</FormLabel>
    //           <CustomInput
    //             id="email"
    //             placeholder="Email"
    //             width="50%"
    //             {...register("email")}
    //           />
    //           <FormErrorMessage color={"red"}>
    //             {errors?.email && errors?.email.message}
    //           </FormErrorMessage>
    //         </FormControl>
    //         <FormControl isInvalid={errors?.password}>
    //           <FormLabel htmlFor="password">Password</FormLabel>
    //           <CustomInput
    //             id="password"
    //             placeholder="Password"
    //             width="50%"
    //             {...register("password")}
    //           />
    //           <FormErrorMessage color={"red"}>
    //             {errors?.password && errors?.password.message}
    //           </FormErrorMessage>
    //         </FormControl>
    //         <FormControl isInvalid={errors?.confirmPassword}>
    //           <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
    //           <CustomInput
    //             id="confirmPassword"
    //             placeholder="Confirm Password"
    //             width="50%"
    //             {...register("confirmPassword")}
    //           />
    //           <FormErrorMessage color={"red"}>
    //             {errors?.confirmPassword && errors?.confirmPassword.message}
    //           </FormErrorMessage>
    //         </FormControl>
    //         <Button
    //           mt={"1.5rem"}
    //           colorScheme="teal"
    //           isLoading={isSubmitting}
    //           type="submit"
    //           bgColor={"white"}
    //           borderRadius={"10px"}
    //           h={"2rem"}
    //           w={"50%"}
    //         >
    //           Submit
    //         </Button>
    //       </Box>
    //       <Box bg="red" w={[300, 400, 500]}>
    //         This is a box
    //       </Box>
    //     </form>
    //   </Box>
    //   {/* <Box bg="black" h={"100vh"} w={[]}></Box> */}
    // </Box>
    <Box p={4} display={{ md: "flex" }}>
      <Box flexShrink={0}>
        <Image
          borderRadius="lg"
          width={{ md: 40 }}
          src="https://bit.ly/2jYM25F"
          alt="Woman paying for a purchase"
        />
      </Box>
      <Box mt={{ base: 4, md: 0 }} ml={{ md: 6 }}>
        <Text
          fontWeight="bold"
          textTransform="uppercase"
          fontSize="sm"
          letterSpacing="wide"
          color="teal.600"
        >
          Marketing
        </Text>
        <Link
          mt={1}
          display="block"
          fontSize="lg"
          lineHeight="normal"
          fontWeight="semibold"
          href="#"
        >
          Finding customers for your new business
        </Link>
        <Text mt={2} color="gray.500">
          Getting a new business off the ground is a lot of hard work. Here are
          five ideas you can use to find your first customers.
        </Text>
      </Box>
    </Box>
  );
};

export default SignUp;
