import React, { useEffect, useState } from "react";
import { useChatStore } from "../../stores/chatstore";
import { useChat } from "../../hooks/usechat";
import MessageList from "./messagelist";
import ChatInput from "./chatInput";
import DebateCardPopup from "./about";
import ChatAppBar from "./appbar";
import { useTheme } from 'next-themes';

export default function Hero() {
  const { showHeading, hasMessages, showDebatePopup, setShowDebatePopup } = useChatStore();
  const { messages, inputText, isLoading, setInputText, sendMessage } = useChat();
  const { theme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen w-full bg-background">
      <ChatAppBar />

      <div className="flex flex-col items-center w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        {!hasMessages && (
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)] w-full text-center py-6 sm:py-8 lg:py-12">
            {showHeading && mounted && (
              <div className="mb-6 sm:mb-8 lg:mb-12 px-2 sm:px-4">
                <h1
                  className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight ${
                    theme === "dark" ? "bg-heading" : "heading"
                  }`}
                >
                  Hey, how can I help you
                </h1>
              </div>
            )}

            <div className="w-full max-w-4xl px-2 sm:px-4 lg:px-0">
              <ChatInput
                inputText={inputText}
                isLoading={isLoading}
                placeholder="Ask your query here..."
                onInputChange={setInputText}
                onSendMessage={sendMessage}
                onDebateClick={() => setShowDebatePopup(true)}
                className="w-full"
              />
            </div>

            {showDebatePopup && (
              <DebateCardPopup
                onClose={() => setShowDebatePopup(false)}
                onStart={() => console.log("Start debate")}
              />
            )}
          </div>
        )}

        {hasMessages && (
          <div className="flex flex-col w-full min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)]">
            <div className="flex-1 pt-2 sm:pt-4 pb-16 sm:pb-20 lg:pb-24">
              <MessageList messages={messages} />
            </div>

            <div className="fixed bottom-0 left-0 right-0 px-2 sm:px-4 lg:px-6 pb-2 sm:pb-3 lg:pb-4 bg-background backdrop-blur-sm border-border/20 z-10">
              <div className="max-w-4xl mx-auto">
                <ChatInput
                  inputText={inputText}
                  isLoading={isLoading}
                  placeholder="Have a healthy debate..."
                  onInputChange={setInputText}
                  onSendMessage={sendMessage}
                  onDebateClick={() => setShowDebatePopup(true)}
                  className="w-full"
                />
              </div>
            </div>

            {showDebatePopup && (
              <DebateCardPopup
                onClose={() => setShowDebatePopup(false)}
                onStart={() => console.log("Start debate")}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
