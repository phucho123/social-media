import express from "express";
import dotenv from "dotenv";
// import { User } from "./models/UserModel.js";
import MongoDB from "./database/MongoDB.js";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./routes/index.js";
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import { Server } from "socket.io";
import { createServer } from "http";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


dotenv.config()

const app = express();

app.use(helmet({
    crossOriginResourcePolicy: false,
}));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));


app.use(router);

app.use('/assets', express.static(__dirname + '/assets'));


const httpSever = createServer(app);
const io = new Server(httpSever, {
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST"]
    }
});


io.on("connection", (socket) => {
    console.log("user connected");
    socket.on("disconnect", () => {
        console.log(`user ${socket.id} disconnected`);
    });
    socket.on("send-message", (data) => {
        socket.broadcast.emit(`to ${data.to}`, {
            from: data.from,
            message: data.message,
            createdAt: data.createdAt
        })
        console.log(data);
    })
});

// app.listen(process.env.PORT || 8080, () => {
//     console.log("Sever is running");
// })
httpSever.listen(process.env.PORT || 8080, () => {
    console.log("Sever is running");
})


const db = MongoDB.getInstance();
db.connect();



