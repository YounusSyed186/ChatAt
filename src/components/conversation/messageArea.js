import React, { useEffect, useState, useRef } from "react";
import { Box, Stack, Typography, Fade } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  TimeLine,
  MsgType,
  MediaMsg,
  ReplayMsg,
  LinkMsg,
  DocMsg,
} from "./textMessage.js";
import { getSocket } from "../../socket";
import useConversationStore from "../../zestand/conversation";
import { alpha } from "@mui/material/styles";

const MessageArea = ({ withWrapper = true }) => {
  const theme = useTheme();
  const socket = getSocket();
  const { selectedConversation } = useConversationStore();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!selectedConversation?._id) return;

    setLoading(true);
    
    // Fetch messages from backend using socket
    socket.emit(
      "get_messages",
      { conversation_id: selectedConversation._id },
      (fetchedMessages) => {
        setMessages(fetchedMessages || []);
        setLoading(false);
      }
    );
    console.log("Messages fetched:", messages)

    // Real-time new message listener
    const handleNewMessage = ({ conversation_id, message }) => {
      if (conversation_id === selectedConversation._id) {
        setMessages((prev) => [...prev, message]);
      }
    };

    socket.on("new_message", handleNewMessage);

    return () => {
      socket.off("new_message", handleNewMessage);
    };
  }, [selectedConversation]);

  // Empty state
  if (loading) {
    return (
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Typography color="text.secondary">Loading messages...</Typography>
      </Box>
    );
  }

  if (!messages.length) {
    return (
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Typography color="text.secondary">
          {selectedConversation
            ? "No messages yet. Send a message to start the conversation!"
            : "Select a conversation to view messages"}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      ref={containerRef}
      sx={{
        flex: 1,
        padding: "16px 24px",
        overflowY: "auto",
        backgroundColor: theme.palette.background.default,
        "&::-webkit-scrollbar": {
          width: "6px",
        },
        "&::-webkit-scrollbar-track": {
          background: alpha(theme.palette.background.paper, 0.8),
          borderRadius: "3px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: alpha(theme.palette.primary.main, 0.3),
          borderRadius: "3px",
          "&:hover": {
            background: alpha(theme.palette.primary.main, 0.5),
          },
        },
      }}
    >
      <Stack spacing={2.5}>
        {messages.map((el, index) => {
          const type = el.type?.toLowerCase(); // Normalize type
          const commonProps = { 
            key: el._id || index, 
            el, 
            withWrapper,
          };

          // Group messages by date with timeline
          const showDateSeparator = index === 0 || 
            new Date(el.createdAt).toDateString() !== 
            new Date(messages[index - 1].createdAt).toDateString();

          return (
            <React.Fragment key={el._id || index}>
              {showDateSeparator && (
                <TimeLine 
                  el={{ 
                    text: new Date(el.createdAt).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'short', 
                      day: 'numeric' 
                    }) 
                  }} 
                />
              )}
              
              <Fade in timeout={300}>
                <div>
                  {(() => {
                    switch (type) {
                      case "media":
                        return <MediaMsg {...commonProps} />;
                      case "document":
                        return <DocMsg {...commonProps} />;
                      case "link":
                        return <LinkMsg {...commonProps} />;
                      case "reply":
                        return <ReplayMsg {...commonProps} />;
                      case "text":
                      default:
                        return <MsgType {...commonProps} />;
                    }
                  })()}
                </div>
              </Fade>
            </React.Fragment>
          );
        })}
        <div ref={messagesEndRef} />
      </Stack>
    </Box>
  );
};

export default MessageArea;