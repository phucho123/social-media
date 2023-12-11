import express from "express";
import { createPost, deletePost, getPosts } from "../controllers/postController.js";
import { userAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", userAuth, createPost);
router.get("/get-posts", getPosts);
router.delete("/delete", userAuth, deletePost);

export default router;