import React from 'react'

function WelcomeContent() {
  return (
    <div className='h-[50vh] flex items-center justify-center'>
        <h1 className="
            text-4xl lg:text-5xl font-bold text-center text-transparent
            bg-clip-text bg-gradient-to-r from-zinc-100 to-blue-400 select-none cursor-pointer"
        >
            Welcome to QueryFlow<span className="text-blue-500">.ai</span>
        </h1>
    </div>
  )
}

export default WelcomeContent;