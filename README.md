# AI Chat - Gemini Powered Chatbot 🤖

A modern, feature-rich AI chatbot application powered by **Google's Gemini AI** with real-time streaming responses, persistent chat history, and an elegant user interface.

Built with **Next.js 15**, **Shadcn UI**, **TypeScript**, and **Tailwind CSS**.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [High-Level Architecture](#high-level-architecture)
- [Data Flow Diagram](#data-flow-diagram)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Routes](#api-routes)
- [State Management](#state-management)
- [Contributing](#contributing)

---

## 🎯 Overview

AI Chat is a production-ready conversational AI application that provides users with an intelligent chat interface powered by Google's Gemini AI. The application features real-time streaming responses, persistent chat history using browser storage, dark/light theme support, and a fully responsive design that works seamlessly across all devices.

### Key Highlights

- 🚀 **Real-time AI Streaming**: Experience natural conversations with live response streaming
- 💾 **Persistent Chat History**: All conversations are saved locally and can be accessed anytime
- 🎨 **Modern UI/UX**: Clean, intuitive interface built with Shadcn UI components
- 📱 **Fully Responsive**: Optimized experience on mobile, tablet, and desktop devices
- 🌗 **Theme Support**: Switch between dark and light modes based on preference
- ⚡ **High Performance**: Built on Next.js 15 with optimized rendering and Turbopack

---

## ✨ Features

### Core Features
- ⚡ **Real-time Streaming Responses**: AI responses stream live for a natural conversation experience
- 💬 **Multi-Session Management**: Create, manage, and switch between multiple chat sessions
- 💾 **Persistent Storage**: Chat history automatically saved using Zustand with localStorage
- 🔄 **Session History**: View all past conversations with timestamps and message counts
- 🗑️ **Chat Management**: Delete individual sessions or clear all chat history

### UI/UX Features
- 💎 **Modern Interface**: Clean, intuitive design using Shadcn UI components
- 📱 **Responsive Design**: Fully optimized layouts for mobile, tablet, and desktop
- 🌗 **Dark/Light Mode**: Theme toggle with persistent preference
- 📋 **Message Actions**: Copy AI responses to clipboard with visual feedback
- ⏳ **Loading States**: Visual indicators and animated loaders during AI processing
- ⬇️ **Auto-scroll**: Automatically scrolls to the latest message in conversations
- 🎯 **Smart Input**: Auto-expanding textarea with keyboard shortcuts (Enter to send, Shift+Enter for new line)

### Technical Features
- 🔐 **Error Handling**: Graceful error messages with user-friendly feedback
- 🎨 **Syntax Highlighting**: Code blocks in AI responses with proper syntax highlighting
- 📝 **Markdown Support**: Full markdown rendering for formatted AI responses
- 🚀 **Performance Optimized**: Built with Next.js 15 App Router and Turbopack
- 🐳 **Docker Ready**: Containerized deployment with Docker and Docker Compose support

---

## 🏗️ High-Level Architecture

The application follows a modern three-tier architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                     PRESENTATION LAYER                       │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Next.js 15 App Router (React 19)                      │ │
│  │  - Server-Side Rendering (SSR)                         │ │
│  │  - Client Components for Interactivity                 │ │
│  │  - Shadcn UI Components + Tailwind CSS                 │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                     APPLICATION LAYER                        │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  State Management (Zustand)                            │ │
│  │  - Chat Store (messages, sessions, UI state)           │ │
│  │  - Persistent Storage (localStorage)                   │ │
│  │                                                         │ │
│  │  Custom Hooks                                          │ │
│  │  - useChat (message handling, API calls)               │ │
│  │  - useTheme (dark/light mode)                          │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                        API LAYER                             │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Next.js API Routes (/api/chat)                        │ │
│  │  - Stream Handler                                      │ │
│  │  - Response Parser                                     │ │
│  │  - Error Management                                    │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                         │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Google Gemini AI API                                  │ │
│  │  - Model: gemini-1.5-flash                             │ │
│  │  - Stream Generate Content                             │ │
│  │  - Real-time Response Streaming                        │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Component Architecture

```
App Structure
├── Layout (Root)
│   ├── Theme Provider (Dark/Light)
│   └── Global Styles
│
└── Pages
    └── Home (/)
        └── Hero Component
            ├── ChatAppBar (Navigation & Controls)
            │   ├── New Chat Button
            │   ├── History Sidebar (Sheet)
            │   ├── Theme Toggle
            │   └── More Options (Dropdown)
            │
            ├── MessageList (Conversation Display)
            │   ├── User Messages
            │   └── AI Messages (with Markdown & Syntax Highlighting)
            │
            └── ChatInput (Message Composition)
                ├── Textarea (Auto-expanding)
                ├── About Button
                └── Send Button
```

---

## 🔄 Data Flow Diagram

### User Message Flow

```
┌──────────────┐
│   User Types │
│   Message    │
└──────┬───────┘
       │
       ▼
┌──────────────────────┐
│  ChatInput Component │
│  - Capture input     │
│  - Validate text     │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│  useChat Hook        │
│  - Create user msg   │
│  - Add to store      │
│  - Clear input       │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│  Chat Store (Zustand)│
│  - Update messages[] │
│  - Create/update     │
│    session           │
│  - Save to localStorage│
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│  API Call            │
│  POST /api/chat      │
│  { prompt: text }    │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────────────┐
│  API Route Handler           │
│  - Validate request          │
│  - Connect to Gemini API     │
│  - Setup streaming           │
└──────┬───────────────────────┘
       │
       ▼
┌────────────────────────────────┐
│  Google Gemini AI              │
│  - Process prompt              │
│  - Generate response           │
│  - Stream back tokens          │
└──────┬─────────────────────────┘
       │
       ▼
┌────────────────────────────────┐
│  Stream Processing             │
│  - Parse SSE events            │
│  - Extract text chunks         │
│  - Send to client              │
└──────┬─────────────────────────┘
       │
       ▼
┌────────────────────────────────┐
│  Client Stream Reader          │
│  - Accumulate chunks           │
│  - Update AI message in store  │
│  - Render progressively        │
└──────┬─────────────────────────┘
       │
       ▼
┌────────────────────────────────┐
│  MessageList Component         │
│  - Display streaming response  │
│  - Show typing indicator       │
│  - Apply markdown formatting   │
└────────────────────────────────┘
```

### Chat Session Management Flow

```
┌─────────────────┐
│  User Action    │
│  (New Chat,     │
│   Load History, │
│   Delete)       │
└────────┬────────┘
         │
         ▼
┌──────────────────────┐
│  ChatAppBar          │
│  - Trigger action    │
└────────┬─────────────┘
         │
         ▼
┌──────────────────────┐
│  Chat Store Actions  │
│  - startNewChat()    │
│  - loadChatSession() │
│  - deleteChatSession()│
│  - clearAllChats()   │
└────────┬─────────────┘
         │
         ▼
┌──────────────────────┐
│  Update State        │
│  - Modify sessions[] │
│  - Update messages[] │
│  - Change currentID  │
└────────┬─────────────┘
         │
         ▼
┌──────────────────────┐
│  Persist to Storage  │
│  - localStorage sync │
│  - Zustand middleware│
└────────┬─────────────┘
         │
         ▼
┌──────────────────────┐
│  UI Update           │
│  - Re-render components│
│  - Update history list│
│  - Show active session│
└──────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend Framework & Core
| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 15.3.1 | React framework with App Router, SSR, and API routes |
| **React** | 19.0.0 | UI library for building interactive components |
| **TypeScript** | 5.x | Type-safe development with static typing |
| **Tailwind CSS** | 4.1.7 | Utility-first CSS framework for styling |

### UI Components & Design
| Technology | Purpose |
|------------|---------|
| **Shadcn UI** | Pre-built accessible component library |
| **Radix UI** | Headless UI primitives for dialogs, dropdowns, sheets |
| **Lucide React** | Beautiful, consistent icon set |
| **next-themes** | Theme switching (dark/light mode) |

### State & Data Management
| Technology | Purpose |
|------------|---------|
| **Zustand** | Lightweight state management with persistence |
| **React Hooks** | Custom hooks for chat logic and API calls |

### Content Rendering
| Technology | Purpose |
|------------|---------|
| **React Markdown** | Render markdown content from AI responses |
| **React Syntax Highlighter** | Syntax highlighting for code blocks |
| **DOMPurify** | Sanitize HTML to prevent XSS attacks |
| **Marked** | Fast markdown parser |

### AI Integration
| Technology | Purpose |
|------------|---------|
| **Google Gemini AI** | AI model (gemini-1.5-flash) for chat responses |
| **Streaming API** | Real-time response streaming via SSE |

### Development Tools
| Technology | Purpose |
|------------|---------|
| **ESLint** | Code linting and quality checks |
| **Turbopack** | Fast development bundler for Next.js |
| **Docker** | Containerization for deployment |

---

## 📁 Project Structure

```
AI-chat/
├── app/                          # Next.js App Router directory
│   ├── api/                      # API routes
│   │   └── chat/                 # Chat API endpoint
│   │       └── route.ts          # Gemini AI streaming handler
│   ├── font/                     # Custom fonts
│   ├── layout.tsx                # Root layout with theme provider
│   ├── page.tsx                  # Home page component
│   └── globals.css               # Global styles
│
├── Components/                   # React components
│   ├── landing/                  # Main landing/chat components
│   │   ├── hero.tsx              # Main chat container
│   │   ├── appbar.tsx            # Navigation bar with controls
│   │   ├── chatInput.tsx         # Message input component
│   │   ├── messagelist.tsx       # Message display with markdown
│   │   ├── about.tsx             # About/info popup
│   │   └── theme-provider.tsx    # Theme context provider
│   └── ui/                       # Reusable UI components (Shadcn)
│       ├── button.tsx
│       ├── dialog.tsx
│       ├── dropdown-menu.tsx
│       ├── sheet.tsx
│       ├── scroll-area.tsx
│       └── alert-dialog.tsx
│
├── stores/                       # State management
│   └── chatstore.ts              # Zustand store for chat state
│
├── hooks/                        # Custom React hooks
│   └── usechat.ts                # Hook for chat functionality
│
├── lib/                          # Utility functions
│   └── utils.ts                  # Helper utilities
│
├── public/                       # Static assets
│   ├── crab.webp                 # About icon
│   └── debate.jpg                # OG image
│
├── Dockerfile                    # Docker configuration
├── docker-compose.yml            # Docker Compose setup
├── next.config.ts                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── components.json               # Shadcn UI configuration
├── package.json                  # Dependencies and scripts
└── README.md                     # This file
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher
- **npm** 9.x or higher (or **yarn** / **pnpm**)
- **Docker** (optional, for containerized deployment)
- **Google Gemini API Key** (free from [Google AI Studio](https://aistudio.google.com/))

### Installation

#### Option 1: Local Development

1. **Clone the repository**
```bash
git clone https://github.com/theanuragg/AI-chat.git
cd AI-chat
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```bash
touch .env.local
```

Add your Gemini API key:

```env
GEMINI_API_KEY=your_api_key_here
```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

#### Option 2: Docker Deployment

1. **Clone the repository**
```bash
git clone https://github.com/theanuragg/AI-chat.git
cd AI-chat
```

2. **Create environment file**
```bash
echo "GEMINI_API_KEY=your_api_key_here" > .env.local
```

3. **Build and run with Docker**
```bash
# Using Docker directly
docker build -t ai-chat .
docker run -p 3000:3000 --env-file .env.local ai-chat

# Or using Docker Compose
docker-compose up -d
```

4. **Access the application**

Navigate to [http://localhost:3000](http://localhost:3000)

#### Option 3: Production Build

```bash
# Build the application
npm run build

# Start the production server
npm start
```

---

## 🔐 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `GEMINI_API_KEY` | Google Gemini API key for AI responses | ✅ Yes | - |

### Getting a Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/)
2. Sign in with your Google account
3. Navigate to "Get API Key" section
4. Create a new API key or use an existing one
5. Copy the key and add it to your `.env.local` file

**Note**: The free tier of Gemini API includes generous rate limits suitable for development and small-scale production use.

---

## 💻 Usage

### Basic Chat

1. **Start a conversation**: Type your message in the input field and press Enter or click the send button
2. **View response**: Watch as the AI response streams in real-time
3. **Copy responses**: Click the copy icon on AI messages to copy the text to clipboard

### Managing Chat Sessions

1. **New Chat**: Click the "New Chat" button in the app bar to start a fresh conversation
2. **View History**: Click the "History" button to see all your past conversations
3. **Load Session**: Click on any session in the history sidebar to continue that conversation
4. **Delete Session**: Use the three-dot menu on any session to delete it
5. **Clear All**: Use the "Clear All" option in the more menu to delete all chat history

### Theme Switching

Click the sun/moon icon in the app bar to toggle between light and dark modes. Your preference is saved automatically.

### Keyboard Shortcuts

- **Enter**: Send message
- **Shift + Enter**: New line in message
- **Escape**: Close any open dialog or sheet

---

## 🔌 API Routes

### POST `/api/chat`

Sends a message to the Gemini AI and streams the response back.

**Request Body:**
```json
{
  "prompt": "Your message here"
}
```

**Response:**
Server-Sent Events (SSE) stream with the following format:

```
data: {"text": "chunk of text"}
data: {"text": "another chunk"}
data: [DONE]
```

**Error Responses:**
```json
{
  "error": "Error message"
}
```

**Status Codes:**
- `200`: Success (streaming)
- `400`: Bad request (missing prompt)
- `500`: Server error

---

## 🗄️ State Management

The application uses **Zustand** for state management with persistent storage.

### Chat Store (`stores/chatstore.ts`)

**State Structure:**
```typescript
{
  messages: Message[],           // Current conversation messages
  inputText: string,             // Current input field value
  showHeading: boolean,          // Show/hide welcome heading
  hasMessages: boolean,          // Has any messages in current chat
  isLoading: boolean,            // API request in progress
  showDebatePopup: boolean,      // About popup visibility
  chatSessions: ChatSession[],   // All saved chat sessions
  currentSessionId: string | null // Active session ID
}
```

**Key Actions:**
- `addMessage(message)`: Add a new message to the current chat
- `updateLastMessage(updates)`: Update the last AI message (for streaming)
- `startNewChat()`: Clear current chat and start fresh
- `loadChatSession(id)`: Load a specific chat session
- `deleteChatSession(id)`: Delete a specific session
- `clearAllChats()`: Delete all chat history

**Persistence:**
The store automatically saves to `localStorage` with the key `chat-storage`. This includes:
- All chat sessions
- Current session ID
- Messages in the current session
- UI state (showHeading, hasMessages)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style and conventions
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed
- Ensure all linting and type checks pass

---

## 📄 License

This project is open source and available for educational and personal use.

---

## 🙏 Acknowledgments

- **Google Gemini AI** for providing the powerful AI model
- **Vercel** for Next.js and hosting platform
- **Shadcn** for the beautiful UI component library
- **Radix UI** for accessible component primitives

---

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check existing issues for solutions
- Review the documentation

---

**Built with ❤️ using Next.js and Gemini AI**

