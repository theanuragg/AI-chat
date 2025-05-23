import React, { useRef, useEffect } from "react";
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

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

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
          className={`p-3 rounded-lg max-w-full mb-4 ${
            message.type === "user"
              ? "bg-gray-50 self-end text-right"
              : "bg-white self-start text-left"
          }`}
        >
          {message.type === "user" ? (
            <div>{message.text}</div>
          ) : (
            <div>
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