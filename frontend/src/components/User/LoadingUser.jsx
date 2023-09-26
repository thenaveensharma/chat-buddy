/* eslint-disable react/prop-types */
import { Box, SkeletonCircle, SkeletonText, VStack } from "@chakra-ui/react";

const LoadingUser = ({ length }) => {
  return (
    <VStack marginTop={"3"}>
      {new Array(length).fill(Math.random() * 100).map((value, index) => {
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
              key={index}
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
  );
};

export default LoadingUser;
