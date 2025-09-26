import { useEffect, useState } from "react";

function Answers({ ans, ansType, language }) {

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    console.log(ans);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(ans);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (!ans) return null;

  switch (ansType) {
    case 'h1':
      return (
        <div className="text-md font-bold text-zinc-200 pt-4 pb-2">
          {ans}
        </div>
      );

    case 'h2':
      return (
        <div className="font-semibold text-zinc-300 pt-3 pb-1">
          {ans}
        </div>
      );

    case 'h3':
      return (
        <div className="text-base font-medium text-zinc-400 pt-2 pl-2">
          {ans}
        </div>
      );

    case 'code':
      return (
        <div className="my-4">
          <div className="bg-zinc-600 px-4 py-2 flex justify-between rounded-t-lg">
            <div className="text-md">{language.charAt(0).toUpperCase() + language.slice(1)}</div>
            <button 
              type="button" 
              className="text-sm px-1 rounded-md bg-zinc-700 hover:bg-zinc-500 transition-colors border border-zinc-500" 
              onClick={handleCopy}>{copied ? 'copied' : 'copy'}</button>
          </div>
          <div className="bg-zinc-800 text-green-300 text-sm  p-3 overflow-auto rounded-b-lg">
            <pre>
              <code>{ans}</code>
            </pre>
          </div>
        </div>
      );

    case 'para':
    default:
      return (
        <p className="text-md text-zinc-300 leading-relaxed pt-1 pb-3">
          {ans}
        </p>
      )
  }
}

export default Answers;