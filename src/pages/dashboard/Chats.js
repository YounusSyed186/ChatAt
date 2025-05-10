import React, { useState } from "react";
import {
  alpha,
  Box,
  IconButton,
  Stack,
  Typography,
  InputBase,
  Button,
  Divider,
  Avatar,
  Badge,
  useTheme,
  styled,
} from "@mui/material";
import {
  ArchiveBox,
  CircleDashed,
  MagnifyingGlass,
  Rows,
  User,
  Users,
} from "phosphor-react";
import Friends from "../../sections/main/friends";

// Styled Badge for online status
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.main,
    boxShadow: `0 0 0 2px ${theme.palette.background.default}`,
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
      transform: "scale(0.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

// Scroll container
const ScrollableContainer = styled("div")(() => ({
  maxHeight: "calc(100vh - 250px)",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    display: "none",
  },
}));

// Search box
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.action.hover, 0.2),
  "&:hover": {
    backgroundColor: alpha(theme.palette.action.hover, 0.3),
  },
  width: "100%",
  boxShadow: theme.shadows[1],
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  width: "100%",
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
}));

// Chat list item
const ChatElement = ({
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
        display: "flex",
        alignItems: "center",
        borderRadius: 2,
        padding: 1.5,
        backgroundColor: isSelected
          ? theme.palette.primary.main
          : theme.palette.background.paper,
        color: isSelected
          ? theme.palette.primary.contrastText
          : theme.palette.text.primary,
        cursor: "pointer",
        transition: "all 0.2s ease",
        boxShadow: isSelected ? theme.shadows[3] : theme.shadows[1],
        "&:hover": {
          backgroundColor: isSelected
            ? theme.palette.primary.dark
            : alpha(theme.palette.action.hover, 0.6),
        },
      }}
    >
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant="dot"
      >
        <Avatar src={avatar} sx={{ width: 48, height: 48 }} />
      </StyledBadge>
      <Stack ml={2} flexGrow={1}>
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
      <Stack alignItems="flex-end" spacing={0.5}>
        <Typography variant="caption" color="text.secondary">
          {time}
        </Typography>
        {unreadCount > 0 && (
          <Box
            sx={{
              bgcolor: theme.palette.error.main,
              color: theme.palette.error.contrastText,
              borderRadius: "50%",
              width: 20,
              height: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.75rem",
              fontWeight: "bold",
            }}
          >
            {unreadCount}
          </Box>
        )}
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

// Main Component
const Chats = () => {
  const [openDialdog, setopenDialdog] = useState(false)

  const handleOpenDialog = () => {
    setopenDialdog(true)
  }
  const handleCloseDialog = () => {
    setopenDialdog(false)
  }
  const theme = useTheme();
  const [selectedChat, setSelectedChat] = useState(null);

  const handleChatClick = (id) => {
    setSelectedChat(id);
  };

  const pinnedChats = chatList.filter((chat) => chat.isPinned);
  const allChats = chatList.filter((chat) => !chat.isPinned);

  return (
    <>

      <Box
        sx={{
          height: "100vh",
          width: 330,
          backgroundColor: theme.palette.background.default,
          borderRadius: 3,
          boxShadow: theme.shadows[5],
          p: 2,
        }}
      >
        <Stack spacing={3} height="100%">
          {/* Header */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" fontWeight={700}>
              Chats
            </Typography>
            <Stack direction={"Rows"}>
              <IconButton onClick={() => {
                handleOpenDialog()
              }}>
                <Users size={22} color={theme.palette.text.primary} />
              </IconButton>
              <IconButton>
                <CircleDashed size={22} color={theme.palette.text.primary} />
              </IconButton>
            </Stack>
          </Stack>

          {/* Search */}
          <Search>
            <SearchIconWrapper>
              <MagnifyingGlass size={20} color={theme.palette.text.primary} />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search..." inputProps={{ "aria-label": "search" }} />
          </Search>

          {/* Archive */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              p: 1.5,
              borderRadius: 2,
              backgroundColor: theme.palette.background.paper,
              boxShadow: theme.shadows[1],
            }}
          >
            <ArchiveBox size={22} color={theme.palette.text.primary} />
            <Button variant="contained" size="small">
              Archive
            </Button>
          </Stack>

          <Divider />

          {/* Chats */}
          <ScrollableContainer>
            {pinnedChats.length > 0 && (
              <>
                <Typography variant="subtitle2" color="text.secondary" mt={1} mb={0.5}>
                  Pinned
                </Typography>
                <Stack spacing={1} mb={2}>
                  {pinnedChats.map((chat) => (
                    <ChatElement
                      key={chat.id}
                      {...chat}
                      isSelected={selectedChat === chat.id}
                      onClick={handleChatClick}
                    />
                  ))}
                </Stack>
                <Divider sx={{ mb: 2 }} />
              </>
            )}

            <Typography variant="subtitle2" color="text.secondary" mb={1}>
              All Chats
            </Typography>
            <Stack spacing={1}>
              {allChats.map((chat) => (
                <ChatElement
                  key={chat.id}
                  {...chat}
                  isSelected={selectedChat === chat.id}
                  onClick={handleChatClick}
                />
              ))}
            </Stack>
          </ScrollableContainer>
        </Stack>
      </Box>
      {openDialdog && <Friends open={openDialdog} handleclose={handleCloseDialog} />}
    </>
  );
};

export default Chats;
