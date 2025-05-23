import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { Loader2, Send } from "lucide-react";

interface ChatInputProps {
  inputText: string;
  isLoading: boolean;
  placeholder: string;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  onDebateClick: () => void;
  className?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({
  inputText,
  isLoading,
  placeholder,
  onInputChange,
  onSendMessage,
  onDebateClick,
  className = "",
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey && !isLoading) {
        e.preventDefault();
        buttonRef.current?.click();
      }
    };

    const textarea = textareaRef.current;
    if (textarea) {
      textarea.addEventListener("keydown", handleKeyDown);
      return () => textarea.removeEventListener("keydown", handleKeyDown);
    }
  }, [isLoading]);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
    }
  }, [inputText]);

  return (
    <div
      className={`w-full max-w-4xl mx-auto bg-background rounded-2xl shadow-xl border border-border ${className}`}
    >
      {/* Main input container */}
      <div className="p-3 sm:p-4 lg:p-5">
        {/* Mobile Layout - Horizontal */}
        <div className="flex items-end space-x-3 sm:space-x-4 lg:hidden">
          {/* Debate Button */}
          <div className="relative group flex-shrink-0">
            <button
              className={`flex items-center bg-background rounded-full p-2 sm:p-2 border border-border hover:scale-105 transition-all duration-200 ease-in-out cursor-pointer ${
                isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-accent"
              }`}
              onClick={() => !isLoading && onDebateClick()}
              disabled={isLoading}
            >
              <Image
                src="/crab.webp"
                alt=""
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </button>

            {/* Tooltip */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 flex-col opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex items-center z-20">
              <div className="w-3 h-3 bg-popover border-l border-t border-border rotate-45 -mb-2"></div>
              <div className="bg-popover border border-border text-popover-foreground text-sm font-mono px-4 py-3 rounded-lg shadow-lg whitespace-nowrap">
                About
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="flex-1 min-w-0">
            <textarea
              ref={textareaRef}
              className="w-full text-base sm:text-lg text-foreground bg-transparent resize-none focus:outline-none placeholder:text-muted-foreground leading-relaxed"
              placeholder={placeholder}
              value={inputText}
              onChange={(e) => onInputChange(e.target.value)}
              disabled={isLoading}
              rows={1}
              style={{
                minHeight: "32px",
                maxHeight: "160px",
                lineHeight: "1.6",
              }}
            />
          </div>

          {/* Send Button */}
          <div className="flex-shrink-0">
            <button
              ref={buttonRef}
              className={`rounded-full bg-primary p-2 sm:p-2 hover:scale-110 transition-transform duration-200 ease-in-out text-primary-foreground ${
                isLoading || !inputText.trim()
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-primary/90"
              }`}
              onClick={onSendMessage}
              disabled={isLoading || !inputText.trim()}
            >
              {isLoading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Send size={16} />
              )}
            </button>
          </div>
        </div>

        {/* Desktop Layout - Compact Horizontal */}
        <div className="hidden lg:flex lg:items-center lg:space-x-4">
          {/* Debate Button - Left */}
          <div className="relative group flex-shrink-0">
            <button
              className={`flex items-center bg-background rounded-full p-2 border border-border hover:scale-105 transition-all duration-200 ease-in-out cursor-pointer ${
                isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-accent"
              }`}
              onClick={() => !isLoading && onDebateClick()}
              disabled={isLoading}
            >
              <Image src="/crab.webp" alt="" width={18} height={18} />
            </button>

            {/* Tooltip */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 flex-col opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex items-center z-20">
              <div className="w-3 h-3 bg-popover border-l border-t border-border rotate-45 -mb-2"></div>
              <div className="bg-popover border border-border text-popover-foreground text-sm font-mono px-4 py-3 rounded-lg shadow-lg whitespace-nowrap">
                About
              </div>
            </div>
          </div>

          {/* Input Area - Center (Flexible) */}
          <div className="flex-1 min-w-0">
            <textarea
              ref={textareaRef}
              className="w-full text-lg text-foreground bg-transparent resize-none focus:outline-none placeholder:text-muted-foreground leading-relaxed"
              placeholder={placeholder}
              value={inputText}
              onChange={(e) => onInputChange(e.target.value)}
              disabled={isLoading}
              rows={1}
              style={{
                minHeight: "36px",
                maxHeight: "120px",
                lineHeight: "1.5",
              }}
            />
          </div>

          {/* Send Button - Right */}
          <div className="flex-shrink-0">
            <button
              ref={buttonRef}
              className={`rounded-full bg-primary p-2.5 hover:scale-110 transition-transform duration-200 ease-in-out text-primary-foreground ${
                isLoading || !inputText.trim()
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-primary/90"
              }`}
              onClick={onSendMessage}
              disabled={isLoading || !inputText.trim()}
            >
              {isLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Send size={18} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
