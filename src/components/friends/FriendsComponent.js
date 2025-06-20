import {
    Avatar,
    Badge,
    Button,
    styled,
    Stack,
    Typography,
    Box,
    useTheme,
    IconButton
  } from '@mui/material';
  import { getSocket  } from '../../socket.js';
  import React from 'react';
import { Chat } from 'phosphor-react';
  
  const StyledChatBox = styled(Box)(({ theme }) => ({
    width: '100%',
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    transition: 'background-color 0.2s ease',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: theme.palette.action.hover,
    },
  }));
  
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));
  
  const FriendsComponets = ({ firstName, lastName, _id, online, img }) => {
    const theme = useTheme();
    const name = `${firstName} ${lastName}`;
    const user_id = localStorage.getItem('user_id');

    const handleSendRequest = () => {
      try {
        const socket = getSocket();
        socket.emit("start_conversation", { to: _id, from: user_id }, () => {
          alert("Send Message");
        });
      } catch (err) {
        console.error(err.message);
      }
    };
    
    return (
      <StyledChatBox>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={2}>
            {online ? (
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
              >
                <Avatar alt={name} src={img} />
              </StyledBadge>
            ) : (
              <Avatar alt={name} src={img} />
            )}
            <Box>
              <Typography variant="subtitle1" fontWeight={600}>
                {name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {online ? 'Online' : 'Offline'}
              </Typography>
            </Box>
          </Stack>
  
          <IconButton
            variant="contained"
            size="small"
            color="primary"
            onClick={handleSendRequest}
            sx={{ textTransform: 'none', fontWeight: 500 }}
          >
            <Chat />
          </IconButton>
        </Stack>
      </StyledChatBox>
    );
  };
  
export default FriendsComponets;
  