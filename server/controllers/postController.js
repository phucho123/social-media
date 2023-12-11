import Post from "../models/PostModel.js";

export const createPost = async (req, res) => {
    try {

        const newPost = await Post.create({
            userId: req.body.userId,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
        });

        const posts = await Post.find().populate({
            path: "userId",
            select: "firstName lastName profileUrl -password",
        });

        res.status(200).json(posts);

    } catch (err) {
        res.status(500).json(err);
    }
}

export const getPosts = async (req, res) => {
    try {
        const post = await Post.find().populate({
            path: "userId",
            select: "firstName lastName profileUrl -password",
        });

        res.status(200).json(post);
    } catch (err) {
        res.status(500).json("Get Posts Failed");
    }
}

// export const updatePost = async (req,res) =>{
//     try {

//         const deletePost = await Post.findOne({
//             userId: req.body.userId,
//             _id: req.body.postId,
//         });


//         if (deletePost) {
//             await Post.findByIdAndDelete(req.body.postId);

//             res.status(200).json("Update post successfully");
//         } else {
//             res.status(400).json("You can't delete this post");
//         }

//     } catch (err) {
//         res.status(500).json("Delete Post Failed");
//     }
// }

export const deletePost = async (req, res) => {
    try {

        const deletePost = await Post.findOne({
            userId: req.body.userId,
            _id: req.body.postId,
        });


        if (deletePost) {
            await Post.findByIdAndDelete(req.body.postId);

            res.status(200).json("Delete post successfully");
        } else {
            res.status(400).json("You can't delete this post");
        }

    } catch (err) {
        res.status(500).json("Delete Post Failed");
    }
}

