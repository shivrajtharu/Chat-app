import { createSocket } from "./socket";
import type { Socket } from "socket.io-client";

const socketCache = new Map<string, Socket>();

export function getSocket(token: string): Socket {
  if (!socketCache.has(token)) {
    socketCache.set(token, createSocket(token));
  }
  return socketCache.get(token)!;
}

export function resetSocket(token: string) {
  const s = socketCache.get(token);
  if (s) {
    s.disconnect();
    socketCache.delete(token);
  }
}
