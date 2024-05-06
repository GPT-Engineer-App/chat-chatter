import { Box, Container, VStack, HStack, Input, Button, Text, IconButton, useToast } from "@chakra-ui/react";
import { FaPaperPlane, FaSmile } from "react-icons/fa";
import { useState } from "react";

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [username, setUsername] = useState("");
  const toast = useToast();

  const receiveMessage = () => {
    const replies = ["Hello!", "How are you?", "That's interesting!", "Can you tell me more?"];
    const randomReply = replies[Math.floor(Math.random() * replies.length)];
    setMessages((prevMessages) => [...prevMessages, { text: randomReply, sender: "Other" }]);
  };

  const sendMessage = () => {
    if (inputValue.trim() === "" || username.trim() === "") {
      toast({
        title: "Cannot send empty message or username is not set.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setMessages((prevMessages) => [...prevMessages, { text: inputValue, sender: username }]);
    setInputValue("");
    if (Math.random() > 0.5) {
      setTimeout(receiveMessage, 1000);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <Container maxW="container.md" p={4}>
      <VStack spacing={4} align="stretch">
        <Input placeholder="Set your username..." value={username} onChange={(e) => setUsername(e.target.value)} />
        <Box h="70vh" overflowY="scroll" p={4} borderWidth="1px" borderRadius="lg">
          {messages.map((message, index) => (
            <Box key={index} bg="teal.500" color="white" p={2} borderRadius="md" alignSelf={message.sender === username ? "flex-end" : "flex-start"}>
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
