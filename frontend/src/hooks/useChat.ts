import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";
import type { Message } from "../types/chat.types";

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

    socket.on("user_joined", (data: { name: string; role?: string }) => {
      setMessages((prev) => [
        ...prev,
        {
          content: `${data.name} joined`,
          sender: "System",
          room,
          system: true,
        },
      ]);
    });

    socket.on("typing", (data: { name: string }) => {
      setTypingUsers((prev) => [...prev, data.name]);
      setTimeout(() => {
        setTypingUsers((prev) => prev.filter((name) => name !== data.name));
      }, 1000);
    });

    socket.on("stats:update", (data: { totalMessages: number }) =>
      setTotalMessages(data.totalMessages)
    );

    return () => {
      socket.off("message");
      socket.off("user_joined");
      socket.off("typing");
      socket.off("stats:update");
    };
  }, [room, socket]);

  const sendMessage = (content: string) => {
    socket.emit("message", { room, content });
  };

  const sendTyping = () => {
    socket.emit("typing", room);
  };

  return { messages, sendMessage, sendTyping, typingUsers, totalMessages };
};
