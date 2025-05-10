import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Switch,
  useTheme,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import Logo from "../../assets/Images/logo.ico";
import { Nav_Buttons, Profile_Menu } from "../../data";
import { Gear } from "phosphor-react";
import useSettings from "../../hooks/useSettings";
import authState from "../../zestand/authStates";

const Sidebar = () => {
  const theme = useTheme();
  const [selected, setSelected] = useState(0);
  const { onToggleMode } = useSettings();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const {setLogout, clear} =authState.getState()

  const navigate = useNavigate();
  const location = useLocation(); // Get current location

  useEffect(() => {
    // Sync the selected state with the current route
    const currentPath = location.pathname;

    // Check if the path matches one of your nav buttons' paths
    Nav_Buttons.forEach((item, index) => {
      if (currentPath.includes(item.path)) {
        setSelected(index);
      }
    });

    // If you're on the settings page, set selected to 3 (Settings button)
    if (currentPath.includes("/Setting")) {
      setSelected(3);
    }
  }, [location.pathname]); // Update on route change

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const getMenuPath = (index) => {
    switch (index) {
      case 0:
        return "/Profile";
      case 1:
        return "/setting";
      case 2:
        //todo => Update token set is auth to false
        return "auth/login";
    }
  };
  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100%", gap: 1 }}>
      {/* Sidebar */}
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
          height: "100%",
          width: 70,
          py: 2,
        }}
      >
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="space-between"
          sx={{ height: "100%" }}
          spacing={3}
        >
          <Stack alignItems="center" spacing={4} sx={{ height: "100%" }}>
            <Box
              sx={{
                backgroundColor: theme.palette.primary.main,
                height: 54,
                width: 54,
                borderRadius: 1.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img src={Logo} alt="chatAt Logo" width={32} height={32} />
            </Box>

            <Stack spacing={3} alignItems="center">
              {Nav_Buttons.map((item) => (
                <Box
                  key={item.index}
                  sx={{
                    backgroundColor:
                      selected === item.index
                        ? theme.palette.primary.main
                        : "transparent",
                    borderRadius: 1.5,
                  }}
                >
                  <IconButton
                    onClick={() => {
                      setSelected(item.index);
                      if (item.path) navigate(item.path);
                    }}
                    sx={{
                      color:
                        selected === item.index
                          ? theme.palette.primary.contrastText
                          : theme.palette.text.secondary,
                    }}
                  >
                    {item.icon}
                  </IconButton>
                </Box>
              ))}

              <Divider sx={{ width: 48 }} />

              <Box
                sx={{
                  backgroundColor:
                    selected === 3 ? theme.palette.primary.main : "transparent",
                  borderRadius: 1.5,
                }}
              >
                <IconButton
                  onClick={() => {
                    setSelected(3);
                    navigate("/Setting");
                  }}
                  sx={{
                    color: selected === 3 ? "#fff" : theme.palette.text.primary,
                  }}
                >
                  <Gear />
                </IconButton>
              </Box>
            </Stack>
          </Stack>

          <Stack spacing={2} alignItems="center">
            <Switch onChange={onToggleMode} defaultChecked />
            <Avatar
              src={"/avatar.png"}
              onClick={handleClick}
              sx={{ cursor: "pointer" }}
            />
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "bottom", horizontal: "left" }}
              sx={{
                "& .MuiPaper-root": {
                  borderRadius: 2,
                  boxShadow: theme.shadows[4],
                },
              }}
            >
              <Stack spacing={1} px={1}>
                {Profile_Menu.map((el, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => {
                      handleClick();
                    }}
                  >
                    <Stack
                      onClick={() =>{
                        if (index ===2) {
                            setLogout(true)
                            clear()
                          }
                        navigate(getMenuPath(index))
                        }}
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      spacing={2}
                      sx={{ width: 120 }}
                    >
                      <span>{el.title}</span>
                      {el.icon}
                    </Stack>
                  </MenuItem>
                ))}
              </Stack>
            </Menu>
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

export default Sidebar;
