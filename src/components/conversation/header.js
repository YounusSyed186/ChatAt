import React, { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Avatar,
  Divider,
  styled,
  Badge,
  useTheme,
} from "@mui/material";
import {
  ArrowLeft,
  VideoCamera,
  Phone,
  MagnifyingGlass,
  CaretDown,
} from "phosphor-react";
import useStore from "../../zestand/store";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const Header = ({ conversation }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  // Assuming socket is stored in Zustand store, else import or pass it as prop
  const socket = useStore((state) => state.socket);
  const user = useStore((state) => state.user);
  const open = useStore((state) => state.open);
  const setOpen = useStore((state) => state.setOpen);
  const setType = useStore((state) => state.setType);

  const otherUser = conversation
    ? conversation.participants.find((p) => p._id !== user?.id)
    : null;

  const isOnline = otherUser?.status === "Online";

  // Example: effect for socket events or any side effect (optional)
  useEffect(() => {
    if (!socket) return;

    // Example: listen to call accepted or rejected events, cleanup on unmount
    const onCallAccepted = (data) => {
      console.log("Call accepted", data);
    };

    socket.on("call_accepted", onCallAccepted);

    return () => {
      socket.off("call_accepted", onCallAccepted);
    };
  }, [socket]);

  const toggleSidebar = useCallback(() => {
    setOpen(!open);
    setType("CONTACT");
  }, [open, setOpen, setType]);

  const handleVideoCall = useCallback(() => {
    if (!conversation) return;
    navigate(`/call/video/${conversation._id}`);
    console.log("Start video call");
  }, [navigate, conversation]);

  const handlePhoneCall = useCallback(() => {
    if (!socket || !otherUser || !conversation) return;
    socket.emit("start_audio_call", {
      from: user.id,
      to: otherUser._id,
      roomID: conversation._id,
    });
    navigate(`/call/audio/${conversation._id}`);
    console.log("Start phone call");
  }, [socket, user, otherUser, conversation, navigate]);

  return (
    <Box
      sx={{
        padding: 1,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        display: "flex",
        borderRadius: 1,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Left Section */}
      <Stack direction="row" alignItems="center" spacing={2}>
        <IconButton
          aria-label="Back"
          sx={{ color: theme.palette.primary.contrastText }}
          onClick={() => {
            // Add your back button handler here
            console.log("Back clicked");
          }}
        >
          <ArrowLeft />
        </IconButton>

        {otherUser ? (
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant={isOnline ? "dot" : "standard"}
            onClick={toggleSidebar}
            sx={{ cursor: "pointer" }}
          >
            <Avatar src={otherUser.avatar || "/avatar.png"} alt="User Avatar" />
          </StyledBadge>
        ) : (
          <Avatar src="/avatar.png" alt="User Avatar" />
        )}

        <Stack direction="column" spacing={0.5}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            {otherUser
              ? `${otherUser.firstName} ${otherUser.lastName}`
              : "Select a conversation"}
          </Typography>
          <Typography variant="body2" color={isOnline ? "#44b700" : "inherit"}>
            {isOnline ? "Online" : "Offline"}
          </Typography>
        </Stack>
      </Stack>

      {/* Right Section */}
      <Stack direction="row" spacing={2} alignItems="center">
        <IconButton
          aria-label="Start video call"
          sx={{ color: theme.palette.primary.contrastText }}
          onClick={handleVideoCall}
          disabled={!otherUser || !isOnline}
          title={otherUser && isOnline ? "Start Video Call" : "User offline"}
        >
          <VideoCamera />
        </IconButton>

        <IconButton
          aria-label="Start audio call"
          sx={{ color: theme.palette.primary.contrastText }}
          onClick={handlePhoneCall}
          disabled={!otherUser || !isOnline}
          title={otherUser && isOnline ? "Start Audio Call" : "User offline"}
        >
          <Phone />
        </IconButton>

        <IconButton
          aria-label="Search"
          sx={{ color: theme.palette.primary.contrastText }}
          onClick={() => {
            console.log("Search clicked");
          }}
        >
          <MagnifyingGlass />
        </IconButton>

        <Divider
          orientation="vertical"
          flexItem
          sx={{
            borderColor: theme.palette.primary.contrastText,
            borderWidth: "1px",
            marginX: 1,
          }}
        />

        <IconButton
          aria-label="More options"
          sx={{ color: theme.palette.primary.contrastText }}
          onClick={() => {
            console.log("Options clicked");
          }}
        >
          <CaretDown />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default Header;
