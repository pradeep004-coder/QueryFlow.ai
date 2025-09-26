function Navbar({openSidebar}) {
  return (
    <nav className='flex bg-zinc-900 p-2'>
        <button 
            type='button'
            className='justify-start'
            onClick={
                (e) => { 
                    e.stopPropagation();
                    openSidebar();
                }
            }
        >☰</button>
        <h2 className='w-full text-lg text-center font-semibold select-none cursor-pointer'>QueryFlow.AI</h2>
    </nav>
  )
}

export default Navbar;