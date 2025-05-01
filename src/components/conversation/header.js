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

const Header = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        padding: 1,
        backgroundColor: theme.palette.primary.main, // Use theme primary color
        color: theme.palette.primary.contrastText, // Use theme contrast text
        display: "flex",
        borderRadius: 1,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Left Section: Back Button and User Details */}
      <Stack direction="row" alignItems="center" spacing={2}>
        <IconButton sx={{ color: theme.palette.primary.contrastText }}>
          <ArrowLeft />
        </IconButton>
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar src="/avatar.png" alt="User Avatar" />
        </StyledBadge>
        <Stack direction="column" spacing={0.5}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", color: theme.palette.primary.contrastText }}
          >
            John Doe
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.primary.contrastText }}
          >
            Online
          </Typography>
        </Stack>
      </Stack>

      {/* Right Section: Action Icons */}
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