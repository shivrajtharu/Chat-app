import express from "express";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import connectDB from "./src/config/connectDb.js";
import router from "./src/config/router.config.js";
import { initSocket } from "./src/socket/index.js";

dotenv.config();

const app = express();
//  Create HTTP server
const server = http.createServer(app);

// Middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

// Simple test route
app.get("/", (req, res) => {
  res.json({ message: "Server is running on port " + process.env.PORT });
});

// API routes
app.use("/api", router);

// Connect MongoDB
connectDB()
  .then(() => {
    // Initialize Socket.IO after DB is connected
    const io = initSocket(server);

    const PORT = process.env.PORT;
    server.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.log("MongoDB connection error:", err));
