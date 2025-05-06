import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Slide,
    IconButton,
    Typography,
    TextField,
    Stack,
    Avatar,
    Button,
    useTheme,
} from "@mui/material";
import { X } from "phosphor-react";

// Slide Transition
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

// Dummy Members List
const dummyMembers = [
    { id: 1, name: "Ali", avatar: "/avatar.png" },
    { id: 2, name: "osman", avatar: "/avatar.png" },
    { id: 3, name: "Younus", avatar: "/avatar.png" },
];

const CreateGroups = ({ open, handleClose }) => {
    const theme = useTheme();

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    backgroundColor: theme.palette.background.default,
                },
            }}
        >
            {/* Header */}
            <DialogTitle
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    pb: 0,
                }}
            >
                <Typography variant="h6" fontWeight={700}>
                    Create New Group
                </Typography>
                <IconButton onClick={handleClose}>
                    <X size={20} />
                </IconButton>
            </DialogTitle>

            {/* Content */}
            <DialogContent dividers>
                <Stack spacing={3}>
                    {/* Group Name */}
                    <TextField
                        fullWidth
                        label="Group Name"
                        variant="outlined"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                            },
                        }}
                    />

                    {/* Members */}
                    <Stack spacing={1}>
                        <Typography variant="subtitle2" color="text.secondary">
                            Members
                        </Typography>

                        <Stack direction="row" spacing={2}>
                            {dummyMembers.map((member) => (
                                <IconButton>

                                    <Stack
                                        key={member.id}
                                        alignItems="center"
                                        spacing={0.5}
                                    >
                                        <Avatar src={member.avatar} />
                                        <Typography variant="caption">{member.name}</Typography>
                                    </Stack>
                                </IconButton>
                            ))}
                        </Stack>
                    </Stack>
                </Stack>
            </DialogContent>

            {/* Actions */}
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button
                    onClick={handleClose}
                    variant="text"
                    color="inherit"
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        // TODO: Add create logic
                        handleClose();
                    }}
                >
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateGroups;
