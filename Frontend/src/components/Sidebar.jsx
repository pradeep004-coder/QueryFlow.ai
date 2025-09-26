import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../app/context/context";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ClipLoader } from "react-spinners";
import ConfirmLogout from "./ConfirmLogout";

function Sidebar({ denySidebar, chat, questionRefs, }) {

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
    }, 300);
  }

  const handleLoadMore = (e) => {

    if (!context.isLoggedIn && !context.canLoadMore) return;
    const { scrollTop, scrollHeight, clientHeight } = e.target;

    if ((scrollTop === scrollHeight - clientHeight) && context.isLoggedIn && context.canLoadMore && !loading) {
      setLoading(true);
      const token = localStorage.getItem("token");
      fetch("https://queryflowai-backend.onrender.com/getchats", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ chatLength: chat.length })
      })
        .then(response => response.json())
        .then(data => {
          if (!data.selectedChats || !data.selectedChats.length) return;
          setChat(prev => [...data.selectedChats, ...prev]);
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
      className="bg-black/50 h-full w-full fixed left-0 top-0 "
      onClick={handleCloseSidebar}
    >
      <div className={`bg-zinc-800 h-full p-3
                        w-[80%] md:w-[30%] 
                        shadow-lg z-50
                        flex flex-col
                        transition-all ease-in-out duration-300 transform ${isOpening ? 'translate-x-0' : '-translate-x-full'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex justify-end'>
          <button
            type='button'
            className='text-zinc-300 hover:text-white text-lg font-bold select-none'
            onClick={handleCloseSidebar}
          >✕</button>
        </div>
        <div className='flex-grow text-center select-none cursor-pointer'>Recent
          <hr />
          <div onScroll={handleLoadMore} className='flex flex-col text-left my-2'>
            {[...chat].map((item, index) => (
              <div
                key={index}
                className={
                  `w-full
                    gap-1
                    select-none cursor-pointer
                    truncate
                    overflow-hidden text-ellipsis whitespace-nowrap
                    transition-colors duration-700 ${context.isAnsLoading && !item.answer ? 'fade-text' : null}`
                }
                onClick={
                  () => {
                    questionRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }
              >
                {item.question}
              </div>
            ))}
            <ClipLoader
              color="gray"
              loading={loading}
              size={30}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </div>
        {context.isLoggedIn === true ?
          <button type="button" onClick={handleLoggout} className="bg-red-600 hover:bg-red-500 mx-auto flex gap-3 w-fit px-4 py-2 rounded-md transition-colors duration-200">
            <span>Logout</span>
            <Image
              src="/logout.png"
              alt="logout"
              width={20}
              height={20}
            />
          </button>
          : <button type="button" onClick={() => router.push("/login")} className="bg-zinc-700 hover:bg-zinc-600 mx-auto flex gap-3 w-fit px-4 py-2 rounded-md transition-colors duration-200">
            <span>Login</span>
            <Image
              src="/login.png"
              alt="login"
              width={20}
              height={20}
            />
          </button>}
      </div>
      {showConfirm && <ConfirmLogout setShow={setShowConfirm} />}
    </div>
  )
}

export default Sidebar;