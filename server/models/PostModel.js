import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        description: { type: String, required: true },
        imageUrl: { type: String, default: "" },
        likes: [{ type: String }],
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;