import React from "react";
import {
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Stack,
  Avatar,
  Paper,
  alpha,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  DotsThreeVertical,
  DownloadSimple,
  Image as ImageIcon,
} from "phosphor-react";
import { Message_options } from "../../data";
import { Navigate } from "react-router-dom";

const MessageOptions = ({ isOutgoing }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // Different options for incoming vs outgoing messages
  const options = isOutgoing 
    ? Message_options 
    : Message_options.filter(option => option.title !== "Delete for everyone");

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{
          color: theme.palette.mode === 'dark' ? theme.palette.grey[400] : theme.palette.grey[600],
          ":hover": {
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
          },
          alignSelf: "center"
        }}
      >
        <DotsThreeVertical size={20} weight="bold" />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "12px",
            boxShadow: theme.shadows[8],
            minWidth: 180,
            padding: 0.5,
          },
        }}
      >
        {options.map((el, index) => (
          <MenuItem 
            key={index} 
            onClick={handleClose}
            sx={{
              borderRadius: "8px",
              padding: "8px 12px",
              margin: "0 4px",
              ":hover": {
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
              }
            }}
          >
            <Typography variant="body2" fontWeight={500}>
              {el.title}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

const MessageWrapper = ({ el, children }) => {
  const theme = useTheme();
  const currentUserId = localStorage.getItem("user_id");
  const isOutgoing = el.from?._id === currentUserId || el.from === currentUserId;

  return (
    <Stack 
      direction="row" 
      justifyContent={isOutgoing ? "flex-end" : "flex-start"} 
      spacing={1}
      sx={{ width: "100%", padding: "4px 12px" }}
    >
      {!isOutgoing && (
        <Avatar 
          src={el.from?.avatar} 
          sx={{ width: 32, height: 32, alignSelf: "flex-end" }}
        >
          {el.from?.firstName?.charAt(0)}
        </Avatar>
      )}
      
      <Box
        p={1.5}
        sx={{
          backgroundColor: isOutgoing
            ? theme.palette.primary.main
            : theme.palette.background.paper,
          borderRadius: isOutgoing 
            ? "18px 4px 18px 18px"
            : "4px 18px 18px 18px",
          maxWidth: "75%",
          boxShadow: theme.shadows[1],
          position: "relative",
          "&:hover": {
            boxShadow: theme.shadows[2],
          }
        }}
      >
        {children}
      </Box>
      
      {/* Show MessageOptions for both incoming and outgoing messages */}
      <MessageOptions isOutgoing={isOutgoing} />
    </Stack>
  );
};

const MsgType = ({ el, withWrapper = true }) => {
  const theme = useTheme();
  const currentUserId = localStorage.getItem("user_id");
  const isOutgoing = el.from?._id === currentUserId || el.from === currentUserId;

  if (!el?.text) return null;

  const content = (
    <Typography 
      variant="body2" 
      sx={{ 
        color: isOutgoing 
          ? theme.palette.primary.contrastText 
          : theme.palette.text.primary,
        lineHeight: 1.5,
        fontSize: "0.875rem",
      }}
    >
      {el.text}
    </Typography>
  );

  return withWrapper ? <MessageWrapper el={el}>{content}</MessageWrapper> : content;
};

const MediaMsg = ({ el, withWrapper = true }) => {
  const theme = useTheme();
  const currentUserId = localStorage.getItem("user_id");
  const isOutgoing = el.from?._id === currentUserId || el.from === currentUserId;
  console.log("El message",el);

  if (!el) return null;

  const content = (
    <Stack spacing={1}>
      <Box
        component="img"
        src={el.file}
        alt={el.message || "media"}
        sx={{ 
          maxHeight: 300, 
          maxWidth: "100%",
          borderRadius: 2,
          objectFit: "cover",
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
        }}
      />
      {el.message && (
        <Typography
          variant="body2"
          sx={{
            color: isOutgoing
              ? theme.palette.primary.contrastText
              : theme.palette.text.primary,
          }}
        >
          {el.message}
        </Typography>
      )}
    </Stack>
  );

  return withWrapper ? <MessageWrapper el={el}>{content}</MessageWrapper> : content;
};

const LinkMsg = ({ el, withWrapper = true }) => {
  const theme = useTheme();
  const currentUserId = localStorage.getItem("user_id");
  const isOutgoing = el.from?._id === currentUserId || el.from === currentUserId;

  if (!el?.preview || !el.message) return null;

  const content = (
    <Paper 
      elevation={0} 
      sx={{ 
        overflow: "hidden", 
        borderRadius: 2,
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        maxWidth: 320
      }}
    >
      <Box
        component="img"
        src={el.preview}
        alt={el.message}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://dummyimage.com/600x400/eeeeee/999999&text=No+Preview";
        }}
        sx={{ 
          width: "100%", 
          height: 160, 
          objectFit: "cover" 
        }}
      />
      <Box p={1.5}>
        <Typography
          variant="subtitle2"
          sx={{
            color: isOutgoing 
              ? theme.palette.primary.contrastText 
              : theme.palette.text.primary,
            fontWeight: 500,
            mb: 0.5
          }}
        >
          {el.message}
        </Typography>
        <Typography 
          variant="caption" 
          sx={{ 
            color: isOutgoing 
              ? alpha(theme.palette.primary.contrastText, 0.7)
              : theme.palette.text.secondary,
            display: "block",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap"
          }}
        >
          {el.link}
        </Typography>
      </Box>
    </Paper>
  );

  return withWrapper ? <MessageWrapper el={el}>{content}</MessageWrapper> : content;
};

const ReplayMsg = ({ el, withWrapper = true }) => {
  const theme = useTheme();
  const currentUserId = localStorage.getItem("user_id");
  const isOutgoing = el.from?._id === currentUserId || el.from === currentUserId;

  if (!el?.message || !el.reply) return null;

  const content = (
    <Stack spacing={1.5}>
      <Box
        sx={{
          backgroundColor: isOutgoing
            ? alpha(theme.palette.primary.dark, 0.2)
            : alpha(theme.palette.grey[500], 0.1),
          borderRadius: 2,
          padding: 1.5,
          borderLeft: `3px solid ${
            isOutgoing ? theme.palette.primary.dark : theme.palette.grey[500]
          }`
        }}
      >
        <Typography variant="body2" sx={{ fontStyle: "italic" }}>
          {el.reply}
        </Typography>
      </Box>
      <Typography 
        variant="body2" 
        sx={{ 
          color: isOutgoing
            ? theme.palette.primary.contrastText
            : theme.palette.text.primary 
        }}
      >
        {el.message}
      </Typography>
    </Stack>
  );

  return withWrapper ? <MessageWrapper el={el}>{content}</MessageWrapper> : content;
};

const DocMsg = ({ el, withWrapper = true }) => {
  const theme = useTheme();
  const currentUserId = localStorage.getItem("user_id");
  const isOutgoing = el.from?._id === currentUserId || el.from === currentUserId;

  // Helper to trigger download
  const handleDownload = (fileUrl, filename = "document.pdf") => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const Content = (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        backgroundColor: isOutgoing
          ? alpha(theme.palette.primary.dark, 0.1)
          : theme.palette.background.paper,
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{
          padding: 1.5,
        }}
      >
        <Box
          sx={{
            backgroundColor: isOutgoing
              ? alpha(theme.palette.primary.light, 0.2)
              : alpha(theme.palette.grey[500], 0.1),
            borderRadius: 1,
            padding: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ImageIcon fontSize="medium" />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle2" fontWeight={500}>
            {el.filename || "document.pdf"}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {el.updatedAt || "2.4 MB"}
          </Typography>
        </Box>
        <IconButton
          size="small"
          sx={{
            color: isOutgoing
              ? theme.palette.primary.contrastText
              : theme.palette.primary.main,
          }}
          onClick={() => handleDownload(el.file, el.filename)}
        >
          <DownloadSimple size={18} weight="bold" />
        </IconButton>
      </Stack>
      {el.message && (
        <Box sx={{ padding: 1.5, paddingTop: 0 }}>
          <Typography
            variant="body2"
            sx={{
              color: isOutgoing
                ? theme.palette.primary.contrastText
                : theme.palette.text.primary,
            }}
          >
            {el.message}
          </Typography>
        </Box>
      )}
    </Paper>
  );

  return withWrapper ? <MessageWrapper el={el}>{Content}</MessageWrapper> : Content;
};

const TimeLine = ({ el }) => {
  const theme = useTheme();
  if (!el?.text) return null;

  return (
    <Stack 
      direction="row" 
      alignItems="center" 
      spacing={2} 
      sx={{ width: "100%", py: 1.5 }}
    >
      <Divider 
        sx={{ 
          flex: 1, 
          backgroundColor: alpha(theme.palette.divider, 0.3),
          height: "1px" 
        }} 
      />
      <Typography
        variant="caption"
        sx={{ 
          color: theme.palette.text.secondary, 
          whiteSpace: "nowrap",
          fontWeight: 500,
          fontSize: "0.75rem"
        }}
      >
        {el.text}
      </Typography>
      <Divider 
        sx={{ 
          flex: 1, 
          backgroundColor: alpha(theme.palette.divider, 0.3),
          height: "1px" 
        }} 
      />
    </Stack>
  );
};

export { TimeLine, MsgType, MediaMsg, ReplayMsg, LinkMsg, DocMsg };