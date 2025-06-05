// components/ConversationList.jsx
import React, { useEffect, useState } from "react";
import { getSocket } from "../../socket";
import useConversationStore from "../../zestand/conversation";
import {
  Box,
  Typography,
  Avatar,
  useTheme,
  Divider,
  Stack,
  Paper,
} from "@mui/material";
import Conversation from "../../components/conversation";

// Socket handler to get all conversations
const getDirectConversations = (userId, setConversations) => {
  const socket = getSocket();
  socket.emit("get_direct_Conversations", { user_id: userId }, (response) => {
    setConversations(response);
  });
};

const getAvatarColor = (userId) => {
  const colors = [
    '#6c5ce7', '#00b894', '#0984e3', '#e17055', '#d63031',
    '#fdcb6e', '#e84393', '#00cec9', '#a29bfe'
  ];
  const index = userId.charCodeAt(0) % colors.length;
  return colors[index];
};

const ConversationList = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const {
    conversations,
    setConversations,
    setSelectedConversation,
    selectedConversation
  } = useConversationStore();

  const currentUser = localStorage.getItem("user_id");

  useEffect(() => {
    if (currentUser) {
      getDirectConversations(currentUser, setConversations);
    }
  }, [currentUser]);

  return (
    <>
      <Box
        sx={{
          height: { xs: "60vh", md: "65vh" },
          width: "100%",
          overflowY: "auto",
          p: 2,
          backgroundColor: theme.palette.background.default,
          borderRadius: 2,
          scrollBehavior: "smooth",
        }}
      >
        {conversations.map((conv, index) => {
          const otherUser = conv.participants.find(p => p._id !== currentUser);
          if (!otherUser) return null;
          console.log("Other User:", otherUser);

          const initials = `${otherUser.firstName?.[0] || ''}${otherUser.lastName?.[0] || ''}`;
          const isOnline = otherUser.status === "Online";

          return (
            <Box key={conv._id}>
              <Paper
                elevation={1}
                onClick={() => {
                  setOpen(true);
                  setSelectedConversation(conv); // Store clicked conversation
                }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 2,
                  borderRadius: 2,
                  mb: 1.5,
                  transition: "0.2s",
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? theme.palette.grey[900]
                      : theme.palette.grey[100],
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                    transform: "translateY(-2px)",
                    boxShadow: theme.shadows[4],
                    cursor: "pointer",
                  },
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: theme.palette.primary.main,
                    color: theme.palette.background.default,
                    width: 48,
                    height: 48,
                    fontSize: 18,
                    fontWeight: "bold",
                    mr: 2,
                  }}
                >
                  {initials}
                </Avatar>

                <Box flex={1}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {otherUser.firstName} {otherUser.lastName}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={1} mt={0.5}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: isOnline
                          ? theme.palette.success.main
                          : theme.palette.grey[500],
                      }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {isOnline ? "Online" : "Offline"}
                    </Typography>
                  </Stack>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    noWrap
                    mt={0.5}
                  >
                    {conv.lastMessage?.text || "No messages yet"}
                  </Typography>
                </Box>
              </Paper>
              {index !== conversations.length - 1 && <Divider />}
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default ConversationList;
