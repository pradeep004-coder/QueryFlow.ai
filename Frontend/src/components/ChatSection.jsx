import { useState , useContext } from "react";
import { ClipLoader } from "react-spinners";
import Question from "./Question";
import Answers from './Answers';
import { Collapsible } from "./Collapsible";
import { ChatContext } from "../app/context/context";
import { parseResponse } from "../utils/Helper";


function ChatSection({ scrollContainerRef, chat, setChat, questionRefs }) {

    const [loading, setLoading] = useState(false);
    const {isLoggedIn, canLoadMore, setCanLoadMore, isAnsLoading} = useContext(ChatContext);

    const handleLoadMore = (e) => {
        if (e.target.scrollTop === 0 && isLoggedIn && canLoadMore && !loading) {
            const token = localStorage.getItem("token");
            setLoading(true);
            fetch("https://queryflowai-backend.onrender.com/getchats", {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                body: JSON.stringify({ chatLength: chat.length })
            })
                .then(response => response.json())
                .then(data => {
                    if (!data.selectedChats || !data.selectedChats.length) return;
                    setChat(prev => [...data.selectedChats, ...prev]);
                    setCanLoadMore(data.canLoadMore)
                })
                .catch(err => console.error("unable to load chats: ", err))
                .finally(() => setLoading(false));
        }
    };


    return (
        <div
            ref={scrollContainerRef}
            onScroll={handleLoadMore}
            className={`h-[75vh] w-full lg:container mx-auto flex flex-col p-3 overflow-auto text-zinc-300 scroll-invisible`}
        >
        <ClipLoader
        color="grey"
        loading={loading}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
            {chat.map((chatItem, i) => (
                <div
                    key={i}
                    className="mb-5"
                    ref={(el) => (questionRefs.current[i] = el)}
                >
                    <Question
                        question={chatItem.question}
                        timestamp={chatItem.timestamp}
                    />
                    <Collapsible>
                        <ul className="my-2">
                            {!chatItem.answer && isAnsLoading ?
                                <div className="text-zinc-400 animate-dots">
                                    Answering
                                    <span className="dot-1">.</span>
                                    <span className="dot-2">.</span>
                                    <span className="dot-3">.</span>
                                </div>
                                : chatItem.answer && parseResponse(chatItem.answer).map((item, index) => {
                                    return <li key={index}>
                                        <Answers
                                            ansType={item.type}
                                            ans={item.content}
                                            language={item.type.trim() == 'code' ? item.language : ''}
                                        />
                                    </li>
                                })}
                        </ul>
                    </Collapsible>
                    <hr />
                </div>
            ))}
        </div>
    )
}

export default ChatSection;