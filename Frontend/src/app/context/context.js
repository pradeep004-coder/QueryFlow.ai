'use client'
import react, { useState, createContext } from "react";

const ChatContext = createContext();


const ChatProvider = ({ children }) => {
    const [chat, setChat] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [canLoadMore, setCanLoadMore] = useState(true);
    const [isAnsLoading, setIsAnsLoading] = useState(false);
    const [ userData, setUserData] = useState({});

    return <ChatContext.Provider value={{ chat, setChat, isLoggedIn, setIsLoggedIn, canLoadMore, setCanLoadMore, isAnsLoading, setIsAnsLoading, userData, setUserData }}>
        {children}
    </ChatContext.Provider>
}

export  { ChatProvider, ChatContext };