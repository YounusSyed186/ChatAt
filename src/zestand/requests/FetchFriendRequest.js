import axios from "axios";
import useUserStore, { getAuthHeaders, handleRequestError } from "./chatStates";
import { BASE_URL } from "../../config";

// ✅ Fetch incoming friend requests
export const FetchFriendRequest = async () => {
  const setFriendRequests = useUserStore.getState().setFriendRequests;

  try {
    const headers = getAuthHeaders();
    const response = await axios.get(`${BASE_URL}/api/get-Request`, { headers });

    console.log("🔔 Friend Requests Response:", response.data);

    const { data } = response;
    setFriendRequests(data.data.requests); // ✅ Set only the requests array
  } catch (error) {
    handleRequestError("fetching friend requests", error);
  }
};