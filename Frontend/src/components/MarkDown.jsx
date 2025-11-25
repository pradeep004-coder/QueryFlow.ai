import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function Markdown({ content }) {
    return (
        <ReactMarkdown>
            {content}
        </ReactMarkdown>
    )
}
