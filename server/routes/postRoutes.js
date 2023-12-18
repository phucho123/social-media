import express from "express";
import { createComment, createPost, deletePost, getComments, getPosts, likePost, unlikePost } from "../controllers/postController.js";
import { userAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", userAuth, createPost);
router.get("/get-posts", getPosts);
router.delete("/delete", userAuth, deletePost);
router.post("/like", userAuth, likePost);
router.post("/unlike", userAuth, unlikePost);
router.get("/get-comments/:postId", getComments);
router.post("/create-comment", userAuth, createComment);

export default router;