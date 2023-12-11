import express from "express";
import authRouter from "./authRoutes.js";
import userRouter from "./userRoutes.js";
import postRouter from "./postRoutes.js";

const router = express.Router();

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/posts", postRouter);

export default router;