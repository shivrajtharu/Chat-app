import { useEffect, useState, type ReactNode } from "react";
import SocketContext from "../context/SocketContext";
import { createSocket } from "../utils/socket";
import { Socket } from "socket.io-client";

interface Props {
  children: ReactNode;
  token: string;
}

export const SocketProvider = ({ children, token }: Props) => {
  const [socket] = useState<Socket>(() => createSocket(token));

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
