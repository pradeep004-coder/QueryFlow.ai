import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    question: { type: String, required: true},
    answer: { type: String, required: true},
    timestamp: {type: Date, default: Date.now, required: true}
});

chatSchema.index(
    { userId: 1, question: 1, answer: 1, timestamp: 1}, 
    {unique: true}
);

const chatModel = mongoose.model("chats", chatSchema);
export default chatModel;