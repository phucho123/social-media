import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
import dotenv from "dotenv";
dotenv.config();

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