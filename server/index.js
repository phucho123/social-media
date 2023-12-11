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


app.listen(process.env.PORT || 8080, () => {
    console.log("Sever is running");
})


const db = MongoDB.getInstance();
db.connect();
