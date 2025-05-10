import React, { useState } from "react";
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
  Snackbar,
  Alert,
} from "@mui/material";
import { Lock, EnvelopeSimple, Eye, EyeSlash } from "phosphor-react";
import { Navigate, useNavigate } from "react-router-dom";
import AuthSocial from "../../sections/auth/AuthSocial";
import { BASE_URL } from "../../config";
import axios from "axios";
import authState from "../../zestand/authStates";

const Login = () => {
  const theme = useTheme();
  const nav = useNavigate();

  const { userLoggedIn } = authState.getState();
  if (userLoggedIn) {
    return <Navigate to="/app" />;
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Enter a valid email";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;
  
    const { setToken, setUser, setuserLoggedIn } = authState.getState();
  
    try {
      const response = await axios.post(
        `${BASE_URL}/api/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
  
      const { token, user } = response.data.message;
      const userId = user._id;
  
      // Save token and user info
      setToken(token);
      setUser(user);
      setuserLoggedIn(true);
  
      // Store user ID in localStorage
      window.localStorage.setItem("user_id", userId);
  
      nav("/app");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Login failed. Please try again.";
  
      setSnackbarMessage(
        typeof errorMessage === "string" ? errorMessage : "Login failed"
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
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

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
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
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button onClick={() => setShowPassword((prev) => !prev)}>
                        {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />

              <Box sx={{ textAlign: "end" }}>
                <Button
                  onClick={() => nav("/auth/ForgetPassword")}
                  color="primary"
                >
                  Forgot password?
                </Button>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, py: 1.5, fontWeight: "bold" }}
              >
                Login
              </Button>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Don&apos;t have an account?{" "}
                <Button onClick={() => nav("/auth/register")}>Sign Up</Button>
              </Typography>
            </Box>
            <AuthSocial />
          </Box>
        </Paper>
      </Container>

      {/* Snackbar for displaying login error */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
