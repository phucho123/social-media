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
        const user = await User.findOne({ _id: req.body.userId }).select("-password");

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

        const user = await User.findById(req.params.userId).select("-password");

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
        }, { new: true }).select("-password");

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