import axios from 'axios';
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
  IconButton,
  Snackbar,
  Alert,
  useTheme,
} from '@mui/material';
import {
  EnvelopeSimple,
  Lock,
  IdentificationCard,
  Eye,
  EyeSlash,
} from 'phosphor-react';
import { useNavigate } from 'react-router-dom';
import AuthSocial from '../../sections/auth/AuthSocial';
import { BASE_URL } from '../../config';

const Register = () => {
  const nav = useNavigate();
  const theme = useTheme();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'firstName') setFirstName(value);
    if (name === 'lastName') setLastName(value);
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'confirmPassword') setConfirmPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Basic validations
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return setSnackbar({
        open: true,
        message: 'Please fill in all the fields.',
        severity: 'warning',
      });
    }
  
    // Email format validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      return setSnackbar({
        open: true,
        message: 'Enter a valid email address.',
        severity: 'warning',
      });
    }
  
    // Password validation
    if (password.length < 6) {
      return setSnackbar({
        open: true,
        message: 'Password must be at least 6 characters long.',
        severity: 'warning',
      });
    }
  
    // Password match validation
    if (password !== confirmPassword) {
      return setSnackbar({
        open: true,
        message: 'Passwords do not match.',
        severity: 'error',
      });
    }
  
    setLoading(true);
  
    try {
      // Make the API call to register the user
      const response = await axios.post(
        `${BASE_URL}/api/register`,
        { firstName, lastName, email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      const otpMessage = response.data.data;
  
      // Save email and OTP before clearing inputs
      const userEmail = email;
  
      // Clear form fields
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
  
      // Show success message
      setSnackbar({
        open: true,
        message: 'Registration successful!',
        severity: 'success',
      });
  
      // Redirect after a short delay
      setTimeout(() => {
        nav('/auth/verify', { state: { email: userEmail, otpMessage } });
      }, 1000);
  
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Registration failed. Try again later.';
  
      // Handle specific "User already exists" error
      if (error.response?.data?.message === 'User already exists with this email.') {
        setSnackbar({
          open: true,
          message: 'This email is already registered. Please log in.',
          severity: 'warning',
        });
      } else {
        setSnackbar({
          open: true,
          message: errorMessage,
          severity: 'error',
        });
      }
    } finally {
      setLoading(false);
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

            <Box component="form" onSubmit={handleSubmit} width="100%">
              <Box display="flex" gap={2}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={firstName}
                  onChange={handleChange}
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
                  name="lastName"
                  value={lastName}
                  onChange={handleChange}
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
                name="email"
                value={email}
                onChange={handleChange}
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
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={password}
                onChange={handleChange}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock size={20} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                        {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock size={20} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowConfirmPassword((prev) => !prev)}>
                        {showConfirmPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, py: 1.5, fontWeight: 'bold' }}
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Register'}
              </Button>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{' '}
                <Button onClick={() => nav('/auth/login')}>Login</Button>
              </Typography>
            </Box>

            <AuthSocial />
          </Box>
        </Paper>

        {/* Snackbar for feedback */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbar.severity} variant="filled">
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Register;
