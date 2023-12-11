import express from "express";
import { getUser, verifyUserEmail } from "../controllers/userController.js";
import { userAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/verify/:token", verifyUserEmail);
router.get("/get-user", userAuth, getUser);

export default router;