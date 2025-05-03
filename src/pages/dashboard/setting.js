import React, { useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  Stack,
  Divider,
  useTheme,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Bell,
  Lock,
  Shield,
  PaintBrush,
  Image,
  Note,
  Keyboard,
  Question,
  CaretLeft,
} from "phosphor-react";
import ShortcutsDialog from "../../sections/settings/ShortCuts";

const Settings = () => {
  const theme = useTheme();
  const [shortcut, setShortcut] = useState(false);

  // Placeholder handlers for now
  const handleThemeClick = () => {
    console.log("Theme clicked");
    // Add logic for opening a theme dialog or toggling theme
  };

  const handleWallpaperClick = () => {
    console.log("Chat Wallpaper clicked");
  };

  const handleAccountInfoClick = () => {
    console.log("Request Account Info clicked");
  };

  const handleHelpClick = () => {
    console.log("Help clicked");
  };

  const handleCloseShortcutsDialog = () => {
    setShortcut(false);
  };

  const settingsOptions = [
    {
      label: "Notifications",
      icon: <Bell size={24} />,
      onClick: () => console.log("Notifications clicked"),
    },
    {
      label: "Privacy",
      icon: <Lock size={24} />,
      onClick: () => console.log("Privacy clicked"),
    },
    {
      label: "Security",
      icon: <Shield size={24} />,
      onClick: () => console.log("Security clicked"),
    },
    {
      label: "Theme",
      icon: <PaintBrush size={24} />,
      onClick: handleThemeClick,
    },
    {
      label: "Chat Wallpaper",
      icon: <Image size={24} />,
      onClick: handleWallpaperClick,
    },
    {
      label: "Request Account Info",
      icon: <Note size={24} />,
      onClick: handleAccountInfoClick,
    },
    {
      label: "Keyboard shortcuts",
      icon: <Keyboard size={24} />,
      onClick: () => setShortcut(true),
    },
    {
      label: "Help",
      icon: <Question size={24} />,
      onClick: handleHelpClick,
    },
  ];

  return (
    <Box
      sx={{
        width: 350,
        height: "100vh",
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        p: 2,
        boxShadow: theme.shadows[4],
        borderRight: `1px solid ${theme.palette.divider}`,
      }}
    >
      {/* Header */}
      <Box display="flex" alignItems="center" mb={2}>
        <CaretLeft size={24} style={{ marginRight: 8 }} />
        <Typography variant="h5" fontWeight="bold">
          Settings
        </Typography>
      </Box>

      {/* Profile */}
      <Stack direction="row" spacing={2} alignItems="center" mb={3}>
        <Avatar src="/avatar.png" sx={{ width: 60, height: 60 }} />
        <Box>
          <Typography sx={{ fontSize: "1.1rem", fontWeight: 600 }}>
            Shreyansh Shah
          </Typography>
          <Typography sx={{ fontSize: "0.95rem" }} color="text.secondary">
            Exploring
          </Typography>
        </Box>
      </Stack>

      <Divider sx={{ mb: 2 }} />

      {/* Settings List */}
      <List disablePadding>
        {settingsOptions.map((item) => (
          <React.Fragment key={item.label}>
            <ListItemButton onClick={item.onClick} sx={{ borderRadius: 1 }}>
              <ListItemIcon sx={{ color: theme.palette.text.primary }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography sx={{ fontSize: "1rem" }}>
                    {item.label}
                  </Typography>
                }
              />
            </ListItemButton>
            <Divider sx={{ my: 1 }} />
          </React.Fragment>
        ))}
      </List>

      {/* Shortcut Dialog */}
      {shortcut && <ShortcutsDialog open={shortcut} onClose={handleCloseShortcutsDialog} />}
    </Box>
  );
};

export default Settings;
