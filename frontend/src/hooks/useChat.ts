import { useEffect, useState, useRef } from "react";
import { useSocket } from "../context/SocketContext";
import type { Message, Sender } from "../types/chat.types";

export const useChat = (room: string, currentUser: string) => {
  const socket = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [totalMessages, setTotalMessages] = useState<number>(0);

  const typingTimeouts = useRef<Record<string, number>>({});

  useEffect(() => {
    const timeouts = typingTimeouts.current;
    socket.emit("join", room);

    // Receive message
    socket.on("message", (msg: Message & { sender: string | Sender }) => {
      setMessages((prev) => [
        ...prev,
        {
          ...msg,
          sender:
            typeof msg.sender === "string"
              ? msg.sender
              : {
                  id: msg.sender.id,
                  name: msg.sender.name,
                  role: msg.sender.role,
                },
        },
      ]);
    });

    // User joined
    socket.on("user_joined", (data: { name: string }) => {
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

    // Typing
    socket.on("typing", (data: { name: string }) => {
      if (data.name === currentUser) return;
      setTypingUsers((prev) =>
        prev.includes(data.name) ? prev : [...prev, data.name]
      );

      if (typingTimeouts.current[data.name])
        clearTimeout(typingTimeouts.current[data.name]);

      typingTimeouts.current[data.name] = window.setTimeout(() => {
        setTypingUsers((prev) => prev.filter((u) => u !== data.name));
        delete typingTimeouts.current[data.name];
      }, 1500);
    });

    // Stats update
    socket.on("stats:update", (data: { totalMessages: number }) =>
      setTotalMessages(data.totalMessages)
    );

    return () => {
      socket.off("message");
      socket.off("user_joined");
      socket.off("typing");
      socket.off("stats:update");
      Object.values(timeouts).forEach(clearTimeout);
    };
  }, [room, socket, currentUser]);

  const sendMessage = (content: string) => {
    socket.emit("message", { room, content });
  };

  const sendTyping = () => {
    socket.emit("typing", { room, name: currentUser });
  };

  return { messages, sendMessage, sendTyping, typingUsers, totalMessages };
};
