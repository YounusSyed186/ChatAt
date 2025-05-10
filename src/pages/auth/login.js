import React, { useState } from 'react';
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
import AuthSocial from '../../sections/auth/AuthSocial';
import { BASE_URL } from '../../config';
import axios from 'axios';
import authState from '../../zestand/authStates';

const Login = () => {
    const theme = useTheme();
    const nav = useNavigate();

    // ✅ Local state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Enter a valid email';

        if (!password) newErrors.password = 'Password is required';
        else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        console.log("BASE_URL is:", BASE_URL);
        const { setToken, setUser, setuserLoggedIn } = authState.getState();

        try {
            const response = await axios.post(`${BASE_URL}/api/login`, { email, password }, {
                headers: { 'Content-Type': 'application/json' },
            });

            const { token, user } = response.data.message;

            // Log the response data
            console.log("Response Data:", response.data);

            setToken(token);
            setUser(user);
            setuserLoggedIn(true);

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            console.log('Login success:', user);
            nav('/');
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Login failed. Please try again.';
            console.error('Login failed:', errorMessage);
            alert(errorMessage);
        }
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

                        <Box component="form" onSubmit={handleLogin} width="100%">
                            {/* Email Field */}
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={!!errors.email}
                                helperText={errors.email}
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                error={!!errors.password}
                                helperText={errors.password}
                                margin="normal"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Lock size={20} />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <Box sx={{ textAlign: 'end' }}>
                                <Button onClick={() => nav('/auth/ForgetPassword')} color="primary">
                                    Forgot password?
                                </Button>
                            </Box>

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
