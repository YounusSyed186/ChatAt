import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography, Paper } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../config';

const VerifyOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, otpMessage } = location.state || {}; // ✅ Correct destructuring

  const otpUser = otpMessage?.split(" ").pop(); // Extracts the OTP number
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!otp) return alert("Please enter the OTP");
  
    setLoading(true);
  
    try {
      const response = await axios.post(`${BASE_URL}/api/verify`, {
        email,
        otp:otp.trim(), // Use the user-entered OTP here
      }, {
        headers: { 'Content-Type': 'application/json' },
      });
  
      console.log('OTP Verification Response:', response.data);
  
      alert("Verification successful!");
      navigate('/auth/login');
    } catch (error) {
      const errorMsg = error?.response?.data?.message || 'Invalid OTP. Try again.';
      console.error("OTP Verification Error:", errorMsg);
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };
  
  
  return (
    <Box minHeight="100vh" display="flex" justifyContent="center" alignItems="center">
      <Container maxWidth="sm">
        <Paper sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h5" mb={2}>
            Verify OTP
          </Typography>
          <Typography variant="body1" mb={2}>
            We sent an OTP to <strong>{email}</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            (Your OTP is <strong onClick={()=> setOtp()}>{otpUser}</strong>)
          </Typography>

          <TextField
            label="Enter OTP"
            fullWidth
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            margin="normal"
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleVerify}
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify'}
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default VerifyOTP;
