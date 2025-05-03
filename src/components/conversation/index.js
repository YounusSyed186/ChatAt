import React, { useState } from "react";
import {
  Box,
} from "@mui/material";

import Footer from "./footer";
import MessageArea from "./messageArea";
import Header from "./header";

const Conversation = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { id: Date.now(), text: newMessage, sender: "me" }]);
      setNewMessage("");
    }
  };

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
      <Header />

      {/* Message Area */}
      <MessageArea withWrapper={true} />

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