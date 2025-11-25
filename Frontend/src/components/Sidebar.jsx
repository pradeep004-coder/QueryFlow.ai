import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../app/context/context";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ClipLoader } from "react-spinners";
import ConfirmLogout from "./ConfirmLogout";

function Sidebar({ denySidebar, elementsRef }) {

  const [isOpening, setIsOpening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const context = useContext(ChatContext);
  const router = useRouter();

  useEffect(() => {
    setIsOpening(true);
  }, [])

  const handleCloseSidebar = () => {
    setIsOpening(false);
    setTimeout(() => {
      denySidebar();
    }, 100);
  }

  const handleLoadMore = () => {

    if (!context.isLoggedIn && !context.canLoadMore) return;

    if (context.isLoggedIn && context.canLoadMore && !loading) {
      setLoading(true);
      const token = localStorage.getItem("token");
      fetch("https://queryflowai-backend.onrender.com/getchats", {
      // fetch("http://localhost:8333/getchats", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ chatLength: context.chat.length })
      })
        .then(response => response.json())
        .then(data => {
          if (!data.selectedChats || !data.selectedChats.length) return;
          context.setChat(prev => [...data.selectedChats, ...prev]);
          context.setCanLoadMore(data.canLoadMore)
        })
        .catch(err => console.error("unable to load chats: ", err))
        .finally(() => setLoading(false))
    }
  };

  const handleLoggout = () => {
    setShowConfirm(true)
  }

  return (
    <div
      className="bg-black/50 z-20 h-full w-full fixed left-0 top-0 "
      onClick={handleCloseSidebar}
    >
      <div className={`bg-zinc-800 opacity-100 h-full p-3
                        w-[80%] lg:w-[30%] 
                        shadow-lg
                        flex flex-col
                        transition-all ease-in-out duration-300 transform ${isOpening ? 'translate-x-0' : '-translate-x-full'}
                        z-10`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex justify-end'>
          <button
            type='button'
            className='text-zinc-300 hover:text-white text-lg font-bold select-none'
            onClick={handleCloseSidebar}
          >✕</button>
        </div>

        <div className='border-b border-white text-center select-none cursor-pointer'>Recent</div>

        <div className="flex-grow overflow-y-auto scrollbar">
          {[...context.chat].reverse().map((item, index) => (
            <div
              key={index}
              className={
                `flex-shrink-0
                  w-full
                  p-1
                  hover:bg-zinc-700
                  select-none cursor-pointer
                  truncate
                  overflow-x-hidden text-ellipsis whitespace-nowrap
                  transition-all duration-300 ${context.isAnsLoading && !item.answer ? 'fade-text' : null}`
              }
              onClick={
                () => {
                  elementsRef.current[context.chat.length - index - 1]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }
            >
              {item.question}
            </div>
          ))}
          {context.isLoggedIn && context.canLoadMore && context.chat.length &&
            <div className="flex justify-center">
              <button
                className="bg-zinc-900 text-sm rounded-lg shadow-lg px-2 py-1"
                onClick={handleLoadMore}
              >
                {loading ? <ClipLoader
                  color="grey"
                  loading={loading}
                  size={12}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
                  : "Load More"}
              </button>
            </div>}
        </div>
        <div className="mt-auto pt-2">
          {context.isLoggedIn ?
            <button type="button" onClick={handleLoggout} className="text-sm bg-red-600 hover:bg-red-500 mx-auto flex gap-3 w-fit px-2 py-1 rounded-md transition-colors duration-200">
              <span>Logout</span>
              <Image
                src="/logout.png"
                alt="logout"
                width={20}
                height={20}
              />
            </button>
            : <button type="button" onClick={() => router.push("/login")} className="self-end bg-zinc-700 hover:bg-zinc-600 mt-auto mx-auto flex gap-3 w-fit px-4 py-2 rounded-md transition-colors duration-200">
              <span>Login</span>
              <Image
                src="/login.png"
                alt="login"
                width={20}
                height={20}
              />
            </button>}
        </div>
      </div>
      {showConfirm && <ConfirmLogout setShow={setShowConfirm} />}
    </div>
  )
}

export default Sidebar;