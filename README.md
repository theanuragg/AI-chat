# Gemini AI Chatbot 🤖

A modern, responsive chatbot interface powered by **Google's Gemini AI** with real-time streaming responses.

Built with **Next.js 14+, Shadcn UI**, and **Tailwind CSS**.

🚀 [Live Demo](#)

---

## ✨ Features

- ⚡ **Real-time Streaming**: AI responses stream live for a natural conversation feel  
- 💎 **Modern UI**: Clean, intuitive chat interface using Shadcn UI components  
- 📱 **Responsive Design**: Fully optimized for desktop, tablet, and mobile  
- 🌗 **Dark/Light Mode**: Toggle for user preference  
- ❗ **Error Handling**: Graceful error messages with user-friendly feedback  
- 🗂️ **Chat Management**: Clear history and manage conversation state  
- ⏳ **Loading States**: Visual indicators for loading status  
- 📋 **Message Actions**: Copy message functionality  
- ⬇️ **Auto-scroll**: Automatically scrolls to the latest message  

---

## 🛠️ Tech Stack

| Feature        | Stack                        |
|----------------|------------------------------|
| Framework      | Next.js 14+ (App Router)     |
| AI Integration | `@google/generative-ai`      |
| UI Components  | Shadcn UI                    |
| Styling        | Tailwind CSS                 |
| Language       | TypeScript                   |
| Deployment     | Vercel / Netlify             |

---

## 📋 Prerequisites

- Node.js 18+
- npm / yarn / pnpm
- Google Gemini API key *(free from [Google AI Studio](https://makersuite.google.com/))*

---

## 🔧 Installation Guide
---


#### a. Clone the Repo

### 🐳 1. Docker (Recommended for Production)

```bash
git clone https://github.com/yourusername/gemini-ai-chatbot.git
cd gemini-ai-chatbot
cp .env.example .env.local
GOOGLE_GEMINI_API_KEY=your_api_key_here
docker build -t gemini-chatbot .
docker run -p 3000:3000 --env-file .env.local gemini-chatbot
```
### Without Docker 

```bash
git clone https://github.com/yourusername/gemini-ai-chatbot.git
cd gemini-ai-chatbot
cp .env.example .env.local
GOOGLE_GEMINI_API_KEY=your_api_key_here
npm install  
npm run dev 
```

<pre> ``` emini-ai-chatbot/ ├── app/ │ ├── api/ │ │ └── chat/ │ │ └── route.ts # API endpoint for chat │ ├── components/ │ │ ├── ui/ # Shadcn UI components │ │ ├── chat-interface.tsx # Main chat UI component │ │ ├── message-bubble.tsx # Message display │ │ ├── chat-input.tsx # Input field │ │ ├── theme-toggle.tsx # Dark/light mode toggle │ │ └── hero.tsx # Hero wrapper component │ ├── hooks/ │ │ └── use-chat.ts # Custom hook to fetch chat from API │ ├── lib/ │ │ └── utils.ts # Utility functions │ ├── store/ │ │ └── chat-store.ts # Zustand store for global chat state │ ├── globals.css # Tailwind global styles │ ├── layout.tsx # Root layout with metadata and providers │ └── page.tsx # Home page, renders  ├── public/ # Static assets like logo, favicon, etc. ├── .env.example # Template for API keys ├── .env.local # Your local API keys (ignored by git) ├── tailwind.config.js # Tailwind configuration ├── next.config.js # Next.js configuration ├── Dockerfile # (if you're using Docker) └── package.json # Project metadata and dependencies ``` </pre>