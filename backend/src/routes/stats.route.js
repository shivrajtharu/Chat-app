import { Router } from "express";
import { authMiddleware, authorizeRoles } from "../middlewares/auth.middleware.js";
import statsCtrl from "../controllers/stats.controller.js";

const statsRouter = Router();

statsRouter.get("/chats/total", authMiddleware, statsCtrl.totalMessage);
statsRouter.get("/users/total", authMiddleware, authorizeRoles('admin'), statsCtrl.totalUsers);
statsRouter.get("/summary", authMiddleware, authorizeRoles('admin'), statsCtrl.summary)

export default statsRouter;
