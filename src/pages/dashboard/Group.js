import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Divider,
  InputBase,
  Avatar,
  Badge,
  styled,
  useTheme,
  alpha,
} from "@mui/material";
import {
  CircleDashed,
  MagnifyingGlass,
  Plus,
} from "phosphor-react";

// Online Status Badge
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
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
    "0%": { transform: "scale(.8)", opacity: 1 },
    "100%": { transform: "scale(2.4)", opacity: 0 },
  },
}));

const SearchBar = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: alpha(theme.palette.action.hover, 0.2),
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(0.5, 2),
  boxShadow: theme.shadows[1],
}));

const ScrollArea = styled("div")(({ theme }) => ({
  flex: 1,
  overflowY: "auto",
  overflowX: "hidden",
  maxHeight: "calc(100vh - 220px)",
  "&::-webkit-scrollbar": { display: "none" },
  scrollbarWidth: "none",
}));

const ChatCard = ({
  id,
  name,
  message,
  time,
  unreadCount,
  avatar,
  isSelected,
  onClick,
}) => {
  const theme = useTheme();
  return (
    <Box
      onClick={() => onClick(id)}
      sx={{
        p: 1.5,
        borderRadius: 2,
        backgroundColor: isSelected
          ? theme.palette.primary.main
          : theme.palette.background.paper,
        color: isSelected
          ? theme.palette.primary.contrastText
          : theme.palette.text.primary,
        boxShadow: isSelected ? theme.shadows[4] : theme.shadows[1],
        cursor: "pointer",
        "&:hover": {
          backgroundColor: isSelected
            ? theme.palette.primary.dark
            : alpha(theme.palette.action.hover, 0.3),
        },
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar src={avatar} sx={{ width: 48, height: 48 }} />
        </StyledBadge>
        <Stack sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle1" fontWeight={600}>
            {name}
          </Typography>
          <Typography
            variant="body2"
            color={isSelected ? "inherit" : "text.secondary"}
            noWrap
          >
            {message}
          </Typography>
        </Stack>
        <Stack alignItems="flex-end">
          <Typography
            variant="caption"
            color={isSelected ? "inherit" : "text.secondary"}
          >
            {time}
          </Typography>
          {unreadCount > 0 && (
            <Box
              sx={{
                mt: 0.5,
                bgcolor: theme.palette.error.main,
                color: theme.palette.error.contrastText,
                px: 1,
                borderRadius: "50%",
                fontSize: 12,
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 24,
                height: 24,
              }}
            >
              {unreadCount}
            </Box>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

const chatList = [
  {
    id: 1,
    name: "Pink Panda",
    message: "You: thanks",
    time: "12:00",
    unreadCount: 2,
    avatar: "/avatar.png",
    isPinned: true,
  },
  {
    id: 2,
    name: "Blue Whale",
    message: "Let's meet tomorrow",
    time: "11:45",
    unreadCount: 1,
    avatar: "/avatar.png",
    isPinned: false,
  },
  {
    id: 3,
    name: "Green Turtle",
    message: "Okay, see you!",
    time: "10:30",
    unreadCount: 0,
    avatar: "/avatar.png",
    isPinned: false,
  },
  {
    id: 4,
    name: "Red Fox",
    message: "Can you send me the file?",
    time: "09:15",
    unreadCount: 3,
    avatar: "/avatar.png",
    isPinned: true,
  },
  {
    id: 5,
    name: "Yellow Canary",
    message: "Sure, I'll do it.",
    time: "08:45",
    unreadCount: 0,
    avatar: "/avatar.png",
    isPinned: false,
  },
];

const Group = () => {
  const theme = useTheme();
  const [selectedChat, setSelectedChat] = useState(null);

  const pinned = chatList.filter((chat) => chat.isPinned);
  const regular = chatList.filter((chat) => !chat.isPinned);

  return (
    <Box
      sx={{
        width: 330,
        height: "100vh",
        bgcolor: theme.palette.background.default,
        borderRadius: 3,
        boxShadow: theme.shadows[4],
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight={700}>
          Group
        </Typography>
        <IconButton>
          <CircleDashed size={22} />
        </IconButton>
      </Stack>

      {/* Search */}
      <SearchBar>
        <MagnifyingGlass size={18} style={{ marginRight: 8 }} />
        <InputBase placeholder="Search group..." fullWidth />
      </SearchBar>

      {/* New Group Section */}
      <Box
        sx={{
          mt: 2,
          mb: 1,
          px: 2,
          py: 1,
          borderRadius: 2,
          bgcolor: alpha(theme.palette.primary.main, 0.1),
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography fontWeight={500}>Create New Group</Typography>
        <Plus size={20} />
      </Box>

      {/* Chat List Scrollable */}
      <ScrollArea>
        {pinned.length > 0 && (
          <>
            <Typography variant="caption" color="text.secondary" mb={1}>
              Pinned
            </Typography>
            <Stack spacing={1.5} mb={2}>
              {pinned.map((chat) => (
                <ChatCard
                  key={chat.id}
                  {...chat}
                  isSelected={selectedChat === chat.id}
                  onClick={setSelectedChat}
                />
              ))}
            </Stack>
            <Divider />
          </>
        )}
        {/* All Groups */}
        <Typography variant="caption" color="text.secondary" mt={2} mb={1}>
          All Groups
        </Typography>
        <Stack spacing={1.5}>
          {regular.map((chat) => (
            <ChatCard
              key={chat.id}
              {...chat}
              isSelected={selectedChat === chat.id}
              onClick={setSelectedChat}
            />
          ))}
        </Stack>
      </ScrollArea>
    </Box>
  );
};

export default Group;
