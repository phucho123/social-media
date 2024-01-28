import Message from "../models/MessageModel.js";

export const sendMessage = async (req, res) => {
    try {
        const newMessage = await Message.create({
            from: req.body.userId,
            to: req.body.to,
            message: req.body.message,
        });

        if (newMessage) {
            res.status(200).json(newMessage);
        } else {
            res.status(400).json("You can't send message")
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

export const getMessages = async (req, res) => {
    try {
        const messages = await Message.find({
            $or: [
                { from: req.body.userId, to: req.params.friendId },
                { from: req.params.friendId, to: req.body.userId }
            ]
        })

        if (messages) {
            res.status(200).json(messages);
        } else {
            res.status(400).json("You can't get messages");
        }

    } catch (err) {
        res.status(500).json(err);
    }
}