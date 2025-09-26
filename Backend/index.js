//index.js
import express from 'express';
import cors from "cors" //to allow server access from different ports
import dotenv from "dotenv";
dotenv.config(); 
import AuthRouter from "./Routes/AuthRouter.js"
import ChatRouter from './Routes/ChatRouter.js';
import connectDB from './Models/db.js'
const app = express();
const Port = process.env.PORT;

connectDB();

app.use(express.json()); // replaces body-parser.json()
app.use(express.urlencoded({ extended: true })); // replaces body-parser.urlencoded()
app.use(cors({
  origin: "https://queryflow-ochre.vercel.app/",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true // if you're sending cookies/JWT in headers
}));
app.use('/', AuthRouter);
app.use('/', ChatRouter);

app.listen(Port);