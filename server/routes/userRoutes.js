import express from "express";
import { changeAvatar, getUser, getUserById, verifyUserEmail } from "../controllers/userController.js";
import { userAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/verify/:token", verifyUserEmail);
router.get("/get-user", userAuth, getUser);
router.get("/get-by-id/:userId", getUserById);
router.post("/change-avatar", userAuth, changeAvatar);

export default router;