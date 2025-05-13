import axios from "axios";
import useUserStore, { getAuthHeaders, handleRequestError } from "./chatStates";
import { BASE_URL } from "../../config";

// ✅ Fetch friends and directly return the data
export const FetchFriends = async () => {
    const setFriends = useUserStore.getState().setFriends;
  
    try {
      const headers = getAuthHeaders();
      const response = await axios.get(`${BASE_URL}/api/get-Friends`, { headers });
      console.log("Friends:", response.data);
      setFriends(response.data.data.friends);
    } catch (error) {
      handleRequestError("fetching users", error);
    }
  };
