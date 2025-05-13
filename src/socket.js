// socket.js
import { io } from "socket.io-client";
import { BASE_URL } from "./config";

let socket = null;

const connectSocket = (user_id) => {
  socket = io(`${BASE_URL}`, {
    query: { user_id },
  });
};

const getSocket = () => {
  if (!socket) {
    throw new Error("Socket not connected. Call connectSocket(user_id) first.");
  }
  return socket;
};

export { connectSocket, getSocket };
