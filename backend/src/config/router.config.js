// global routing level middleware

import { Router } from "express";
import userRouter from "../routes/user.route.js";
import authRouter from "../routes/auth.route.js";
import statsRouter from "../routes/stats.route.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/stats", statsRouter);

export default router;
