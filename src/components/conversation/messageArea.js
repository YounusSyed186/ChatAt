import React from "react";
import { Box, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Chat_History } from "../../data";
import {
  TimeLine,
  MsgType,
  MediaMsg,
  ReplayMsg,
  LinkMsg,
  DocMsg,
} from "./textMessage.js";

const MessageArea = ({ withWrapper = true }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        flex: 1,
        padding: 2,
        overflowY: "auto",
        backgroundColor: theme.palette.background.default,
        "&::-webkit-scrollbar": {
          display: "none",
        },
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}
    >
      <Stack spacing={3}>
        {Chat_History.map((el, index) => {
          switch (el.type) {
            case "divider":
              return <TimeLine key={el.id || index} el={el} />;

            case "msg":
              const commonProps = { key: el.id || index, el, withWrapper };

              switch (el.subtype) {
                case "img":
                  return <MediaMsg {...commonProps} />;
                case "doc":
                  return <DocMsg {...commonProps} />;
                case "link":
                  return <LinkMsg {...commonProps} />;
                case "reply":
                  return <ReplayMsg {...commonProps} />;
                default:
                  return <MsgType {...commonProps} />;
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
