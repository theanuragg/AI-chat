import React, { useRef, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Components } from "react-markdown";
import { Message } from "../../stores/chatstore";

interface MessageListProps {
  messages: Message[];
}

const LoadingDots = () => (
  <div className="flex space-x-1 items-center">
    <div className="w-3 h-3 bg-black rounded-full animate-pulse"></div>
  </div>
);

const CopyIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20,6 9,17 4,12" />
  </svg>
);

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      
      setTimeout(() => setCopiedIndex(null), 1000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const components: Components = {
    code({
      inline,
      className,
      children,
      ...props
    }: {
      inline?: boolean;
      className?: string;
      children?: React.ReactNode;
    }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          style={atomDark}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <div className="w-full flex flex-col pt-10 px-4 pb-24 space-y-6">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`${message.type === "user" ? "p-3" : "p-0"} rounded-lg max-w-full mb-4 relative group ${
            message.type === "user"
              ? "bg-gray-50 self-end dark:bg-black text-right"
              : "bg-white self-start dark:bg-black/95 text-left"
          }`}
        >
          {message.type === "user" ? (
            <div>{message.text}</div>
          ) : (
            <div className="pt-3 pr-12 pb-3 pl-3">
              {/* Copy button for AI messages */}
              {message.text && !message.isStreaming && (
                <button
                  onClick={() => handleCopy(message.text, index)}
                  className="absolute top-2 right-2 p-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 dark:bg-black dark"
                  title="Copy message"
                >
                  {copiedIndex === index ? <CheckIcon /> : <CopyIcon />}
                </button>
              )}
              
              {message.text ? (
                <div>
                  <ReactMarkdown components={components}>
                    {message.text}
                  </ReactMarkdown>
                  {message.isStreaming && (
                    <span className="inline-block w-2 h-5 bg-gray-700 ml-1 rounded-full animate-pulse"></span>
                  )}
                </div>
              ) : message.isStreaming ? (
                <LoadingDots />
              ) : (
                <div className="whitespace-pre-line">No response</div>
              )}
            </div>
          )}
        </div>
      ))}
      <div ref={messagesEndRef} className="h-4" />
    </div>
  );
};

export default MessageList;