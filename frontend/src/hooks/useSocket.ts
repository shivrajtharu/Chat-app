import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";

export interface Message {
  _id?: string;
  sender: string;
  room: string;
  content: string;
  createdAt?: string;
  system?: boolean;
}

export const useChat = (room: string) => {
  const socket = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [totalMessages, setTotalMessages] = useState<number>(0);

  useEffect(() => {
    socket.emit("join", room);

    socket.on("message", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("typing", (data: { userId: string }) => {
      setTypingUsers((prev) => [...prev, data.userId]);
      setTimeout(() => {
        setTypingUsers((prev) => prev.filter((id) => id !== data.userId));
      }, 1000);
    });

    socket.on("stats:update", (stats: { totalMessages: number }) => {
      setTotalMessages(stats.totalMessages);
    });

    socket.on("user_joined", (data: { userId: string; room: string }) => {
      setMessages((prev) => [
        ...prev,
        {
          content: `${data.userId} joined`,
          system: true,
          sender: "System",
          room: data.room,
        },
      ]);
    });

    return () => {
      socket.off("message");
      socket.off("typing");
      socket.off("stats:update");
      socket.off("user_joined");
    };
  }, [room]);

  const sendMessage = (content: string) => {
    socket.emit("message", { room, content });
  };

  const sendTyping = () => {
    socket.emit("typing", room);
  };

  return { messages, sendMessage, sendTyping, typingUsers, totalMessages };
};
