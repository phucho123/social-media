import Post from "../models/PostModel.js";
import Comment from "../models/CommentModel.js"

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
        }).sort({ createdAt: -1 });

        res.status(200).json(post);
    } catch (err) {
        res.status(500).json("Get Posts Failed");
    }
}

// export const updatePost = async (req, res) => {
//     try {

//         const updatePost = await Post.findByIdAndUpdate(req.body.postId, {
//             $push: {
//                 likes: req.body.userId
//             }
//         }, {
//             new: true
//         })

//         if (updatePost) {

//             res.status(200).json(updatePost);
//         } else {
//             res.status(400).json("You can't update this post");
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

export const likePost = async (req, res) => {
    try {

        const likedPost = await Post.findByIdAndUpdate(req.body.postId, {
            $push: {
                likes: req.body.userId,
            },
        }, {
            new: true
        });

        if (likedPost) {
            res.status(200).json(likedPost);
        } else {
            res.status(400).json("You can't like this post");
        }

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}


export const unlikePost = async (req, res) => {
    try {

        const unlikedPost = await Post.findByIdAndUpdate(req.body.postId, {
            $pull: {
                likes: req.body.userId,
            },
        }, {
            new: true
        });

        if (unlikedPost) {
            res.status(200).json(unlikedPost);
        } else {
            res.status(400).json("You can't unlike this post");
        }

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

export const getComments = async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId });

        if (comments) {
            res.status(200).json(comments);
        } else {
            res.status(400).json("You can't get this post's comments");
        }

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

export const createComment = async (req, res) => {
    try {

        const comment = await Comment.create({
            from: req.body.from,
            postId: req.body.postId,
            userId: req.body.userId,
            comment: req.body.comment,
        });


        if (comment) {
            const post = await Post.findByIdAndUpdate(req.body.postId, {
                $push: {
                    comments: comment._id,
                },
            }, {
                new: true
            });
            if (post) res.status(200).json(comment);
            else res.status(400).json("You can't create comments");
        } else {
            res.status(400).json("You can't create comments");
        }

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}
