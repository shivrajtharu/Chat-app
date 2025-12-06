import { useEffect, useMemo } from "react";
import SocketContext from "../context/SocketContext";
import { getSocket, resetSocket } from "../utils/socketManager";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  token: string;
}

export const SocketProvider = ({ children, token }: Props) => {
  const socket = useMemo(() => getSocket(token), [token]);

  useEffect(() => {
    return () => resetSocket(token);
  }, [token]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
