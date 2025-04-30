import React, { useState } from "react";
import { faker } from "@faker-js/faker"; // Import faker for generating random avatars
import {
  alpha,
  Box,
  IconButton,
  Stack,
  styled,
  Typography,
  InputBase,
  Button,
  Divider,
  Avatar,
  Badge,
  useTheme,
} from "@mui/material";
import { ArchiveBox, CircleDashed, MagnifyingGlass } from "phosphor-react";

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

// Styled Scrollable Container
const ScrollableContainer = styled("div")(() => ({
  maxHeight: "calc(100vh - 250px)", // Adjust height to fit within the viewport
  overflowY: "auto", // Enable vertical scrolling
  overflowX: "hidden", // Disable horizontal scrolling
  scrollbarWidth: "none", // For Firefox
  "-ms-overflow-style": "none", // For Internet Explorer and Edge
  "&::-webkit-scrollbar": {
    display: "none", // Hide scroll bar for Chrome, Safari, and Opera
  },
}));

// Dummy Chat List
const chatList = [
  {
    id: 1,
    name: "Pink Panda",
    message: "You: thanks",
    time: "12:00",
    unreadCount: 2,
    avatar: faker.image.avatar(),
    isPinned: true, // Mark as pinned
  },
  {
    id: 2,
    name: "Blue Whale",
    message: "Let's meet tomorrow",
    time: "11:45",
    unreadCount: 1,
    avatar: faker.image.avatar(),
    isPinned: false,
  },
  {
    id: 3,
    name: "Green Turtle",
    message: "Okay, see you!",
    time: "10:30",
    unreadCount: 0,
    avatar: faker.image.avatar(),
    isPinned: false,
  },
  {
    id: 4,
    name: "Red Fox",
    message: "Can you send me the file?",
    time: "09:15",
    unreadCount: 3,
    avatar: faker.image.avatar(),
    isPinned: true, // Mark as pinned
  },
  {
    id: 5,
    name: "Yellow Canary",
    message: "Sure, I'll do it.",
    time: "08:45",
    unreadCount: 0,
    avatar: faker.image.avatar(),
    isPinned: false,
  },
];

// Chat Element Component
const ChatElement = ({ id, name, message, time, unreadCount, avatar, isSelected, onClick }) => {
  const theme = useTheme(); // Access the theme
  return (
    <Box
      onClick={() => onClick(id)} // Handle click event
      sx={{
        width: "100%",
        borderRadius: 2,
        height: 70,
        backgroundColor: isSelected ? theme.palette.primary.main : theme.palette.background.paper,
        color: isSelected ? theme.palette.primary.contrastText : theme.palette.text.primary,
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        boxShadow: isSelected ? "0px 4px 10px rgba(0, 0, 0, 0.2)" : "0px 2px 5px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease",
        "&:hover": {
          backgroundColor: isSelected ? theme.palette.primary.dark : alpha(theme.palette.action.hover, 0.8),
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
        },
      }}
      p={2}
    >
      <Stack direction="row" alignItems={"center"} justifyContent={"space-between"} sx={{ width: "100%" }}>
        <Stack direction={"row"} alignItems={"center"}>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar src={avatar} sx={{ width: 50, height: 50 }} />
          </StyledBadge>
          <Stack ml={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: isSelected ? theme.palette.primary.contrastText : theme.palette.text.primary }}>
              {name}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: isSelected ? theme.palette.primary.contrastText : theme.palette.text.secondary,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "200px", // Original width retained
              }}
            >
              {message}
            </Typography>
          </Stack>
        </Stack>
        <Stack alignItems={"flex-end"}>
          <Typography variant="caption" sx={{ color: isSelected ? theme.palette.primary.contrastText : theme.palette.text.secondary }}>
            {time}
          </Typography>
          {unreadCount > 0 && (
            <Typography
              variant="caption"
              sx={{
                backgroundColor: theme.palette.error.main,
                color: theme.palette.error.contrastText,
                borderRadius: "50%",
                width: 24,
                height: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.75rem",
                fontWeight: "bold",
              }}
            >
              {unreadCount}
            </Typography>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

// Styled components for the search bar
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.background.paper, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.background.paper, 0.25),
  },
  width: "100%",
  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
  },
}));

// Main Chats Component
const Chats = () => {
  const theme = useTheme(); // Access the theme
  const [selectedChat, setSelectedChat] = useState(null); // State to track selected chat

  const handleChatClick = (id) => {
    setSelectedChat(id); // Update selected chat
  };

  const pinnedChats = chatList.filter((chat) => chat.isPinned); // Filter pinned chats
  const allChats = chatList.filter((chat) => !chat.isPinned); // Filter non-pinned chats

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        width: 330, // Original width retained
        backgroundColor: theme.palette.background.default,
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <Stack p={1} spacing={3} sx={{ height: "100%" }}>
        {/* Header */}
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h5" sx={{ fontWeight: "bold", color: theme.palette.text.primary }}>
            Chats
          </Typography>
          <IconButton>
            <CircleDashed color={theme.palette.text.primary} />
          </IconButton>
        </Stack>

        {/* Search Bar */}
        <Stack sx={{ width: "100%" }}>
          <Search>
            <SearchIconWrapper>
              <MagnifyingGlass color={theme.palette.primary.main} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search..."
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Stack>

        {/* Archive Section */}
        <Stack spacing={2} sx={{ flex: 1 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              padding: 1,
              backgroundColor: theme.palette.background.paper,
              borderRadius: 2,
              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <ArchiveBox size={24} color={theme.palette.text.primary} />
            <Button variant="contained" color="primary" size="small">
              Archive
            </Button>
          </Stack>
          <Divider />

          {/* Combined Scrollable Section */}
          <ScrollableContainer>
            {/* Pinned Section */}
            {pinnedChats.length > 0 && (
              <>
                <Stack spacing={1}>
                  <Typography variant="subtitle2" color={theme.palette.text.secondary}>
                    Pinned
                  </Typography>
                  <Stack direction={"column"} spacing={2}>
                    {pinnedChats.map((chat) => (
                      <ChatElement
                        key={chat.id}
                        id={chat.id}
                        name={chat.name}
                        message={chat.message}
                        time={chat.time}
                        unreadCount={chat.unreadCount}
                        avatar={chat.avatar}
                        isSelected={selectedChat === chat.id} // Check if chat is selected
                        onClick={handleChatClick} // Pass click handler
                      />
                    ))}
                  </Stack>
                </Stack>
                <Divider sx={{ my: 2 }} /> {/* Add spacing around the divider */}
              </>
            )}

            {/* All Chats Section */}
            <Stack spacing={1} sx={{ mt: 2 }}> {/* Add margin-top for spacing */}
              <Typography variant="subtitle2" color={theme.palette.text.secondary}>
                All Chats
              </Typography>
              <Stack direction={"column"} spacing={2}>
                {allChats.map((chat) => (
                  <ChatElement
                    key={chat.id}
                    id={chat.id}
                    name={chat.name}
                    message={chat.message}
                    time={chat.time}
                    unreadCount={chat.unreadCount}
                    avatar={chat.avatar}
                    isSelected={selectedChat === chat.id} // Check if chat is selected
                    onClick={handleChatClick} // Pass click handler
                  />
                ))}
              </Stack>
            </Stack>
          </ScrollableContainer>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Chats;