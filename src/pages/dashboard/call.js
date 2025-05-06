import React, { useState } from "react";
import {
  Box,
  IconButton,
  Stack,
  Typography,
  InputBase,
  Avatar,
  Divider,
  Button,
  alpha,
  useTheme,
  styled,
} from "@mui/material";
import {
  Phone,
  PhoneIncoming,
  PhoneOutgoing,
  MagnifyingGlass,
  PhoneSlash,
  Plus,
  Star,
} from "phosphor-react";
import StartCall from "../../sections/main/StartCall";

// Styled Components
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

const Scrollable = styled("div")(() => ({
  maxHeight: "calc(100vh - 240px)",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    display: "none",
  },
}));

const CallLogItem = ({ name, avatar, type, time, onCall }) => {
  const theme = useTheme();
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        p: 1.5,
        borderRadius: 2,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[1],
        mb: 1.2,
        transition: "all 0.2s",
        "&:hover": {
          backgroundColor: alpha(theme.palette.action.hover, 0.4),
        },
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar src={avatar} />
        <Stack>
          <Typography variant="subtitle1">{name}</Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            display="flex"
            alignItems="center"
          >
            {type === "incoming" ? (
              <PhoneIncoming size={14} color={theme.palette.success.main} />
            ) : (
              <PhoneOutgoing size={14} color={theme.palette.info.main} />
            )}
            &nbsp;{time}
          </Typography>
        </Stack>
      </Stack>
      <IconButton sx={{color:"green"}} onClick={onCall}>
        <Phone size={20} />
      </IconButton>
    </Stack>
  );
};

// Dummy Call Logs
const callLogs = [
  {
    id: 1,
    name: "Ali",
    avatar: "/avatar.png",
    type: "incoming",
    time: "Today, 12:30 PM",
  },
  {
    id: 2,
    name: "Osman",
    avatar: "/avatar.png",
    type: "outgoing",
    time: "Yesterday, 9:10 AM",
  },
  {
    id: 3,
    name: "Younus",
    avatar: "/avatar.png",
    type: "incoming",
    time: "Monday, 6:45 PM",
  },
];

const Call = () => {
  const theme = useTheme();
  const [StartConverstion, setStartConverstion] = useState(false)

  const handleCall = (name) => {
    console.log("Calling:", name);
    // Add call logic
  };

  return (
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
            Calls
          </Typography>
          <IconButton>
            <PhoneSlash size={22} color={theme.palette.text.primary} />
          </IconButton>
        </Stack>

        {/* Search */}
        <Search>
          <SearchIconWrapper>
            <MagnifyingGlass size={20} />
          </SearchIconWrapper>
          <StyledInputBase placeholder="Search Calls..." />
        </Search>

        <Divider />
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
                <Typography fontWeight={500}>Start Conversation</Typography>
                <IconButton onClick={()=> setStartConverstion(true)}>
                <Plus size={22} />
                </IconButton>
              </Box>

        <Divider />

        {/* Call Logs */}
        <Scrollable>
          <Typography variant="subtitle2" color="text.secondary" my={1}>
            Recent Calls
          </Typography>
          {callLogs.map((log) => (
            <CallLogItem
              key={log.id}
              {...log}
              onCall={() => handleCall(log.name)}
            />
          ))}
        </Scrollable>
      </Stack>
      <StartCall open={StartConverstion} handleClose={()=> setStartConverstion(false)} />
    </Box>
  );
};

export default Call;
