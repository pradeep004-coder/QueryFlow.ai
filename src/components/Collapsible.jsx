import { useState } from "react";
export function Collapsible({children}) {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className="mb-3">
           <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 px-3 py-1.5
                            bg-zinc-700 hover:bg-zinc-600 
                            text-zinc-200 hover:text-white 
                            text-sm font-semibold 
                            rounded-lg shadow-sm transition-all duration-200
                            select-none"
                >
                {isOpen ? 'Hide' : 'Show'}
                <span
                    className={`transform transition-transform duration-300 ${isOpen ? "rotate-0" : "-rotate-90"}`}
                >
                    ▼
                </span>
            </button>
            {isOpen && <div>{children}</div>}
        </div>
    )
}