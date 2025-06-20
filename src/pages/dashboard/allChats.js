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
  Badge,
  Skeleton,
  alpha
} from "@mui/material";
import { styled } from "@mui/material/styles";

const getDirectConversations = (userId, setConversations) => {
  const socket = getSocket();
  socket.emit("get_direct_Conversations", { user_id: userId }, (response) => {
    setConversations(response);
  });
};

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const ConversationList = () => {
  const theme = useTheme();
  const {
    conversations,
    setConversations,
    setSelectedConversation,
    selectedConversation
  } = useConversationStore();
  const [loading, setLoading] = useState(true);
  const currentUser = localStorage.getItem("user_id");

  useEffect(() => {
    if (currentUser) {
      setLoading(true);
      getDirectConversations(currentUser, setConversations);
      setTimeout(() => setLoading(false), 800); // Simulate loading
    }
  }, [currentUser]);

  // Loading skeleton
  if (loading) {
    return (
      <Box sx={{ p: 2 }}>
        {[...Array(5)].map((_, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Skeleton variant="circular" width={48} height={48} />
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width="60%" height={24} />
                <Skeleton variant="text" width="40%" height={16} />
              </Box>
            </Stack>
            {index < 4 && <Divider sx={{ mt: 2 }} />}
          </Box>
        ))}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: { xs: "calc(100vh - 120px)", md: "calc(100vh - 160px)" },
        overflowY: "auto",
        p: { xs: 1, sm: 2 },
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: alpha(theme.palette.background.paper, 0.8),
          borderRadius: '3px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: alpha(theme.palette.primary.main, 0.3),
          borderRadius: '3px',
          '&:hover': {
            background: alpha(theme.palette.primary.main, 0.5),
          },
        },
      }}
    >
      {conversations.length === 0 ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            textAlign: 'center',
            p: 4
          }}
        >
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No conversations yet
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Start a new conversation to see it appear here
          </Typography>
        </Box>
      ) : (
        conversations.map((conv, index) => {
          const lastMessage = conv.messages[conv.messages.length - 1];
          const otherUser = conv.participants.find(p => p._id !== currentUser);
          console.log(conv)
          if (!otherUser) return null;

          const initials = `${otherUser.firstName?.[0] || ''}${otherUser.lastName?.[0] || ''}`;
          const isOnline = otherUser.status === "Online";
          const isSelected = selectedConversation?._id === conv._id;

          return (
            <React.Fragment key={conv._id}>
              <Paper
                elevation={isSelected ? 4 : 0}
                onClick={() => setSelectedConversation(conv)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 1.5,
                  borderRadius: 2,
                  mb: 1,
                  transition: "all 0.2s ease",
                  backgroundColor: isSelected
                    ? alpha(theme.palette.primary.main, 0.1)
                    : theme.palette.background.paper,
                  border: `1px solid ${
                    isSelected 
                      ? theme.palette.primary.main 
                      : theme.palette.divider
                  }`,
                  "&:hover": {
                    backgroundColor: isSelected
                      ? alpha(theme.palette.primary.main, 0.15)
                      : theme.palette.action.hover,
                    transform: "translateY(-1px)",
                    boxShadow: theme.shadows[2],
                    cursor: "pointer",
                  },
                }}
              >
                {isOnline ? (
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
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
                  </StyledBadge>
                ) : (
                  <Avatar
                    sx={{
                      bgcolor: theme.palette.grey[700],
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
                )}

                <Box flex={1} sx={{ overflow: 'hidden' }}>
                  <Stack 
                    direction="row" 
                    justifyContent="space-between" 
                    alignItems="center"
                  >
                    <Typography 
                      variant="subtitle1" 
                      fontWeight={600}
                      noWrap
                    >
                      {otherUser.firstName} {otherUser.lastName}
                    </Typography>
                    {lastMessage && (
                      <Typography 
                        variant="caption" 
                        color="text.secondary"
                        sx={{ whiteSpace: 'nowrap', ml: 1 }}
                      >
                        {new Date(lastMessage.createdAt).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </Typography>
                    )}
                  </Stack>
                  
                  <Stack 
                    direction="row" 
                    alignItems="center" 
                    spacing={1} 
                    mt={0.5}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      noWrap
                      sx={{ flex: 1 }}
                    >
                      {lastMessage?.text || "No messages yet"}
                    </Typography>
                    {conv.unreadCount > 0 && (
                      <Box
                        sx={{
                          bgcolor: theme.palette.primary.main,
                          color: theme.palette.primary.contrastText,
                          borderRadius: '50%',
                          width: 20,
                          height: 20,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.75rem',
                          fontWeight: 'bold'
                        }}
                      >
                        {conv.unreadCount}
                      </Box>
                    )}
                  </Stack>
                </Box>
              </Paper>
              {index !== conversations.length - 1 && (
                <Divider 
                  sx={{ 
                    my: 1, 
                    opacity: 0.5,
                    borderColor: theme.palette.divider
                  }} 
                />
              )}
            </React.Fragment>
          );
        })
      )}
    </Box>
  );
};

export default ConversationList;