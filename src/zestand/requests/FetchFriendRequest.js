import axios from "axios";
import useUserStore, { getAuthHeaders, handleRequestError } from "./chatStates";
import { BASE_URL } from "../../config";

// ✅ Fetch friend requests
export const FetchFriendRequest = async () => {
    const setFriendRequests = useUserStore.getState().setFriendRequests;
  
    try {
      const headers = getAuthHeaders();
      const response = await axios.get(`${BASE_URL}/api/users/get-Request`, { headers });
      console.log("Requests:", response.data);
      setFriendRequests(response.data.data.requests); // ✅ not just response.data.data
    } catch (error) {
      handleRequestError("fetching users", error);
    }
  };

  