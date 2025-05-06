import React from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  Typography,
  Avatar,
  InputBase,
  Box,
  useTheme,
  styled,
  Slide,
} from "@mui/material";
import {
  MagnifyingGlass,
  X,
  Phone,
  VideoCamera,
} from "phosphor-react";

// Slide transition
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

// Styled Search Bar
const SearchBar = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1.2, 2),
  marginBottom: theme.spacing(2),
}));

const StartCall = ({ open, handleClose }) => {
  const theme = useTheme();

  const callData = [
    { name: "Dinesh", time: "Yesterday, 21:29", avatar: "/avatar.png" },
    { name: "Dog Hat", time: "Yesterday, 16:53", avatar: "/avatar.png" },
    { name: "Cute Turtle", time: "Yesterday, 16:53", avatar: "/avatar.png" },
    { name: "Cool spirit", time: "Yesterday, 16:53", avatar: "/avatar.png" },
    { name: "strange cat", time: "Yesterday, 16:53", avatar: "/avatar.png" },
  ];

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          backgroundColor: theme.palette.background.default,
          p: 2,
        },
      }}
      TransitionComponent={Transition}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <SearchBar>
          <MagnifyingGlass size={20} style={{ marginRight: 8 }} />
          <InputBase
            placeholder="Search"
            fullWidth
            sx={{ fontSize: 14 }}
          />
        </SearchBar>
        <IconButton onClick={handleClose}>
          <X />
        </IconButton>
      </Stack>

      <DialogContent sx={{ p: 0, pt: 1 }}>
        <Stack spacing={2}>
          {callData.map((item, index) => (
            <Stack
              key={index}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ px: 1 }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar src={item.avatar} />
                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {item.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ fontSize: 12 }}
                  >
                    {item.time}
                  </Typography>
                </Box>
              </Stack>
              <Stack direction="row" spacing={1}>
                <IconButton>
                  <Phone color={theme.palette.success.main} />
                </IconButton>
                <IconButton>
                  <VideoCamera color={theme.palette.success.main} />
                </IconButton>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default StartCall;
