import { useChatStore } from '../stores/chatstore';

export const useChat = () => {
  const {
    messages,
    inputText,
    isLoading,
    setInputText,
    addMessage,
    updateLastMessage,
    setLoading,
    setShowHeading,
    setHasMessages,
    saveCurrentSession,
  } = useChatStore();

  const sendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    
    const userMessage = { 
      type: "user" as const, 
      text: inputText,
      timestamp: Date.now(),
      id: Math.random().toString(36).substr(2, 9)
    };
    const currentPrompt = inputText;

    // Add user message
    addMessage(userMessage);
    setInputText("");
    setShowHeading(false);
    setHasMessages(true);
    setLoading(true);

    // Add initial AI message with streaming indicator
    addMessage({ 
      type: "ai", 
      text: "", 
      isStreaming: true,
      timestamp: Date.now(),
      id: Math.random().toString(36).substr(2, 9)
    });

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: currentPrompt }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            setLoading(false);
            updateLastMessage({ isStreaming: false });
            // Save the session after completion
            saveCurrentSession();
            break;
          }

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.trim().startsWith("data:")) {
              const jsonData = line.replace(/^data:\s*/, "").trim();

              if (jsonData === "[DONE]" || line.includes("event: done")) {
                setLoading(false);
                updateLastMessage({ isStreaming: false });
                
                saveCurrentSession();
                return;
              }

              if (!jsonData || jsonData === "") continue;

              try {
                const parsed = JSON.parse(jsonData);
                const content = parsed.text;

                if (content) {
                  accumulatedText += content;
                  updateLastMessage({ text: accumulatedText });
                }
              } catch (err) {
                console.error("Error parsing JSON chunk:", err);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Error while streaming:", error);
      setLoading(false);
      updateLastMessage({
        text: "Sorry, there was an error processing your request.",
        isStreaming: false,
      });
      saveCurrentSession();
    }
  };

  return {
    messages,
    inputText,
    isLoading,
    setInputText,
    sendMessage,
  };
};