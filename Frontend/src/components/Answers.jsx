import { useState } from "react";
import ReactMarkdown from 'react-markdown';
import Code from "./Code";

function Answers({ ans, ansType, language }) {
  
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(ans);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (!ans) return null;

  switch (ansType) {
    case 't':
      return (
        <div className="max-w-full text-zinc-200 text-lg font-bold pt-4 pb-2 whitespace-normal">
          <ReactMarkdown>{ans.replace("##", "")}</ReactMarkdown>
        </div>
      );

    case 'h1':
      return (
        <div className="max-w-full text-zinc-200 pt-4 pb-2 whitespace-normal">
          <ReactMarkdown>{ans}</ReactMarkdown>
        </div>
      );

    case 'h2':
      return (
        <div className="max-w-full text-zinc-300 pt-3 pb-1 whitespace-normal">
          <ReactMarkdown>{ans}</ReactMarkdown>
        </div>
      );

    case 'h3':
      return (
        <div className="max-w-full font-medium text-zinc-400 pt-2 pl-2 whitespace-normal">
          <ReactMarkdown>{ans}</ReactMarkdown>
        </div>
      );

    case 'code':
      return (
        <div className="max-w-full my-4">
          <div className="bg-zinc-600 px-4 py-2 flex justify-between rounded-t-lg">
            <div className="text-md">{language}</div>
            <button
              type="button"
              className="text-sm px-1 rounded-md bg-zinc-700 hover:bg-zinc-500 transition-colors border border-zinc-500"
              onClick={handleCopy}>{copied ? 'copied' : 'copy'}</button>
          </div>
          <div className="rounded-b-lg">
            <pre className="whitespace-normal">
              <Code codeString={ans} language={language?.toLowerCase()} />
            </pre>
          </div>
        </div>
      );

    default:
      return (
        <div className="max-w-full text-zinc-300 pt-1 pb-3 whitespace-normal">
          {ans}
        </div>
      )
  }
}

export default Answers;