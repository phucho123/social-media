import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
    cloud_name: 'dzgxwz6xj',
    api_key: '142999761741237',
    api_secret: 'LLvJbPGMthVpY-VRJ38GvMMSmq8'
});

export const verifyUserEmail = async (req, res) => {
    const token = req.params.token;
    try {
        const data = jwt.verify(token, process.env.SECRET_KEY);
        // res.json({ token: token, ...data });

        const existUser = await User.findOne({ email: data.email });

        if (existUser) {
            // res.json("Email is already used");
        } else {
            const newUser = new User({
                firstName: data.firstName,
                lastName: data.lastName,
                password: data.password,
                email: data.email
            })
            newUser.save();
        }
        res.render("file.ejs", {
            status: "success"
        });
    } catch (err) {
        res.render("file.ejs", {
            status: "failed"
        });
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId }).select("-password").populate({
            path: 'friendRequests friends',
            select: '-password firstName lastName profileUrl'
        });

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(400).json("Authentication Failed");
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

export const getUserById = async (req, res) => {
    try {

        const user = await User.findById(req.params.userId).select("-password").populate({
            path: 'friendRequests friends',
            select: '-password'
        });

        res.status(200).json(user);

        // if (user) {
        //     res.status(200).json(user);
        // } else {
        //     res.status(400).json("User doesn't exist");
        // }
    } catch (err) {
        res.status(500).json(err);
    }
}

export const changeAvatar = async (req, res) => {
    try {
        console.log(req.body.preAvatarUrl);
        if (req.body.preAvatarUrl) {
            console.log("delete image");
            const imageUrlArray = req.body.preAvatarUrl.split('/');
            const imageName = imageUrlArray[imageUrlArray.length - 1].split('.')[0];
            if (imageName) {
                cloudinary.uploader.destroy(imageName, (err, res) => {
                    console.log("deleted image");
                });
            }
        }

        const newUser = await User.findByIdAndUpdate(req.body.userId, {
            $set: {
                profileUrl: req.body.newAvatarUrl
            }
        }, { new: true }).populate({
            path: 'friendRequests friends',
            select: '-password firstName lastName profileUrl'
        }).select("-password");

        if (newUser) {
            console.log(newUser)
            res.status(200).json(newUser);
        } else {
            res.status(400).json("You can't change avatar");
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

export const sendFriendRequest = async (req, res) => {
    try {
        const toUser = await User.findByIdAndUpdate(req.body.to, {
            $push: {
                friendRequests: req.body.userId,
            }
        }, {
            new: true
        });

        const sendUser = await User.findByIdAndUpdate(req.body.userId, {
            $push: {
                friendRequestings: req.body.to,
            }
        }, {
            new: true
        }).populate({
            path: 'friendRequests friends',
            select: '-password firstName lastName profileUrl'
        }).select("-password");

        if (toUser && sendUser) {
            res.status(200).json(sendUser);
        } else {
            res.status(400).json("Send friend request Failed");
        }

    } catch (err) {
        res.status(500).json(err);
    }
}

export const deleteFriendRequest = async (req, res) => {
    try {
        const toUser = await User.findByIdAndUpdate(req.body.to, {
            $pull: {
                friendRequests: req.body.from,
            }
        }, {
            new: true
        }).populate({
            path: 'friendRequests friends',
            select: '-password firstName lastName profileUrl'
        }).select("-password");

        const sendUser = await User.findByIdAndUpdate(req.body.from, {
            $pull: {
                friendRequestings: req.body.to,
            }
        }, {
            new: true
        }).populate({
            path: 'friendRequests friends',
            select: '-password firstName lastName profileUrl'
        }).select("-password");

        if (toUser && sendUser) {
            if (req.body.userId == req.body.from) {
                res.status(200).json(sendUser);
            } else res.status(200).json(toUser);
        } else {
            res.status(400).json("Delete friend request Failed");
        }

    } catch (err) {
        res.status(500).json(err);
    }
}

export const acceptFriendRequest = async (req, res) => {
    try {
        const toUser = await User.findByIdAndUpdate(req.body.to, {
            $pull: {
                friendRequests: req.body.from,
            },
            $push: {
                friends: req.body.from
            }
        }, {
            new: true
        }).populate({
            path: 'friendRequests friends',
            select: '-password firstName lastName profileUrl'
        }).select("-password");

        const sendUser = await User.findByIdAndUpdate(req.body.from, {
            $pull: {
                friendRequestings: req.body.to,
            },
            $push: {
                friends: req.body.to
            }
        }, {
            new: true
        }).populate({
            path: 'friendRequests friends',
            select: '-password firstName lastName profileUrl'
        }).select("-password");

        if (toUser && sendUser) {
            if (req.body.userId == req.body.from) {
                res.status(200).json(sendUser);
            } else res.status(200).json(toUser);
        } else {
            res.status(400).json("Accept friend request Failed");
        }

    } catch (err) {
        res.status(500).json(err);
    }
}

export const searchUser = async (req, res) => {
    try {
        const searchUser = await User.find({
            $or: [
                { lastName: { $regex: req.body.keyword, $options: "i" } },
                { firstName: { $regex: req.body.keyword, $options: "i" } }
            ]

        });

        if (searchUser) {

            res.status(200).json(searchUser);

        } else {
            res.status(400).json("No user found");
        }

    } catch (err) {
        res.status(500).json(err);
    }
}