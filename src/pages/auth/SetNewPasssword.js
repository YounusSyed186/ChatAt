import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  IconButton,
  InputAdornment,
  Snackbar,
} from "@mui/material";
import { Eye, EyeSlash } from "phosphor-react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BASE_URL } from "../../config";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("code");
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setResponseMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.password || !formData.confirmPassword) {
      setError("Both fields are required.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    if (!token) {
      setError("Reset token is missing.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/resetpassword`, {
        token,
        password: formData.password,
      });

      if (response.data.success) {
        setResponseMsg("Password has been reset successfully.");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        setTimeout(() => nav("/auth/login"), 2000); // Redirect after 2 sec
      } else {
        setError(response.data.message || "Failed to reset password.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || "Server error. Try again.";
      setError(errMsg);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Reset Your Password
        </Typography>

        <form onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            label="New Password"
            name="password"
            type={showPassword ? "text" : "password"}
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            margin="normal"
            value={formData.confirmPassword}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeSlash size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ mt: 2 }}
          >
            Reset Password
          </Button>
        </form>
      </Box>

      {/* Snackbar for messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarSeverity === "error" ? error : responseMsg}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ResetPassword;
