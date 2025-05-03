import React from "react";
import {
  Box,
  Typography,
  Stack,
  Avatar,
  Divider,
  Switch,
  Button,
  useTheme,
  Icon,
  IconButton
} from "@mui/material";
import { VideoCamera, Phone, Star, Bell, Trash, UserMinus, X, ArrowRight } from "phosphor-react";
const Contact = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        width: 350,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: isDark ? "background.paper" : "#fff",
        color: "text.primary",
        borderLeft: `1px solid ${theme.palette.divider}`
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
          fontWeight: "bold"

        }}
        display="flex"
        justifyContent="space-between"
        alignItems={"center"}
      >
        <Stack>

          Contact Info
        </Stack>
        <Stack>
          <IconButton >
            <X size={22}  />
          </IconButton>
        </Stack>
      </Box>

      {/* Scrollable Content */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          scrollbar: "hidden",
          "&::-webkit-scrollbar": {
            width: 0,
            background: "transparent"
          },
          p: 2
        }}
      >
        {/* Profile */}
        <Stack alignItems="center" spacing={1}>
          <Avatar sx={{ width: 80, height: 80 }} src="/avatar.png" />
          <Typography variant="subtitle1">John Doe</Typography>
          <Typography variant="body2" color="text.secondary">
            +91 6265 081 928
          </Typography>

          {/* Action Buttons */}
          <Stack direction="row" spacing={2} mt={1}>
            <Stack alignItems="center">
              <VideoCamera size={24} />
              <Typography variant="caption">Audio</Typography>
            </Stack>
            <Stack alignItems="center">
              <Phone size={24} />
              <Typography variant="caption">Voice</Typography>
            </Stack>
          </Stack>
        </Stack>

        <Divider sx={{ my: 2 }} />

        {/* About */}
        <Typography variant="subtitle2" gutterBottom>
          About
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Hi there, I am using
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Media, Links, and Docs */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle2">Media, links and docs</Typography>
          <IconButton  sx={{ color: theme.palette.primary.main }}>

            <Typography variant="body2" color="primary" alignItems={"center"}
              display="flex" >
              201
              <ArrowRight size={19} />
            </Typography>
          </IconButton>


        </Stack>

        <Stack direction="row" spacing={1} mt={1}>
          <Box component="img" src="/media1.jpg" sx={{ width: 70, height: 70, borderRadius: 1 }} />
          <Box component="img" src="/media2.jpg" sx={{ width: 70, height: 70, borderRadius: 1 }} />
          <Box component="img" src="/media3.jpg" sx={{ width: 70, height: 70, borderRadius: 1 }} />
        </Stack>

        <Divider sx={{ my: 2 }} />

        {/* Starred Messages */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
        >
          {/* Starred Messages Button */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton sx={{ color: theme.palette.primary.main }}>
              <Star size={20} />
            </IconButton>
            <Typography variant="body2">Starred Messages</Typography>
          </Stack>

          {/* Arrow Icon */}
          <IconButton>
            <ArrowRight size={19} />
          </IconButton>
        </Stack>

        <Divider sx={{ my: 2 }} />

        {/* Mute Notifications */}
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={1}>
            <Bell size={20} />
            <Typography variant="body2">Mute Notifications</Typography>
          </Stack>
          <Switch />
        </Stack>

        <Divider sx={{ my: 2 }} />

        {/* Group Info */}
        <Typography variant="subtitle2">1 group in common</Typography>
        <Stack direction="row" spacing={1} alignItems="center" mt={1}>
          <Avatar src="/group.jpg" />
          <Box>
            <Typography variant="body2">Camel's Gang</Typography>
            <Typography variant="caption" color="text.secondary">
              Owl, Parrot, Rabbit, You
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 2 }} />

        {/* Actions */}
        <Stack direction="row" spacing={2} mt={2} >
          <Button
            fullWidth
            startIcon={<UserMinus />}
            variant="outlined"
            color="primary"
          >
            Block
          </Button>
          <Button
            fullWidth
            startIcon={<Trash />}
            variant="outlined"
            color="error"
          >
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default Contact;
