// module routing level middleware

import { Router } from "express";
import { authMiddleware, authorizeRoles } from "../middlewares/auth.middleware.js";
import userCtrl from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", authMiddleware, authorizeRoles('admin'), userCtrl.getAllUsers);
userRouter.get("/:id", authMiddleware, userCtrl.getSingleUser);
userRouter.put("/update/:id", authMiddleware, userCtrl.updateUser);
userRouter.delete("/delete/:id", authMiddleware, userCtrl.deleteUser);

export default userRouter;
