
function Question({ question, timestamp }) {
  return (
    <div className="max-w-[75%] w-fit ml-auto my-6 bg-zinc-800 p-3 rounded-2xl rounded-tr-none">
      <pre className="text-zinc-200">{question}</pre>
      <div className="text-sm text-gray-400 text-right mt-1">
        {new Date(timestamp).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        })}
      </div>
    </div>
  )
}

export default Question;