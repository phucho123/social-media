import User from "../models/UserModel.js";
import { compareHashString, createJWT, hashString } from "../utils/index.js";
import { sendVerifyEmail } from "../utils/sendEmail.js";

export const register = async (req, res) => {
    try {
        const existUser = await User.findOne({ email: req.body.email });
        if (existUser) {
            res.status(400).json("Email is already used");
        } else {
            req.body.password = await hashString(req.body.password);
            sendVerifyEmail(req.body);
            res.status(200).json("Please check your email to verify account");
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

export const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            res.status(400).json("User doesn't exist");
        } else {
            const checkPassword = await compareHashString(req.body.password, user.password);
            if (checkPassword) {
                const token = createJWT({ userId: user._id }, "30d");
                user.password = null;
                res.status(200).json({
                    token,
                    user
                });
            } else {
                res.status(400).json("Wrong password");
            }
        }

    } catch (err) {
        res.status(500).json(err);
    }
}

