import Image from "next/image";
import { useContext } from "react";
import { ChatContext } from "../app/context/context";
import { ClipLoader } from "react-spinners";

function InputSection({ askQuestion, textareaRef, query, handleInput, setQuery }) {
    const context = useContext(ChatContext);
    return (
        <div className='flex justify-center'>
            <form className="
                w-[90%] lg:w-[70%]
                bg-zinc-900
                mb-4
                p-1 pr-3
                text-white
                rounded-4xl
                border border-zinc-400
                flex"
                onSubmit={(e) => {
                    e.preventDefault()
                    askQuestion()
                }}
            >
                <textarea
                    ref={textareaRef}
                    value={query}
                    onInput={handleInput}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.ctrlKey && e.key === 'Enter' && e.target.value.trim()) {
                            e.preventDefault();
                            askQuestion();
                        }
                    }}
                    rows={1}
                    className={
                        `w-full max-h-[8rem] min-h-[2.5rem]
                    resize-none 
                    p-3 
                    outline-none 
                    bg-transparent
                    overflow-y-auto 
                    scroll-invisible`
                    }
                    placeholder="Ask me anything..."
                ></textarea>
                {query.length > 0 && !context.isAnsLoading &&
                    <button
                        type='submit'
                        className='mt-auto mb-2 select-none'
                    >
                        <Image
                            src={'/send-button.png'}
                            alt='Ask' width={30}
                            height={30}
                        />
                    </button>
                }
                {context.isAnsLoading &&
                    <button
                        type='submit'
                        className='mt-auto mb-1 select-none'
                    >
                        <ClipLoader
                            color="gray"
                            loading={context.isAnsLoading}
                            size={30}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </button>
                }
            </form>
        </div>
    )
}

export default InputSection;