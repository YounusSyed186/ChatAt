import axios from "axios";
import useUserStore, { getAuthHeaders, handleRequestError } from "./chatStates";
import { BASE_URL } from "../../config";

// ✅ Fetch Users with enhanced debugging
export const FetchUsers = async () => {
  const setUsers = useUserStore.getState().setUsers;

  try {
    const headers = getAuthHeaders();
    console.log("Fetching users with headers:", headers); // Debug headers

    const response = await axios.get(`${BASE_URL}/api/users/find-users`, { headers });

    // Check the structure of the response
    console.log("Response data:", response); // Debugging the entire response
    if (response && response.data && response.data.data && response.data.data.remaining_users) {
      console.log("OnlineUsers:", response.data.data.remaining_users); // Debugging the specific users
      setUsers(response.data.data.remaining_users); // Update state with fetched users
    } else {
      console.error("Unexpected response structure:", response);
    }
  } catch (error) {
    console.error("Error while fetching users:", error); // Log full error
    handleRequestError("fetching users", error); // Handle the error
  }
};
