import { Server } from "socket.io";
import { verifyToken } from "../utils/jwt.js";
import MessageModel from "../models/message.model.js";
import UserModel from "../models/user.model.js";

export const initSocket = (server) => {
  const io = new Server(server, {
    pingTimeout: 60000,
    pingInterval: 25000,
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  // JWT Authentication middleware
  io.use(async (socket, next) => {
    try {
      let token = socket.handshake.auth?.token;
      if (!token) token = socket.handshake.headers["authorization"];

      if (typeof token === "string" && token.startsWith("Bearer ")) {
        token = token.split(" ")[1];
      }

      const payload = verifyToken(token);

      const user = await UserModel.findById(payload.id).select("name role");
      if (!user) throw new Error("User not found");

      socket.data.user = {
        id: user._id.toString(),
        name: user.name,
        role: user.role,
      };

      next();
    } catch (err) {
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    const user = socket.data.user;
    console.log("User Connected:", user.name);

    // Join room
    socket.on("join", (room) => {
      socket.join(room);
      socket.to(room).emit("user_joined", { name: user.name, role: user.role });
    });

    // Send message
    socket.on("message", async ({ room, content }) => {
      try {
        const msg = await MessageModel.create({
          sender: user.id,
          room,
          content,
        });

        io.to(room).emit("message", {
          _id: msg._id,
          sender: { id: user.id, name: user.name, role: user.role },
          room,
          content: msg.content,
          createdAt: msg.createdAt,
        });

        const totalMessages = await MessageModel.countDocuments();
        io.emit("stats:update", { totalMessages });
      } catch (err) {
        console.error("Error saving message:", err);
      }
    });

    // Typing indicator
    socket.on("typing", (room) => {
      socket.to(room).emit("typing", { name: user.name });
    });

    socket.on("typing_stop", (room) => {
      socket.to(room).emit("typing_stop", { name: user.name });
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected:", user.name);
    });
  });

  return io;
};
