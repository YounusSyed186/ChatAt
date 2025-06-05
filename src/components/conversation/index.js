import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";

import Footer from "./footer";
import MessageArea from "./messageArea";
import Header from "./header";
import useConversationStore from "../../zestand/conversation";

const Conversation = () => {
  const { selectedConversation } = useConversationStore();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // When selectedConversation changes, update messages state
  useEffect(() => {
    if (selectedConversation && selectedConversation.messages) {
      setMessages(selectedConversation.messages);
    } else {
      setMessages([]);
    }
  }, [selectedConversation]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    // New message object
    const newMsg = {
      id: Date.now(),
      text: newMessage,
      sender: "me",
      timestamp: new Date().toISOString(),
    };

    // Append new message locally
    setMessages((prev) => [...prev, newMsg]);
    setNewMessage("");

    // TODO: emit socket event or API call to send message to server
  };

  if (!selectedConversation) {
    return (
      <Box
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "text.secondary",
          fontSize: 18,
        }}
      >
        Select a conversation to start chatting.
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: "100%",
        padding: 1,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.default",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Header conversation={selectedConversation} />

      {/* Message Area */}
      <MessageArea messages={messages} withWrapper={true} />

      {/* Footer */}
      <Footer
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSendMessage={handleSendMessage}
      />
    </Box>
  );
};

export default Conversation;
