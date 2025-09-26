import React, { useState, useEffect, useContext } from 'react'
import { ChatContext } from '../app/context/context';
import { toast } from 'react-toastify';

function ConfirmLogout({setShow}) {

  const [isOpen, setIsOpen] = useState(false);
  const {setIsLoggedIn} = useContext(ChatContext);

  useEffect(() => {
    setTimeout(() => {
      setIsOpen(true);
    }, 0);
  },[])

  const handleConfirm = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    setIsOpen(false);
    toast.info("Logged out!!");
    setTimeout(() => {
      setShow(false);
    }, 300);
  }
  
  const handleCancel = () => {
    setIsOpen(false);
    setTimeout(() => {
      setShow(false);
    }, 300);
  };
  

  return (
    <div className='h-screen w-screen fixed top-0 left-0 bg-black/75 flex justify-center items-center' onClick={(e) => e.stopPropagation()}>
        <div className={`w-[90%] md:w-100px bg-zinc-900 py-4 px-6 rounded-2xl shadow-md ${isOpen ? "scale-100" : "scale-0"} transition-all duration-300`}>
            <h2 className='text-white text-xl'>Log out?</h2>
            <p className='text-white text-md'>You’ll be logged out of this device. You can log back anytime.</p>
            <div className='flex gap-3 justify-end mt-4'>
              <button className='px-3 py-1 bg-zinc-700 hover:bg-zinc-600 rounded-xl transition-all duration-300' onClick={handleCancel}>cancel</button>
              <button className='px-3 py-1 bg-red-700 hover:bg-red-500 rounded-xl transition-all duration-300' onClick={handleConfirm}>log out</button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmLogout;