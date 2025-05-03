import React, { useState } from "react";
import {
  Box,
  Tab,
  Tabs,
  Typography,
  IconButton,
  useTheme,
  Divider,
  Grid,
} from "@mui/material";
import { ArrowLeft, Binoculars } from "phosphor-react"; // Adjust the path as needed
import useStore from "../zestand/store";
import MessageArea from "./conversation/messageArea";



const StarredMessages = () => {
  const theme = useTheme();
  const { setType } = useStore();

  const [tabIndex, setTabIndex] = useState(0);
  const tabNames = ["Media", "Links", "Docs"];

  const handleTabChange = (event, newValue) => setTabIndex(newValue);

  return (
    <Box
      sx={{
        width: 350,
        height: "100vh",
        backgroundColor: theme.palette.background.paper,
        borderLeft: `1px solid ${theme.palette.divider}`,
        overflowY: "auto",
        padding: 2,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 1,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <IconButton onClick={() => setType("CONTACT")} size="small">
          <ArrowLeft size={24} />
        </IconButton>
        <Typography variant="subtitle1" sx={{ ml: 1, fontWeight: "bold" }}>
          Starred Messages
        </Typography>
      </Box>
      <Box>
        <MessageArea withWrapper={false} />
      </Box>

      
    </Box>
  );
};

export default StarredMessages;
