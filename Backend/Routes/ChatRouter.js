import { Router } from "express";
import {PostChat, GetChats} from "../Controllers/ChatController.js";
import { GetChatsMiddleware, PostChatMiddleware } from "../Middlewares/ChatMiddleware.js";

const ChatRouter = Router();

ChatRouter.post("/postchat", PostChatMiddleware, PostChat);
ChatRouter.post('/getchats', GetChatsMiddleware, GetChats);

export default ChatRouter;