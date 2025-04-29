import { Avatar, Box, Divider, IconButton, Stack, Switch, useTheme } from "@mui/material";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Logo from "../../assets/Images/logo.ico";
import { Nav_Buttons } from "../../data";
import { Gear } from "phosphor-react";
import { faker } from "@faker-js/faker";
import useSettings from "../../hooks/useSettings";

const DashboardLayout = () => {
  const theme = useTheme();
  const [selected, setSelected] = useState(0);
  const { onToggleMode } = useSettings();

  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100%" }}>
      {/* Sidebar */}
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          boxShadow: "0px 0px 2px rgba(0,0,0.25)",
          height: "100%",
          width: 90,
          paddingTop: 1,
          paddingBottom: 2,
        }}
      >
        <Stack
          direction={"column"}
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{ height: "100%" }}
          spacing={3}
        >
          <Stack alignItems={"center"} spacing={4} sx={{ height: "100%" }}>
            <Box
              sx={{
                backgroundColor: theme.palette.primary.main,
                height: 64,
                width: 64,
                borderRadius: 1.5,
              }}
            >
              <img src={Logo} alt={"chatAt Logo"} />
            </Box>

            <Stack sx={{ width: "max-content" }} alignItems={"center"} spacing={3}>
              {Nav_Buttons.map((items) =>
                items.index === selected ? (
                  <Box
                    key={items.index}
                    sx={{ backgroundColor: theme.palette.primary.main, borderRadius: 1.5 }}
                  >
                    <IconButton sx={{ width: "max-content", color: "white" }}>
                      {items.icon}
                    </IconButton>
                  </Box>
                ) : (
                  <IconButton
                    key={items.index}
                    onClick={() => {
                      setSelected(items.index);
                    }}
                    sx={{
                      width: "max-content",
                      color: theme.palette.mode === "light" ? "black" : theme.palette.text.primary,
                    }}
                  >
                    {items.icon}
                  </IconButton>
                )
              )}
              <Divider sx={{ width: "48px" }} />
              {selected === 3 ? (
                <Box sx={{ backgroundColor: theme.palette.primary.main, borderRadius: 1.5 }}>
                  <IconButton
                    sx={{
                      width: "max-content",
                      color: theme.palette.mode === "light" ? "black" : theme.palette.text.primary,
                    }}
                  >
                    <Gear />
                  </IconButton>
                </Box>
              ) : (
                <IconButton
                  onClick={() => {
                    setSelected(3);
                  }}
                >
                  <Gear />
                </IconButton>
              )}
            </Stack>
          </Stack>
          <Stack spacing={4} alignItems={"center"}>
            <Switch
              onChange={() => {
                onToggleMode();
              }}
              defaultChecked
            />
            <Avatar src={faker.image.avatar()} />
          </Stack>
        </Stack>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, overflow: "auto" }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;