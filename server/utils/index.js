import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const hashString = async (s) => {
    const salt = await bcrypt.genSalt(10);
    const res = await bcrypt.hash(s, salt);

    return res;
}

export const compareHashString = async (s, hashString) => {
    const valid = await bcrypt.compare(s, hashString);

    return valid;
}

export const createJWT = (data, expiresIn) => {
    const res = jwt.sign(data, process.env.SECRET_KEY, {
        expiresIn
    });

    return res;
}