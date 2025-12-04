import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "secret_key";

export const signToken = (
  payload,
  expiresIn = process.env.JWT_EXPIRES_IN || "7d"
) => {
  return jwt.sign(payload, SECRET, { expiresIn });
};

export const verifyToken = (token) => {
  if (!token) throw new Error("Token missing");
  return jwt.verify(token, SECRET);
};
  