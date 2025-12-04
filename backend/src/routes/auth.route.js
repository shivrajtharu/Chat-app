import { Router } from "express";
import authCtrl from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", authCtrl.register);
authRouter.post("/login", authCtrl.login);

export default authRouter;
