import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: [true, "Password is Required!"],
        minlength: [6, "Password length should be greater than 6 character"],
        select: true,
    },
    location: { type: String },
    profileUrl: { type: String },
    profession: { type: String },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    views: [{ type: String }],
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);

export default User;