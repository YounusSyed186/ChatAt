import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { Chat } from "phosphor-react";

const Welcome = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 2,
        textAlign: "center",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        px: 2,
      }}
    >
      <Chat sx={{ fontSize: 80, color: theme.palette.primary.main }} />
      <Typography variant="h4" fontWeight={600}>
        Welcome to ChatAt
      </Typography>
      <Typography variant="body1" color="text.secondary" maxWidth={400}>
        Start a conversation by selecting a chat or creating a new one. Your conversations will appear here.
      </Typography>
    </Box>
  );
};

export default Welcome;
