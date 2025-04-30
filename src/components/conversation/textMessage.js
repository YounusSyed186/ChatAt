import React from "react";
import {
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Stack,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  DotsThreeVertical,
  DownloadSimple,
  Image as ImageIcon,
} from "phosphor-react";
import { Message_options } from "../../data";

const MessageOptions = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{
          color: theme.palette.text.secondary,
          ":hover": {
            backgroundColor: theme.palette.action.hover,
          },
        }}
      >
        <DotsThreeVertical size={20} />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: 2,
            boxShadow: theme.shadows[4],
          },
        }}
      >
        <Stack spacing={1} px={1}>
          {Message_options.map((el, index) => (
            <MenuItem key={index} onClick={handleClose}>
              {el.title}
            </MenuItem>
          ))}
        </Stack>
      </Menu>
    </>
  );
};

const MessageWrapper = ({ el, children }) => {
  const theme = useTheme();

  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"} spacing={1}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 2,
          maxWidth: 360,
          boxShadow: theme.shadows[3],
        }}
      >
        {children}
      </Box>
      <MessageOptions />
    </Stack>
  );
};

const MsgType = ({ el }) => {
  const theme = useTheme();
  if (!el?.message) return null;

  return (
    <MessageWrapper el={el}>
      <Typography
        variant="body2"
        sx={{
          color: el.incoming
            ? theme.palette.text.primary
            : theme.palette.primary.contrastText,
        }}
      >
        {el.message}
      </Typography>
    </MessageWrapper>
  );
};

const MediaMsg = ({ el }) => {
  const theme = useTheme();
  if (!el) return null;

  return (
    <MessageWrapper el={el}>
      <Stack spacing={1}>
        <img
          src={el.img}
          alt={el.message || "media"}
          style={{ maxHeight: 210, borderRadius: 8 }}
        />
        <Typography
          variant="body2"
          sx={{
            color: el.incoming
              ? theme.palette.text.primary
              : theme.palette.primary.contrastText,
          }}
        >
          {el.message}
        </Typography>
      </Stack>
    </MessageWrapper>
  );
};

const LinkMsg = ({ el }) => {
  const theme = useTheme();
  if (!el?.preview || !el.message) return null;

  return (
    <MessageWrapper el={el}>
      <Stack spacing={1}>
        <Box
          component="img"
          src={el.preview}
          alt={el.message}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://dummyimage.com/150x150/cccccc/000000&text=No+Image";
          }}
          sx={{ maxHeight: 210, borderRadius: 1 }}
        />
        <Typography
          variant="subtitle2"
          sx={{
            color: el.incoming
              ? theme.palette.text.primary
              : theme.palette.primary.contrastText,
          }}
        >
          {el.message}
        </Typography>
      </Stack>
    </MessageWrapper>
  );
};

const ReplayMsg = ({ el }) => {
  const theme = useTheme();
  if (!el?.message || !el.reply) return null;

  return (
    <MessageWrapper el={el}>
      <Stack spacing={1}>
        <Typography
          variant="body2"
          sx={{ color: theme.palette.text.primary }}
        >
          {el.message}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: el.incoming
              ? theme.palette.text.secondary
              : theme.palette.primary.contrastText,
          }}
        >
          {el.reply}
        </Typography>
      </Stack>
    </MessageWrapper>
  );
};

const DocMsg = ({ el }) => {
  const theme = useTheme();

  return (
    <MessageWrapper el={el}>
      <Stack spacing={2}>
        <Stack
          p={2}
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{
            backgroundColor: theme.palette.background.paper,
            borderRadius: 1,
          }}
        >
          <ImageIcon size={40} />
          <Typography variant="caption">abstract.png</Typography>
          <IconButton>
            <DownloadSimple />
          </IconButton>
        </Stack>
        <Typography
          variant="body2"
          sx={{ color: theme.palette.text.primary }}
        >
          {el.message}
        </Typography>
      </Stack>
    </MessageWrapper>
  );
};

const TimeLine = ({ el }) => {
  const theme = useTheme();
  if (!el?.text) return null;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Divider sx={{ flex: 1, backgroundColor: theme.palette.text.secondary }} />
      <Typography
        variant="body2"
        sx={{ color: theme.palette.text.secondary, whiteSpace: "nowrap" }}
      >
        {el.text}
      </Typography>
      <Divider sx={{ flex: 1, backgroundColor: theme.palette.text.secondary }} />
    </Stack>
  );
};

export { TimeLine, MsgType, MediaMsg, ReplayMsg, LinkMsg, DocMsg };