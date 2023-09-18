import { Box, Skeleton, Spinner } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
const ScrollableMessages = ({ loading, messages }) => {
  const { user } = ChatState();
  console.log(
    "🚀 ~ file: ScrollableMessages.jsx:3 ~ ScrollableMessages ~ messages:",
    messages,
  );
  return !loading ? (
    <Box
      width="100%"
      bgColor={"black"}
      height={"100%"}
      display={"flex"}
      flexDirection={"column"}
      overflowY={"scroll"}
      className="hide_scrollbar"
      scrollBehavior={"smooth"}
    >
      {messages?.map((message) => (
        <Box
          width={"full"}
          display={"flex"}
          justifyContent={
            user?._id === message.sender?._id ? "flex-end" : "flex-start"
          }
          key={message._id}
        >
          <Box
            display={"flex"}
            textAlign={"left"}
            maxWidth={"60%"}
            height={"fit-content"}
            backgroundColor={"gray.800"}
            borderRadius={"xl"}
            marginY={"1"}
            marginX={"5"}
            padding={"3"}
            wordBreak={"break-word"}
          >
            {message?.content}
          </Box>
        </Box>
      ))}
    </Box>
  ) : (
    <Box
      width="100%"
      height={"100%"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Spinner width={20} height={20} />
    </Box>
  );
};

export default ScrollableMessages;
