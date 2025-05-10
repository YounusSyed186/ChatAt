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
    const [loading, setLoading] = useState(true); // Track loading state
    const [error, setError] = useState(null); // Track error state
    
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          if (users.length === 0) {
            setLoading(true);
            await FetchUsers(); // Fetch only if users are empty
          }
        } catch (err) {
          setError("Failed to load users.");
          console.error("Error fetching users:", err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchUsers();
    }, [users.length]); // Dependencies only on users length
  
    return (
      <div>
        <h2>Explore Users</h2>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height={100}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box display="flex" justifyContent="center" alignItems="center" height={100}>
            <Typography color="error">{error}</Typography>
          </Box>
        ) : users.length > 0 ? (
          <List>
            {users.map((el,user) => (
              <>
              <UserComponent key={el._id} {...el}/>
              </>
            ))}
          </List>
        ) : (
          <Typography>No users available.</Typography>
        )}
      </div>
    );
  };
  
  const FriendsList = () => {
    const friendRequests = useUserStore((state) => state.friendRequests); // Renamed for clarity
    const [loading, setLoading] = useState(true); // Track loading state
    const [error, setError] = useState(null); // Track error state
  
    useEffect(() => {
        const fetchUsers = async () => {
          setLoading(true);
          try {
            await FetchUsers(); // Always fetch on mount
          } catch (err) {
            setError("Failed to load users.");
            console.error("Error fetching users:", err);
          } finally {
            setLoading(false);
          }
        };
      
        fetchUsers();
      }, []); // Empty dependency array to run only once on mount
       // Dependency on the length of friendRequests
  
    return (
      <div>
        <h2>Explore Friends</h2>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height={100}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box display="flex" justifyContent="center" alignItems="center" height={100}>
            <Typography color="error">{error}</Typography>
          </Box>
        ) : friendRequests.length > 0 ? (
          <List>
            {friendRequests.map((el,idx) => (
              <>
               <FriendsComponets key={el.key} {...el.sender}/>
              </>
            ))}
          </List>
        ) : (
          <Typography>No friend requests available.</Typography>
        )}
      </div>
    );
  };
  
  const FriendRequestsList = () => {
    const friendRequests = useUserStore((state) => state.friendRequests); // Renamed for clarity
    const [loading, setLoading] = useState(true); // Track loading state
    const [error, setError] = useState(null); // Track error state
  
    useEffect(() => {
      const fetchFriendRequests = async () => {
        try {
          if (friendRequests.length === 0) {
            setLoading(true);
            await FetchFriendRequest(); // Fetch friend requests if none exist
          }
        } catch (err) {
          setError("Failed to load friend requests.");
          console.error("Error fetching friend requests:", err);
        } finally {
          setLoading(false); // Set loading to false after fetch completes
        }
      };
  
      fetchFriendRequests(); // Direct async call in useEffect
    }, [friendRequests.length]); // Dependencies on the length of friendRequests
  
    return (
      <div>
        <h2>Explore Requests</h2>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height={100}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box display="flex" justifyContent="center" alignItems="center" height={100}>
            <Typography color="error">{error}</Typography>
          </Box>
        ) : friendRequests.length > 0 ? (
          <List>
            {friendRequests.map((el,idx) => (
              <>
             <FriendRequestComponent  key={el._id} {...el.sender} id={el._id}/>
              </>
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
