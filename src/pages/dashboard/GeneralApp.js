import React from "react";
import { Box, Stack } from "@mui/material";
import Chats from "./Chats";
import Conversation from "../../components/conversation";
import Contact from "../../components/contacts";
import useStore from "../../zestand/store.js";

const GeneralApp = () => {
  // Directly accessing the `user` part of the state
  const user = useStore((state) => state.user); 
  const setOpen = useStore((state) => state.setOpen); 

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
        <Conversation />
      </Box>

      {user.open && <Contact />}
    </Stack>
  );
};

export default GeneralApp;
