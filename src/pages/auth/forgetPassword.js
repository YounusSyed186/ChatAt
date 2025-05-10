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
  CircularProgress,
} from "@mui/material";
import { EnvelopeSimple } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import AuthSocial from "../../sections/auth/AuthSocial";
import axios from "axios";
import { BASE_URL } from "../../config";

const ForgetPassword = () => {
  const nav = useNavigate();
  const theme = useTheme();

  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError(""); // Clear error on change
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    // Reset error and loading
    setError("");
    setLoading(true);

    // Validate email
    if (!email) {
      setError("Email is required");
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError("Enter a valid email");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/api/forgot-password`,
        { email },
        { headers: { "Content-Type": "application/json" } }
      );

      const ResetToken=response.data.data;
      console.log(ResetToken)
      setEmailSent(true);
      nav(`/auth/New-Password/?code=${ResetToken}`)
    } catch (err) {
      const serverError =
        err.response?.data?.message ||
        "The User with this email doesnt exist. Please try again.";
      setError(serverError);
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
              <Box component="form" onSubmit={onSubmit} width="100%">
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  error={!!error}
                  helperText={error}
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EnvelopeSimple size={20} />
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  sx={{ mt: 3, py: 1.5, fontWeight: "bold" }}
                  startIcon={loading ? <CircularProgress size={20} /> : null}
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </Button>
              </Box>
            ) : (
              <Typography variant="body1" color="text.secondary" mt={2}>
                If this email is associated with an account, you will receive a
                reset link shortly.
              </Typography>
            )}

            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Remembered your password?{" "}
                <Button onClick={() => nav("/auth/login")}>Login</Button>
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
