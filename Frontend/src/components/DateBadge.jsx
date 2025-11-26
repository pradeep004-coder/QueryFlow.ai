
export default function DateBadge({visibleDate, isDateVisible}) {

    return (
        <div className={`absolute w-full ${isDateVisible? "top-12 opacity-100" : "-top-2 opacity-0"} flex justify-center transition-all duration-300 ease-in-out`}>
            <div className="w-fit px-2 bg-zinc-700 rounded-lg">
                {visibleDate}
            </div>
        </div>
    )
}
