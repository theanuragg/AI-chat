import React from "react";
import { useChatStore } from "../../stores/chatstore";
import { useChat } from "../../hooks/usechat";
import MessageList from "./messagelist";
import ChatInput from "./chatInput";
import DebateCardPopup from "./about";
import ChatAppBar from "./appbar";

export default function Hero() {
  const {
    showHeading,
    hasMessages,
    showDebatePopup,
    setShowDebatePopup,
  } = useChatStore();

  const {
    messages,
    inputText,
    isLoading,
    setInputText,
    sendMessage,
  } = useChat();

  return (
    <div className="min-h-screen  w-3xl bg-background">
      {/* App Bar */}
      <ChatAppBar />
      
      {/* Main Content */}
      <div className="flex flex-col items-center w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        {/* Heading section - when no messages */}
        {!hasMessages && (
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] w-full text-center py-8 sm:py-12 lg:py-20">
            {showHeading && (
              <div className="mb-8 sm:mb-12 lg:mb-16 px-4">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl heading leading-tight">
                  Hey, how can I help you
                </h1>
              </div>
            )}
            
            <div className="w-full max-w-4xl px-4 sm:px-0">
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

        {/* Messages section - when messages exist */}
        {hasMessages && (
          <div className="flex flex-col w-full min-h-[calc(100vh-5rem)]">
            {/* Messages container with proper spacing */}
            <div className="flex-1 pt-4 pb-20 sm:pb-24 lg:pb-28">
              <MessageList messages={messages} />
            </div>

            {/* Fixed chat input at bottom */}
            <div className="fixed bottom-0 left-0 right-0 px-4 sm:px-6 lg:px-8 pb-2 sm:pb-3 lg:pb-4 bg-background backdrop-blur-sm z-10">
              <div className="max-w-4xl mx-auto">
              <ChatInput
                inputText={inputText}
                isLoading={isLoading}
                placeholder="Have a healthy debate..."
                onInputChange={setInputText}
                onSendMessage={sendMessage}
                onDebateClick={() => setShowDebatePopup(true)}
                className="w-full py-1"
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