import React, { useState } from "react";
import { Box, IconButton, TextField, Button, useTheme, Stack, Fab, Tooltip } from "@mui/material";
import { Smiley, PaperPlaneTilt, LinkSimple, Image, Sticker, Camera, File } from "phosphor-react";
import Picker from "@emoji-mart/react";

const Footer = ({ newMessage, setNewMessage, handleSendMessage }) => {
    const theme = useTheme();
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showActions, setShowActions] = useState(false);

    const handleEmojiSelect = (emoji) => {
        setNewMessage((prevMessage) => prevMessage + emoji.native); // Append selected emoji to the message
    };

    const toggleActions = () => {
        setShowActions((prev) => !prev);
    };

    const actions = [
        {
            color: theme.palette.primary.main, // Use theme primary color
            icon: <Image size={24} />,
            title: "Photo/Video",
        },
        {
            color: theme.palette.primary.main, // Use theme primary color
            icon: <Sticker size={24} />,
            title: "Sticker",
        },
        {
            color: theme.palette.primary.main, // Use theme primary color
            icon: <Camera size={24} />,
            title: "Camera",
        },
        {
            color: theme.palette.primary.main, // Use theme primary color
            icon: <File size={24} />,
            title: "File",
        },
    ];

    return (
        <Box
            sx={{
                padding: 1,
                borderTop: `1px solid ${theme.palette.divider}`, // Use theme divider color
                display: "flex",
                alignItems: "center",
                gap: 2,
                position: "relative", // For emoji picker and actions positioning
            }}
        >
            {/* Action Buttons */}
            <Stack sx={{ width: "max-content", position: "relative" }}>
                {showActions &&
                    actions.map((action, index) => (
                        <Tooltip key={index} title={action.title} placement="right">
                            <Fab
                                sx={{
                                    position: "absolute",
                                    top: -(index + 1) * 60, // Staggered positioning
                                    backgroundColor: action.color,
                                    color: theme.palette.getContrastText(action.color), // Ensure text/icon contrast
                                    zIndex: 10,
                                }}
                            >
                                {action.icon}
                            </Fab>
                        </Tooltip>
                    ))}
                <IconButton onClick={toggleActions} sx={{ color: theme.palette.text.secondary }}>
                    <LinkSimple />
                </IconButton>
            </Stack>

            {/* Emoji Picker */}
            {showEmojiPicker && (
                <Box
                    sx={{
                        position: "absolute",
                        bottom: "60px",
                        left: "10px",
                        zIndex: 10,
                    }}
                >
                    <Picker onEmojiSelect={handleEmojiSelect} theme={theme.palette.mode} />
                </Box>
            )}

            {/* Smiley Icon to Toggle Emoji Picker */}
            <IconButton
                sx={{ color: theme.palette.text.secondary }}
                onClick={() => setShowEmojiPicker((prev) => !prev)}
            >
                <Smiley />
            </IconButton>

            {/* Text Field for Message Input */}
            <TextField
                fullWidth
                variant="outlined"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") handleSendMessage();
                }}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        backgroundColor: theme.palette.background.paper, // Use theme paper background
                        color: theme.palette.text.primary, // Use theme text color
                    },
                }}
            />

            {/* Send Button */}
            <Button
                variant="contained"
                color="primary"
                onClick={handleSendMessage}
                startIcon={<PaperPlaneTilt size={32} />}
            >
                Send
            </Button>
        </Box>
    );
};

export default Footer;