import { useState } from "react";
import SocketContext from "../context/SocketContext";
import { createSocket } from "../utils/socket";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  token: string;
}

export const SocketProvider = ({ children, token }: Props) => {
  const [socket] = useState(() => createSocket(token));

  if (!socket) return <div>Loading chat...</div>;

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
