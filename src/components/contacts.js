import React, { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Avatar,
  Divider,
  Switch,
  Button,
  useTheme,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Slide
} from "@mui/material";
import {
  VideoCamera,
  Phone,
  Star,
  Bell,
  Trash,
  UserMinus,
  X,
  ArrowRight
} from "phosphor-react";
import useStore from "../zestand/store";

// Slide animation for dialogs
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BlockDialog = ({ open, handleClose }) => (
  <Dialog
    open={open}
    TransitionComponent={Transition}
    keepMounted
    onClose={handleClose}
  >
    <DialogTitle>{"Block This Contact"}</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Are you sure you want to block this contact?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={handleClose} color="error">Block</Button>
    </DialogActions>
  </Dialog>
);

const DeleteDialog = ({ open, handleClose }) => (
  <Dialog
    open={open}
    TransitionComponent={Transition}
    keepMounted
    onClose={handleClose}
  >
    <DialogTitle>{"Delete this Chat"}</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Are you sure you want to delete this chat?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={handleClose} color="error">Delete</Button>
    </DialogActions>
  </Dialog>
);

const Contact = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const user = useStore((state) => state.user);
  const setOpen = useStore((state) => state.setOpen);
  const setType = useStore((state) => state.setType);

  const [openBlock, setOpenBlock] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <Box
      sx={{
        width: 350,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderLeft: `1px solid ${theme.palette.divider}`,
        boxShadow: isDark ? "0 0 10px #111" : "0 0 10px #ccc",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
          fontWeight: "bold",
          bgcolor: theme.palette.background.default
        }}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="subtitle1" fontWeight={600}>
          Contact Info
        </Typography>
        <IconButton onClick={() => setOpen(false)}>
          <X size={22} />
        </IconButton>
      </Box>

      {/* Scrollable Content */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          "&::-webkit-scrollbar": { width: 0 },
          p: 2
        }}
      >
        {/* Profile Section */}
        <Stack alignItems="center" spacing={1}>
          <Avatar sx={{ width: 80, height: 80 }} src="/avatar.png" />
          <Typography variant="subtitle1">John Doe</Typography>
          <Typography variant="body2" color="text.secondary">
            +91 6265 081 928
          </Typography>

          {/* Call Action Buttons */}
          <Stack direction="row" spacing={4} mt={1}>
            <Stack alignItems="center">
              <VideoCamera size={24} />
              <Typography variant="caption">Video</Typography>
            </Stack>
            <Stack alignItems="center">
              <Phone size={24} />
              <Typography variant="caption">Voice</Typography>
            </Stack>
          </Stack>
        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* About Section */}
        <Typography variant="subtitle2" gutterBottom>
          About
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Hi there, I am using
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* Media Section */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle2">Media, links and docs</Typography>
          <Typography
            variant="body2"
            color="primary"
            onClick={() => setType("SHARED")}
            sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
          >
            201 <ArrowRight size={19} />
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} mt={1}>
          {["/media1.jpg", "/media2.jpg", "/media3.jpg"].map((src, i) => (
            <Box
              key={i}
              component="img"
              src={src}
              sx={{
                width: 70,
                height: 70,
                borderRadius: 2,
                objectFit: "cover",
                boxShadow: theme.shadows[1]
              }}
            />
          ))}
        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* Starred Messages */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Star size={20} color={theme.palette.primary.main} />
            <Typography variant="body2">Starred Messages</Typography>
          </Stack>
          <IconButton onClick={() => setType("STARED")}>
            <ArrowRight size={19} />
          </IconButton>
        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* Mute Notifications */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" alignItems="center" spacing={1}>
            <Bell size={20} />
            <Typography variant="body2">Mute Notifications</Typography>
          </Stack>
          <Switch />
        </Stack>

        <Divider sx={{ my: 3 }} />

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

        <Divider sx={{ my: 3 }} />

        {/* Block & Delete Actions */}
        <Stack direction="row" spacing={2} mt={2}>
          <Button
            fullWidth
            startIcon={<UserMinus />}
            variant="outlined"
            color="primary"
            onClick={() => setOpenBlock(true)}
          >
            Block
          </Button>
          <Button
            fullWidth
            startIcon={<Trash />}
            variant="outlined"
            color="error"
            onClick={() => setOpenDelete(true)}
          >
            Delete
          </Button>
        </Stack>
      </Box>

      {/* Dialogs */}
      {openBlock && <BlockDialog open={openBlock} handleClose={() => setOpenBlock(false)} />}
      {openDelete && <DeleteDialog open={openDelete} handleClose={() => setOpenDelete(false)} />}
    </Box>
  );
};

export default Contact;
