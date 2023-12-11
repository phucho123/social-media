import mongoose from "mongoose";

class MongoDB {
    static instance = null;

    static getInstance() {
        if (!MongoDB.instance) {
            MongoDB.instance = new MongoDB();
        }
        return MongoDB.instance;
    }

    constructor() {
        if (MongoDB.instance)
            return MongoDB.instance;
        MongoDB.instance = this;
    }

    async connect() {
        mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
            .then(() => {
                console.log("Connected successfully to MongoDB server");
            })
            .catch((err) => {
                console.error("Failed to connect with MongoDB server: ", err);
            });
    }

    async close() {
        await mongoose.connection.close();
        console.log("Connection to MongoDB server have been closed");
    }
}

export default MongoDB;