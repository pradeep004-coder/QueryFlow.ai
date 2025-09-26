import joi from 'joi';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

const PostChatMiddleware = (req, res, next) => {
    const schema = joi.object({
        question: joi.string().min(1).required(),
        answer: joi.string().min(1).required(),
        timestamp: joi.date().required()
    })
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided" });
        }
        const token = authHeader.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_Secret);
        req.user = decodedToken;
    } catch (error) {
        console.error("Error: ", error);
        return res.status(401).json({ message: 'Could not get user info!!', success: false, error });
    }
    const { error } = schema.validate(req.body);
    if (error) {
        console.error("Error: ", error);
        return res.status(400).json({ message: 'incorrect request!!', success: false, error });
    }
    next();
}

const GetChatsMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"
        const decoded = jwt.verify(token, process.env.JWT_Secret);
        req.user = decoded;
        const schema = joi.object({
            chatLength: joi.number().required()
        });
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: "Invalid request!!", success: false, error });
        }
    } catch (error) {
        console.error("Error: ", error);
        return res.status(401).json({ message: 'Could not get user info!!', success: false, error });
    }
    next();
}

export { PostChatMiddleware, GetChatsMiddleware };