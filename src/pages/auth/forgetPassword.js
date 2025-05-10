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
import { EnvelopeSimple } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'; // Import yup for validation
import AuthSocial from '../../sections/auth/AuthSocial';

// Define your Yup validation schema
const forgetPasswordSchema = yup.object().shape({
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
});

const ForgetPassword = () => {
    const nav = useNavigate();
    const theme = useTheme();

    // Use react-hook-form with Yup resolver
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(forgetPasswordSchema), // Use Yup for validation
    });

    const [emailSent, setEmailSent] = useState(false);

    const onSubmit = (data) => {
        console.log('Request to reset password:', data);
        // Add your API logic here to send the reset link
        setEmailSent(true); // Show confirmation message after submitting
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
                            Forgot Password
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" mb={3}>
                            Enter your email to receive a reset link
                        </Typography>
                        {!emailSent ? (
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

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, py: 1.5, fontWeight: 'bold' }}
                                >
                                    Send Reset Link
                                </Button>
                            </Box>
                        ) : (
                            <Typography variant="body1" color="text.secondary" mt={2}>
                                If this email is associated with an account, you will receive a reset link shortly.
                            </Typography>
                        )}
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                                Remembered your password?{' '}
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

export default ForgetPassword;
