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
import { ArrowLeft } from "phosphor-react"; // Adjust the path as needed
import useStore from "../zestand/store";
import { t } from "i18next";
import { faker } from "@faker-js/faker";
import { Shared_Docs, Shared_links } from "../data";
import { DocMsg, LinkMsg } from "./conversation/textMessage";



const SharedMessages = () => {
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
          Shared Messages
        </Typography>
      </Box>

      {/* Tabs */}
      <Tabs value={tabIndex} onChange={handleTabChange} variant="fullWidth">
        {tabNames.map((tab, index) => (
          <Tab label={tab} key={index} />
        ))}
      </Tabs>
      <Divider />

      {/* Tab Content */}
      <Box sx={{ p: 2 }}>
        {(() => {
          switch (tabIndex) {
            case 0:
              return (
                <Grid container spacing={2}>
                  {[0, 1, 2, 3, 4].map((el) => (
                    <Grid item xs={6} key={el}>
                      <img
                        src={faker.image.avatar()}
                        alt={faker.name.fullName()}
                        style={{ width: "100%", borderRadius: 8 }}
                      />
                    </Grid>
                  ))}
                </Grid>
              );
            case 1:
              return (
                Shared_links.map((el) => {
                  <LinkMsg el={el} key={el.id} />;
                })
              );
              case 2:
                return (
                  <>
                    {Shared_Docs.map((el) => (
                      <DocMsg  el={el} withWrapper={false} key={el.id} />
                    ))}
                  </>
                );
            default:
              return null;
          }
        })()}
      </Box>
    </Box>
  );
};

export default SharedMessages;
