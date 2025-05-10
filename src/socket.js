// socket.js
import { io } from "socket.io-client";

let socket = null;

const connectSocket = (user_id) => {
  socket = io("http://localhost:4000", {
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
