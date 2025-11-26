import { useState, useContext, useEffect, useRef } from "react";
import { ClipLoader } from "react-spinners";
import Question from "./Question";
import Answers from './Answers';
import { Collapsible } from "./Collapsible";
import { ChatContext } from "../app/context/context";
import { parseResponse } from "../utils/Helper";
import Image from "next/image";
import { toast } from "react-toastify";
import DateBadge from "./DateBadge";
import { Backend_API } from "../constants/constants";


function ChatSection({ elementsRef }) {

    const { chat, setChat, isLoggedIn, canLoadMore, setCanLoadMore, isAnsLoading } = useContext(ChatContext);
    const [loading, setLoading] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [daySeparators, setDaySeparators] = useState([]);
    const [visibleDate, setVisibleDate] = useState("");
    const [isDateVisible, setIsDateVisible] = useState(false);
    const scrollTimeoutRef = useRef(null);
    const chatContainerRef = useRef();

    const millisInDay = 24 * 60 * 60 * 1000;

    const toDayStamp = (millis) => {
        return Math.floor(millis / millisInDay);
    }

    const toDateString = (millis) => {
        const date = new Date(millis);
        const currentDate = new Date();
        const startOfDay = new Date().setHours(0, 0, 0, 0);
        // const dayGap = Math.floor((currentDate - date) / millisInDay);
        const currentYear = currentDate.getFullYear();
        const year = date.getFullYear();

        if (millis >= startOfDay) return "Today";
        if (millis >= startOfDay - millisInDay) return "Yesterday";

        return date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: year !== currentYear ? "numeric" : undefined
        })
    }

    useEffect(() => {
        if (!chatContainerRef.current) return;
        if (!elementsRef.current || elementsRef.current.length === 0) return;

        const observer = new IntersectionObserver((items) => {
            const visible = items.filter(item => item.isIntersecting)
                .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

            if (visible.length > 0) {
                const topEntry = visible[0];
                const index = Number(topEntry.target.dataset.index);
                const targetItem = chat[index];
                setVisibleDate(toDateString(targetItem?.timestamp));
            }
        },
            {
                root: chatContainerRef.current,
                threshold: 0
            }
        );

        elementsRef.current.forEach(element => {
            if (element) observer.observe(element);
        });
        return () => observer.disconnect()

    }, [chat]);

    useEffect(() => {
        const indices = [];
        for (let i = 0; i < chat.length; i++) {
            const curr = toDayStamp(new Date(chat[i].timestamp).getTime());
            const prev = i > 0 ? toDayStamp(new Date(chat[i - 1].timestamp).getTime()) : null;
            if (i === 0 || curr !== prev) indices.push(i);
        }

        setDaySeparators(indices);
    }, [chat, toDayStamp(Date.now())]);

    const handleLoadMore = () => {
        if (isLoggedIn && canLoadMore && !loading) {
            const token = localStorage.getItem("token");
            setLoading(true);
            fetch(`${Backend_API}/getchats`, {
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

    const handleCopy = async (text) => {
        if (isAnsLoading) return toast.warning("Please wait for the answer to load to copy it!!");
        try {
            await navigator.clipboard.writeText(text);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 3000);
        } catch (err) {
            toast.error("Oops! failed to copy!!")
            console.error('Failed to copy:', err);
        }
    };


    const handleShowDateBadge = () => {
        setIsDateVisible(true);
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => {
            setIsDateVisible(false);
        }, 5000);
    };

    const handleScroll = (e) => {
        const atTop = e.target.scrollTop <= 10;
        const atBottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;

        if (atTop) {
            setIsDateVisible(false);
        }
        else handleShowDateBadge();
    }



    return (
        <div className="w-full z-0">
            <DateBadge visibleDate={visibleDate} isDateVisible={isDateVisible} />
            <div
                className={`h-[75vh] max-w-full lg:container mx-auto flex flex-col p-3 overflow-y-auto overflow-x-hidden text-zinc-300 scrollbar`}
                ref={chatContainerRef}
                onScroll={handleScroll}
            >
                <div className="flex justify-center">
                    {isLoggedIn && canLoadMore && chat.length && <button
                        className="bg-zinc-900 rounded-xl shadow-lg px-2 py-1"
                        onClick={handleLoadMore}
                    >
                        {loading ? <ClipLoader
                            color="grey"
                            loading={loading}
                            size={16}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                            : "Load More"}
                    </button>}
                </div>
                {chat.map((chatItem, i) => (
                    <div
                        key={i}
                        data-index={i}
                        className="mb-5"
                        ref={(el) => (elementsRef.current[i] = el)}
                    >
                        {
                            daySeparators.includes(i) && <div className="mx-auto w-fit max-w-full px-2 bg-zinc-700 rounded-lg">
                                {toDateString(chatItem.timestamp)}
                            </div>
                        }
                        <Question
                            question={chatItem.question}
                            timestamp={chatItem.timestamp}
                        />{(i !== chat.length - 1 && !chatItem.answer) || (i === chat.length - 1 && !isAnsLoading && !chatItem.answer) ?
                            <div className="pl-4 text-red-400">Something went wrong!!</div>
                            : <Collapsible>
                                <ul className="max-w-full mt-2">
                                    {!chatItem.answer && isAnsLoading ?
                                        i === chat.length - 1 && <div className="text-zinc-400 animate-dots">
                                            Answering
                                            <span className="dot-1">.</span>
                                            <span className="dot-2">.</span>
                                            <span className="dot-3">.</span>
                                        </div>
                                        : chatItem?.answer && parseResponse(chatItem.answer).map((item, index) => (
                                            <li key={index}>
                                                <Answers
                                                    ansType={item.type}
                                                    ans={item.content}
                                                    language={item.type.trim() === 'code' ? item.language : ''}
                                                />
                                            </li>
                                        ))
                                    }
                                </ul>
                            </Collapsible>}
                        <div>
                            {!isAnsLoading && chatItem.answer && <button type="button" className="invert p-2" onClick={() => handleCopy(chatItem.answer)}>
                                <Image
                                    src={isCopied ? "/copied.png" : "/copy.png"}
                                    alt={isCopied ? "done" : "copy"}
                                    width={16}
                                    height={16}
                                />
                            </button>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ChatSection;