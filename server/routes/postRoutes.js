import express from "express";
import { createPost, deletePost, getPosts, likePost, unlikePost } from "../controllers/postController.js";
import { userAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", userAuth, createPost);
router.get("/get-posts", getPosts);
router.delete("/delete", userAuth, deletePost);
router.post("/like", userAuth, likePost);
router.post("/unlike", userAuth, unlikePost);

export default router;