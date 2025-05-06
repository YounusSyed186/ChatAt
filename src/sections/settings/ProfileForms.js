import React from 'react';
import { Box, Typography, Button, Avatar, useTheme } from '@mui/material';

const ProfileSidebar = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: 320,
        height: '100vh',
        bgcolor: theme.palette.background.paper,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
        boxSizing: 'border-box',
        borderRight: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
          Profile
        </Typography>
      </Box>

      <Avatar
        sx={{
          width: 100,
          height: 100,
          mb: 2,
          bgcolor: theme.palette.grey[300],
        }}
      />

      <Box
        sx={{
          width: '100%',
          border: `1px dashed ${theme.palette.primary.main}`,
          borderRadius: theme.shape.borderRadius,
          p: 1,
          mb: 1,
          textAlign: 'center',
        }}
      >
        <Typography variant="h6">Shreyansh shah</Typography>
      </Box>

      <Typography variant="caption" color="text.secondary" sx={{ mb: 2 }}>
        This name is visible to your contacts 320 ✕ 56
      </Typography>

      <Box
        sx={{
          width: '100%',
          border: `1px dashed ${theme.palette.primary.main}`,
          borderRadius: theme.shape.borderRadius,
          p: 1,
          mb: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="body2">
          Hey there, I am learning from coding monk
        </Typography>
      </Box>

      <Button
        variant="outlined"
        sx={{
          borderRadius: theme.shape.borderRadius,
          textTransform: 'none',
          width: '100px',
        }}
      >
        Save
      </Button>
    </Box>
  );
};

export default ProfileSidebar;