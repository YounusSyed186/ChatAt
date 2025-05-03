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
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Logo from "../../assets/Images/logo.ico";
import { Nav_Buttons, Profile_Menu } from "../../data";
import { Gear } from "phosphor-react";
import { faker } from "@faker-js/faker";
import useSettings from "../../hooks/useSettings";

const Sidebar = () => {
    const theme = useTheme();
    const [selected, setSelected] = useState(0);
    const { onToggleMode } = useSettings();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const navigate = useNavigate()
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
                                        key={item.index}
                                        onClick={() => {
                                            setSelected(item.index);
                                            if (item.path) navigate(item.path);
                                        }}
                                        sx={{
                                            color: selected === item.index ? theme.palette.primary.contrastText : theme.palette.text.secondary,
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
                                        setSelected(3)
                                        nav("/setting")
                                    }}

                                    sx={{
                                        color:
                                            selected === 3
                                                ? "#fff"
                                                : theme.palette.text.primary,
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
                                    <MenuItem key={index} onClick={handleClose}>
                                        <Stack
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
