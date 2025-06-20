// Footer.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  TextField,
  Button,
  useTheme,
  Stack,
  Fab,
  Tooltip,
} from "@mui/material";
import {
  Smiley,
  PaperPlaneTilt,
  LinkSimple,
  Image,
  Sticker,
  Camera,
  File,
} from "phosphor-react";
import Picker from "@emoji-mart/react";
import { getSocket } from "../../socket";
import useConversationStore from "../../zestand/conversation";

const Footer = ({ newMessage, setNewMessage }) => {
  const theme = useTheme();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const { selectedConversation, addOrUpdateMessage } = useConversationStore();
  const socket = getSocket();
  const user_id = localStorage.getItem("user_id");

  // Listen for confirmed messages from server and update messages list
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (msg) => {
      // Replace local temp message by matching _id or fileName
      addOrUpdateMessage(msg);
    };

    socket.on("new_message", handleNewMessage);

    return () => {
      socket.off("new_message", handleNewMessage);
    };
  }, [socket, addOrUpdateMessage]);

  const handleEmojiSelect = (emoji) => {
    setNewMessage((prev) => prev + emoji.native);
  };

  const toggleActions = () => setShowActions((prev) => !prev);

  const SendTextMessage = () => {
    if (!selectedConversation || !newMessage.trim()) return;

    const receiver = selectedConversation.participants.find(
      (p) => p._id !== selectedConversation.userId
    );

    socket.emit("text_message", {
      to: receiver._id,
      from: user_id,
      message: newMessage,
      conversationId: selectedConversation?._id,
      type: "Text",
    });

    setNewMessage("");
  };

  const handleFileUpload = (e, fileCategory) => {
    const file = e.target.files[0];
    if (!file || !selectedConversation) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;

      const receiver = selectedConversation.participants.find(
        (p) => p._id !== selectedConversation.userId
      );

      // Create local temp message for instant preview
      const tempMessage = {
        _id: `temp-${Date.now()}`, // unique temp ID
        from: user_id,
        to: receiver._id,
        conversationId: selectedConversation._id,
        type: fileCategory === "image" ? "Media" : "Document",
        file: base64,
        fileName: file.name,
        isLocal: true,
        createdAt: new Date().toISOString(),
      };

      // Dispatch local event to update UI immediately (optional)
      window.dispatchEvent(
        new CustomEvent("local_message", { detail: tempMessage })
      );

      // Add local temp message directly to store for immediate UI update
      addOrUpdateMessage(tempMessage);

      // Emit to server - send only base64 data without prefix
      socket.emit("file_messages", {
        from: user_id,
        to: receiver._id,
        conversationId: selectedConversation._id,
        type: fileCategory === "image" ? "Media" : "Document",
        file: {
          name: file.name,
          type: file.type,
          data: base64.split(",")[1], // base64 without metadata prefix
        },
      });
    };
    reader.readAsDataURL(file);
  };

  const actions = [
    {
      icon: <Image size={24} />,
      title: "Photo/Video",
      type: "image",
      handler: () => document.getElementById("image-input").click(),
    },
    {
      icon: <File size={24} />,
      title: "File",
      type: "file",
      handler: () => document.getElementById("file-input").click(),
    },
    {
      icon: <Sticker size={24} />,
      title: "Sticker",
      handler: () => alert("Coming soon!"),
    },
    {
      icon: <Camera size={24} />,
      title: "Camera",
      handler: () => alert("Coming soon!"),
    },
  ];

  return (
    <Box
      sx={{
        p: 1,
        borderTop: `1px solid ${theme.palette.divider}`,
        display: "flex",
        gap: 2,
        position: "relative",
        bgcolor: theme.palette.background.default,
      }}
    >
      <input
        id="image-input"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => handleFileUpload(e, "image")}
      />
      <input
        id="file-input"
        type="file"
        style={{ display: "none" }}
        onChange={(e) => handleFileUpload(e, "file")}
      />

      <Stack sx={{ width: "max-content", position: "relative" }}>
        {showActions &&
          actions.map((action, i) => (
            <Tooltip key={i} title={action.title} placement="right">
              <Fab
                onClick={action.handler}
                sx={{
                  position: "absolute",
                  top: -(i + 1) * 60,
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.getContrastText(theme.palette.primary.main),
                  zIndex: 10,
                }}
              >
                {action.icon}
              </Fab>
            </Tooltip>
          ))}
        <IconButton
          onClick={toggleActions}
          sx={{ color: theme.palette.text.secondary }}
        >
          <LinkSimple />
        </IconButton>
      </Stack>

      {showEmojiPicker && (
        <Box
          sx={{
            position: "absolute",
            bottom: "60px",
            left: "10px",
            zIndex: 10,
          }}
        >
          <Picker onEmojiSelect={handleEmojiSelect} theme={theme.palette.mode} />
        </Box>
      )}

      <IconButton
        sx={{ color: theme.palette.text.secondary }}
        onClick={() => setShowEmojiPicker((prev) => !prev)}
      >
        <Smiley />
      </IconButton>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Type a message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") SendTextMessage();
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          },
        }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={SendTextMessage}
        startIcon={<PaperPlaneTilt size={24} />}
        sx={{ height: "100%" }}
      >
        Send
      </Button>
    </Box>
  );
};

export default Footer;
