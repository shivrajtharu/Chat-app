import { io } from "socket.io-client";

export const createSocket = (token: string) =>
  io("http://localhost:8000", {
    auth: { token },
    transports: ["websocket", "polling"],
  });
