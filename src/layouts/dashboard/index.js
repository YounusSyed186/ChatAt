import React, { useEffect, useState } from 'react';
import Sidebar from './SideBar';
import { Navigate } from 'react-router-dom';
import authState from '../../zestand/authStates';
import { connectSocket, getSocket } from '../../socket';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import useConversationStore from '../../zestand/chats';

const DashboardLayout = () => {
  const userLoggedIn = authState((state) => state.userLoggedIn);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');
  const conversations = useConversationStore((state) => state.direct_chat.conversations);
  const updateDirectConversation = useConversationStore((state) => state.updateDirectConversation);
  const addDirectConversation = useConversationStore((state) => state.addDirectConversation);
  const setConversation = authState((state) => state.setConversation);


  useEffect(() => {
    if (!userLoggedIn) return;

    const user_id = window.localStorage.getItem("user_id");
    console.log(user_id)

    // Reload page once to ensure clean socket connection
    if (!window.location.hash) {
      window.location.href = window.location.href + "#loaded";
      return;
    }

    connectSocket(user_id);
    const socket = getSocket();

    const handleNewFriendRequest = () => {
      setSnackbarMessage("New friend request received!");
      setSnackbarSeverity("info");
      setSnackbarOpen(true);
    };

    const handleRequestAccepted = () => {
      setSnackbarMessage("Your friend request was accepted!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    };

    const handleRequestSent = () => {
      setSnackbarMessage("Friend request sent successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    };
    const handleStartChat = (data) => {
      console.log(data)
      const existing_conversation = conversations.find((el) => el.id === data._id)
      if (existing_conversation) {
        //already have this conversation 
        updateDirectConversation({ conversations: data })
      } else {
        addDirectConversation({ conversations: data })
      }
      setConversation({ room_id: data._id })
    }

    socket.on("new_friend_request", handleNewFriendRequest);
    socket.on("request_accepted", handleRequestAccepted);
    socket.on("request_send", handleRequestSent);
    socket.on("start_chat",)

    return () => {
      socket?.off("new_friend_request", handleNewFriendRequest);
      socket?.off("request_accepted", handleRequestAccepted);
      socket?.off("request_send", handleRequestSent);
      socket?.off("requsstart_chat")
    };
  }, [userLoggedIn]);

  const handleCloseSnackbar = (_, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  if (!userLoggedIn) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <>
      <Sidebar />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={snackbarSeverity} onClose={handleCloseSnackbar} variant="filled">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default DashboardLayout;