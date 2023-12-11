import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const userAuth = (req, res, next) => {
    const authHeader = req?.headers?.authorization;

    if (!authHeader || !authHeader?.startsWith("Bearer")) {
        next("Authentication==failed");
    } else {
        const token = authHeader?.split(" ")[1];

        try {
            const { userId } = jwt.verify(token, process.env.SECRET_KEY);
            req.body.userId = userId;
            next();
        } catch {
            res.status(500).json("Wrong token");
        }
    }


}