import chatModel from './../Models/chat.js';

const PostChat = async (req, res) => {
    try {
        const { question, answer, timestamp } = req.body;
        const userId = req.user._id;
        if (!userId) return res.status(404).json({ message: 'user.id not found in reuest', success: false })
        const newEntry = new chatModel({ userId, question, answer, timestamp })
        await newEntry.save();
        return res.status(200).json({ message: 'New chat added!!', success: true })
    } catch (error) {
        console.error("Error: ",error);
        return res.status(500).json({ message: 'internal server error', success: false, error });
    }
}

const GetChats = async (req, res) => {
    try {
        const userId = req.user._id;
        const chats = await chatModel.find({ userId }).sort({ timestamp: -1 });
        let selectedChats = [];
        const canLoadMore = chats.length > req.body.chatLength + 10;
        
        if (chats.length === req.body.chatLength) {
            return res.status(200).json({ message: 'No more chats in db', success: true });
        }
        else if (req.body.chatLength === 0) {
            selectedChats = chats.slice(-10);
            return res.status(200).json({ selectedChats, canLoadMore, message: 'Chat data fetched', success: true });
        }
        else if (chats.length >= req.body.chatLength + 10) {
            selectedChats = chats.slice(-(req.body.chatLength + 10), -(req.body.chatLength));
            return res.status(200).json({ selectedChats, canLoadMore, message: 'Chat data fetched', success: true });
        }
        else if (chats.length < req.body.chatLength + 10) {
            selectedChats = chats.slice(0, -(req.body.chatLength));
            return res.status(200).json({ selectedChats, canLoadMore, message: 'Chat data fetched but no more to fetch', success: true });
        }
        else {
            return res.status(200).json({ selectedChats, canLoadMore, message: 'Chats not found!! (no chat data in db)', success: true });
        }

    } catch (error) {
        console.error("Error: ",error);
        return res.status(500).json({ message: 'internal server error', success: false , error});
    }
    console.log("Chats fetched successfully");
}

export { PostChat, GetChats };