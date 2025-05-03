import React from 'react';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Avatar,
    Paper,
    InputAdornment,
    useTheme,
} from '@mui/material';
import {
    EnvelopeSimple,
    Lock,
    IdentificationCard,
} from 'phosphor-react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import AuthSocial from '../../sections/auth/AuthSocial';

const Register = () => {
    const nav = useNavigate();
    const theme = useTheme();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log('Registering:', data);
        // Add your API logic here
    };

    return (
        <Box
            minHeight="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgcolor={theme.palette.background.default}
        >
            <Container maxWidth="sm">
                <Paper
                    elevation={4}
                    sx={{
                        p: 4,
                        borderRadius: 3,
                        backgroundColor: theme.palette.background.paper,
                    }}
                >
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Avatar
                            sx={{
                                bgcolor: theme.palette.primary.main,
                                width: 64,
                                height: 64,
                                mb: 2,
                            }}
                        >
                            <img src="/favicon.ico" alt="logo" />
                        </Avatar>
                        <Typography variant="h4" gutterBottom fontWeight={600}>
                            Join ChatAt
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" mb={3}>
                            Create your account
                        </Typography>

                        <Box component="form" onSubmit={handleSubmit(onSubmit)} width="100%">
                            <Box display="flex" gap={2}>
                                <TextField
                                    fullWidth
                                    label="First Name"
                                    {...register('firstName', { required: 'First name is required' })}
                                    error={!!errors.firstName}
                                    helperText={errors.firstName?.message}
                                    margin="normal"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <IdentificationCard size={20} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    label="Last Name"
                                    {...register('lastName', { required: 'Last name is required' })}
                                    error={!!errors.lastName}
                                    helperText={errors.lastName?.message}
                                    margin="normal"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <IdentificationCard size={20} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>

                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: 'Invalid email format',
                                    },
                                })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                margin="normal"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EnvelopeSimple size={20} />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be at least 6 characters',
                                    },
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                margin="normal"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Lock size={20} />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, py: 1.5, fontWeight: 'bold' }}
                            >
                                Register
                            </Button>
                        </Box>

                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                                Already have an account?{' '}
                                <Button onClick={() => nav('/auth/login')}>
                                    Login
                                </Button>
                            </Typography>
                        </Box>

                        <AuthSocial />
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default Register;
