import { Dialog, DialogContent, Stack, Tab, Tabs, List, ListItem, ListItemText, CircularProgress, Box, Typography } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import useUserStore from '../../zestand/requests/chatStates';
import { FetchFriends } from '../../zestand/requests/FetchFriends';
import { FetchFriendRequest } from '../../zestand/requests/FetchFriendRequest';
import { FetchUsers } from '../../zestand/requests/fetchUsers';
import UserComponent from '../../components/friends/UserCompenet';
import FriendRequestComponent from '../../components/friends/FriendRequestComponent';
import FriendsComponets from '../../components/friends/FriendsComponent';

// Users List Tab
const UsersList = () => {
  const users = useUserStore((state) => state.users);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        await FetchUsers();
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Explore Users</h2>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height={100}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : users.length > 0 ? (
        <List>
          {users.map((el) => (
            <UserComponent key={el._id} {...el} />
          ))}
        </List>
      ) : (
        <Typography>No users available.</Typography>
      )}
    </div>
  );
};

const FriendsList = () => {
  const friends = useUserStore((state) => state.friends); // Should be friends, not friendRequests
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFriends = async () => {
      setLoading(true);
      try {
        await FetchFriends();
      } catch (err) {
        console.error("Error fetching friends:", err);
        setError("Failed to load friends.");
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  return (
    <div>
      <h2>Explore Friends</h2>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height={100}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : friends.length > 0 ? (
        <List>
          {friends.map((el) => (
            <FriendsComponets key={el._id} {...el} />
          ))}
        </List>
      ) : (
        <Typography>No friends available.</Typography>
      )}
    </div>
  );
};

  
 const FriendRequestsList = () => {
  const friendRequests = useUserStore((state) => state.friendRequests);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFriendRequest = async () => {
      setLoading(true);
      try {
        await FetchFriendRequest();
      } catch (err) {
        console.error("Error fetching friend requests:", err);
        setError("Failed to load friend requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchFriendRequest();
  }, []);

  return (
    <div>
      <h2>Explore Requests</h2>
      {console.log("Hi how are YOu")}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height={100}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : friendRequests.length > 0 ? (
        <List>
          {friendRequests.map((el) => (
            <FriendRequestComponent key={el._id} {...el.sender} sender={el.sender._id} id={el._id} el={el} />
          ))}
        </List>
      ) : (
        <Typography>No friend requests available.</Typography>
      )}
    </div>
  );
};



// Requests Tab


// Main Dialog Component
const Friends = ({ open, handleclose }) => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Dialog fullWidth maxWidth="xs" open={open} onClose={handleclose}>
            <Stack p={2} sx={{ width: '100%' }}>
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab label="Explore" />
                    <Tab label="Friends" />
                    <Tab label="Requests" />
                </Tabs>
            </Stack>
            <DialogContent sx={{ p: 2 }}>
                <Stack spacing={2.5}>
                    {(() => {
                        switch (value) {
                            case 0:
                                return <UsersList />;
                            case 1:
                                return <FriendsList />;
                            case 2:
                                return <FriendRequestsList />;
                            default:
                                return null;
                        }
                    })()}
                </Stack>
            </DialogContent>
        </Dialog>
    );
};

export default Friends;
