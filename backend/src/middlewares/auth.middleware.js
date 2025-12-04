import { verifyToken } from "../utils/jwt.js";
import User from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer "))
    return res.status(401).json({ message: "Unauthorized" });

  const token = header.split(" ")[1];

  try {
    const payload = verifyToken(token);
    const user = await User.findById(payload.id).select("-password");

    if (!user)
      return res.status(401).json({
        message: "Invalid token",
      });

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user)
      return res.status(401).json({
        message: "Unauthorized",
      });

    if (!roles.includes(req.user.role))
      return res.status(403).json({
        message: "Forbidden",
      });
    next();
  };
};
