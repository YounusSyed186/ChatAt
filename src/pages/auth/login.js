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
import { Lock, EnvelopeSimple } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'; // Import yup for validation
import AuthSocial from '../../sections/auth/AuthSocial';

// Define your Yup validation schema
const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
});

const Login = () => {
    const nav = useNavigate();
    const theme = useTheme();

    // Use react-hook-form with Yup resolver
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema), // Use Yup for validation
    });

    const onSubmit = (data) => {
        console.log('Logging in:', data);
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
                        p: 5,
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
                            Welcome to ChatAt
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" mb={3}>
                            Sign in to continue chatting
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit(onSubmit)} width="100%">
                            {/* Email Field */}
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                {...register('email')}
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

                            {/* Password Field */}
                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                {...register('password')}
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

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, py: 1.5, fontWeight: 'bold' }}
                            >
                                Login
                            </Button>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                                Don&apos;t have an account?{' '}
                                <Button onClick={() => nav('/auth/register')}>
                                    Sign Up
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

export default Login;
