import { Box, Container, VStack, HStack, Input, Button, Text, IconButton, useToast } from "@chakra-ui/react";
import { FaPaperPlane, FaSmile } from "react-icons/fa";
import { useState } from "react";

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();

  const sendMessage = () => {
    if (inputValue.trim() === "") {
      toast({
        title: "Cannot send empty message.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setMessages([...messages, { text: inputValue, sender: "You" }]);
    setInputValue("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <Container maxW="container.md" p={4}>
      <VStack spacing={4} align="stretch">
        <Box h="80vh" overflowY="scroll" p={4} borderWidth="1px" borderRadius="lg">
          {messages.map((message, index) => (
            <Box key={index} bg="teal.500" color="white" p={2} borderRadius="md" alignSelf={message.sender === "You" ? "flex-end" : "flex-start"}>
              <Text>{message.text}</Text>
            </Box>
          ))}
        </Box>
        <HStack>
          <Input placeholder="Type a message..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={handleKeyPress} />
          <IconButton icon={<FaSmile />} onClick={() => toast({ title: "Emoji picker coming soon!", status: "info", duration: 2000, isClosable: true })} aria-label="Add emoji" />
          <Button leftIcon={<FaPaperPlane />} colorScheme="teal" onClick={sendMessage}>
            Send
          </Button>
        </HStack>
      </VStack>
    </Container>
  );
};

export default Index;
