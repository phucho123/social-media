import express from "express";
import { acceptFriendRequest, changeAvatar, deleteFriendRequest, getUser, getUserById, searchUser, sendFriendRequest, verifyUserEmail } from "../controllers/userController.js";
import { userAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/verify/:token", verifyUserEmail);
router.get("/get-user", userAuth, getUser);
router.get("/get-by-id/:userId", getUserById);
router.post("/change-avatar", userAuth, changeAvatar);
router.post("/send-friend-request", userAuth, sendFriendRequest);
router.post("/delete-friend-request", userAuth, deleteFriendRequest);
router.post("/accept-friend-request", userAuth, acceptFriendRequest);
router.post("/search-user", searchUser);

export default router;