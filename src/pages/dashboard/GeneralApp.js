import React from "react";
import Chats from "./Chats";
import { Box, Stack } from "@mui/material";
import Conversation from "../../components/conversation";

const GeneralApp = () => {
  return (
    <Stack direction={"row"} spacing={1} sx={{ width: "100%" }}>
      <Chats />
      <Box
        sx={{
          height: "100vh",
          width: "calc(100vw - 390px)",
          backgroundColor: "#fff",
        }}
      >
        {/* Conversation */}
        <Conversation/>
      </Box>
    </Stack>
  );
};

export default GeneralApp;
