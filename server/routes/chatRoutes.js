import express from "express";
import { getMessages, sendMessage } from "../controllers/chatController.js";
import { userAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/send", userAuth, sendMessage);
router.get("/get/:friendId", userAuth, getMessages);

export default router;