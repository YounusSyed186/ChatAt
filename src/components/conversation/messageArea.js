import React from "react";
import { Box, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Chat_History } from "../../data"; // Adjust the import path as necessary
import { TimeLine, MsgType, MediaMsg, ReplayMsg, LinkMsg, DocMsg } from "./textMessage.js";

const MessageArea = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        flex: 1,
        padding: 2,
        overflowY: "auto",
        backgroundColor: theme.palette.background.default, // Use theme background
        "&::-webkit-scrollbar": {
          display: "none", // Hide scrollbar for WebKit browsers
        },
        msOverflowStyle: "none", // Hide scrollbar for Internet Explorer and Edge
        scrollbarWidth: "none", // Hide scrollbar for Firefox
      }}
    >
      <Stack spacing={3}>
        {Chat_History.map((el, index) => {
          switch (el.type) {
            case "divider":
              return <TimeLine key={el.id || index} el={el} />;

            case "msg":
              switch (el.subtype) {
                case "img":
                  return <MediaMsg key={el.id || index} el={el} />;
                case "doc":
                  // Handle document messages here
                  return <DocMsg key={el.id || index} el={el} />;
                case "link":
                  return <LinkMsg key={el.id || index} el={el} />;
                case "reply":
                  return <ReplayMsg key={el.id || index} el={el} />;
                default:
                  return <MsgType key={el.id || index} el={el} />;
              }

            default:
              return null;
          }
        })}
      </Stack>
    </Box>
  );
};

export default MessageArea;