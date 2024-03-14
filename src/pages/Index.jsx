import React, { useState } from "react";
import { Box, VStack, HStack, Text, Avatar, Input, Button, Divider, Spacer, Heading } from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";

const ChatMessage = ({ message, sender }) => (
  <Box bg={sender === "me" ? "blue.500" : "gray.100"} color={sender === "me" ? "white" : "black"} borderRadius="lg" p={2} maxW="70%" alignSelf={sender === "me" ? "flex-end" : "flex-start"}>
    {message}
  </Box>
);

const ChatContact = ({ name, avatar, lastMessage, onClick }) => (
  <HStack p={2} _hover={{ bg: "gray.100", cursor: "pointer" }} onClick={onClick}>
    <Avatar size="md" name={name} src={avatar} />
    <VStack alignItems="flex-start" spacing={0}>
      <Text fontWeight="bold">{name}</Text>
      <Text fontSize="sm" color="gray.500" noOfLines={1}>
        {lastMessage}
      </Text>
    </VStack>
  </HStack>
);

const Index = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const contacts = [
    {
      id: 1,
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdHxlbnwwfHx8fDE3MTAzOTk5MjF8MA&ixlib=rb-4.0.3&q=80&w=1080",
      lastMessage: "Hey there!",
    },
    {
      id: 2,
      name: "Jane Smith",
      avatar: "https://images.unsplash.com/photo-1557053910-d9eadeed1c58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0fGVufDB8fHx8MTcxMDM5OTkyMXww&ixlib=rb-4.0.3&q=80&w=1080",
      lastMessage: "How's it going?",
    },
  ];

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      setMessages([...messages, { text: inputMessage, sender: "me" }]);
      setInputMessage("");
    }
  };

  return (
    <HStack h="100vh" spacing={0}>
      <Box w="30%" bg="white" borderRight="1px solid" borderColor="gray.200">
        <VStack spacing={0} align="stretch">
          <Heading size="md" p={4}>
            Chats
          </Heading>
          <Divider />
          {contacts.map((contact) => (
            <ChatContact key={contact.id} {...contact} onClick={() => handleContactClick(contact)} />
          ))}
        </VStack>
      </Box>
      <VStack w="70%" p={4} spacing={4} align="stretch">
        {selectedContact ? (
          <>
            <HStack>
              <Avatar size="md" name={selectedContact.name} src={selectedContact.avatar} />
              <Text fontWeight="bold">{selectedContact.name}</Text>
              <Spacer />
            </HStack>
            <Divider />
            <VStack spacing={2} overflowY="auto" flex={1} align="stretch">
              {messages.map((msg, index) => (
                <ChatMessage key={index} message={msg.text} sender={msg.sender} />
              ))}
            </VStack>
            <HStack>
              <Input placeholder="Type a message" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} />
              <Button colorScheme="blue" onClick={handleSendMessage} leftIcon={<FaPaperPlane />}>
                Send
              </Button>
            </HStack>
          </>
        ) : (
          <Text>Select a contact to start chatting</Text>
        )}
      </VStack>
    </HStack>
  );
};

export default Index;
