import React from "react";
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

// Styled Badge for online status
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
  const user = useStore((state) => state.user);
  const setOpen = useStore((state) => state.setOpen);
  const setType = useStore((state) => state.setType);

  // Find the other participant to display
  const otherUser = conversation
    ? conversation.participants.find((p) => p._id !== user?.id)
    : null;

  const isOnline = otherUser?.status === "Online";

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
        <IconButton sx={{ color: theme.palette.primary.contrastText }}>
          <ArrowLeft />
        </IconButton>

        {otherUser ? (
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant={isOnline ? "dot" : "standard"}
            onClick={() => {
              setOpen(!user.open);
              setType("CONTACT");
            }}
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
        <IconButton sx={{ color: theme.palette.primary.contrastText }}>
          <VideoCamera />
        </IconButton>
        <IconButton sx={{ color: theme.palette.primary.contrastText }}>
          <Phone />
        </IconButton>
        <IconButton sx={{ color: theme.palette.primary.contrastText }}>
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
        <IconButton sx={{ color: theme.palette.primary.contrastText }}>
          <CaretDown />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default Header;
