import {
  FormControl,
  Box,
  Input,
  InputLeftAddon,
  InputGroup,
  Icon,
  VStack,
  HStack,
  Avatar,
  Text,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";

const MyChats = () => {
  return (
    <Box w={"30%"}>
      <FormControl>
        <InputGroup>
          <InputLeftAddon bg={"none"}>
            <Icon as={BsSearch} width={4} height={4} />
          </InputLeftAddon>

          <Input id="search" type="text" placeholder="Search" />
        </InputGroup>
      </FormControl>
      <Box
        overflowY={"auto"}
        maxH={"95vh"}
        width={"100%"}
        className="hide_scrollbar"
      >
        <VStack marginTop={"3"}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map(
            (value, index) => {
              return (
                <>
                  <Box
                    height={"80px"}
                    key={index}
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
                        <Text>The Naveen Sharma</Text>
                        <Text color={"gray.500"}>latest message</Text>
                      </VStack>
                    </HStack>
                  </Box>
                </>
              );
            },
          )}
        </VStack>
      </Box>
    </Box>
  );
};

export default MyChats;
