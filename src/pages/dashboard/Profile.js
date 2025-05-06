import React from 'react';
import {
    Box,
    Typography,
    TextField,
    Divider,
    Button,
    Avatar,
    Paper,
    IconButton,
    useTheme,
    useMediaQuery,
    CssBaseline
} from '@mui/material';
import { CaretLeft } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
    name: yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
    bio: yup.string().max(150, 'Bio must be at most 150 characters'),
});

const ProfileForm = () => {
    const theme = useTheme();
    const isDark = useMediaQuery('(prefers-color-scheme: dark)');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: 'Name',
            bio: 'Hey there, I am using ChatAt',
        },
        resolver: yupResolver(schema),
    });

    const [avatar, setAvatar] = React.useState('/Avatar.png');

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setAvatar(imageUrl);
        }
    };

    const onSubmit = (data) => {
        console.log({ ...data, avatar });
    };

    return (
        <>
            <CssBaseline />
            <Box
                sx={{
                    display: 'flex',
                    minHeight: '100vh',
                    bgcolor: theme.palette.background.default,
                }}
            >
                <Paper
                    elevation={isDark ? 1 : 4}
                    sx={{
                        width: 340,
                        maxWidth: 500,
                        p: 4,
                        bgcolor: theme.palette.background.paper,
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                        <IconButton sx={{ mr: 1 }}>
                            <CaretLeft size={20} />
                        </IconButton>
                        <Typography variant="h5" color="text.primary">
                            Profile
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 3 }}>
                        <Avatar
                            src={avatar}
                            alt="User Avatar"
                            sx={{
                                width: 100,
                                height: 100,
                                border: '3px solid',
                                borderColor: theme.palette.primary.main,
                                boxShadow: 3,
                            }}
                        />
                        <Box>
                            <input
                                accept="image/*"
                                type="file"
                                id="avatar-upload"
                                style={{ display: 'none' }}
                                onChange={handleAvatarChange}
                            />
                            <label htmlFor="avatar-upload">
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    component="span"
                                    size="small"
                                    sx={{ textTransform: 'none', fontWeight: 600 }}
                                >
                                    Upload Avatar
                                </Button>
                            </label>
                            <Typography variant="body2" sx={{ mt: 0.5 }} color="text.secondary">
                                PNG, JPG, max 2MB
                            </Typography>
                        </Box>
                    </Box>

                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
                    >
                        {/* Name */}
                        <Box>
                            <Typography variant="subtitle1" color="text.primary" gutterBottom>
                                Name
                            </Typography>
                            <TextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                {...register('name')}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />
                            <Typography variant="body2" sx={{ mt: 0.5 }} color="text.secondary">
                                This name is visible to your contacts
                            </Typography>
                        </Box>

                        <Divider sx={{ borderColor: theme.palette.divider }} />

                        {/* Bio */}
                        <Box>
                            <Typography variant="subtitle1" color="text.primary" gutterBottom>
                                Bio
                            </Typography>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                variant="outlined"
                                size="small"
                                {...register('bio')}
                                error={!!errors.bio}
                                helperText={errors.bio?.message}
                                placeholder="Tell something about yourself..."
                            />
                        </Box>

                        {/* Submit */}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{
                                py: 1.4,
                                fontSize: '1rem',
                                fontWeight: 600,
                                textTransform: 'none',
                                borderRadius: 2,
                                boxShadow: 'none',
                                '&:hover': {
                                    bgcolor: theme.palette.primary.dark,
                                    boxShadow: 'none',
                                },
                            }}
                        >
                            Save Changes
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </>
    );
};

export default ProfileForm;
