import React, { useState } from 'react';
import { useTheme } from 'next-themes';
import { useChatStore } from '../../stores/chatstore';
import {
  Sun,
  Moon,
  MessageSquarePlus,
  History,
  Trash2,
  MoreVertical,
  Clock,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '../ui/scroll-area';

const ChatAppBar: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [historyOpen, setHistoryOpen] = useState(false);
  
  const {
    chatSessions,
    currentSessionId,
    startNewChat,
    loadChatSession,
    deleteChatSession,
    clearAllChats,
  } = useChatStore();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = Date.now();
    const diff = now - timestamp;
    
    // Less than 1 hour
    if (diff < 3600000) {
      return 'Just now';
    }
    // Less than 24 hours
    if (diff < 86400000) {
      return `${Math.floor(diff / 3600000)}h ago`;
    }
    // Less than 7 days
    if (diff < 604800000) {
      return `${Math.floor(diff / 86400000)}d ago`;
    }
    
    return date.toLocaleDateString();
  };

  const handleLoadSession = (sessionId: string) => {
    loadChatSession(sessionId);
    setHistoryOpen(false);
  };

  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 sm:h-16 items-center justify-between px-3 sm:px-4 lg:px-6 max-w-7xl mx-auto">
        {/* Left side - Logo/Title */}
        <div className="flex items-center space-x-2 min-w-0">
          <h1 className="text-lg sm:text-xl bagel-fat-one font-semibold truncate">
            AI Chat
          </h1>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          {/* New Chat Button - Hidden on mobile, shown on tablet+ */}
          <Button
            variant="ghost"
            size="sm"
            onClick={startNewChat}
            className="hidden md:flex items-center space-x-1"
          >
            <MessageSquarePlus className="text-gray-800" size={16} />
            <span className="font-normal">New Chat</span>
          </Button>

          {/* New Chat Button - Mobile only (icon only) */}
          <Button
            variant="ghost"
            size="sm"
            onClick={startNewChat}
            className="md:hidden p-2"
          >
            <MessageSquarePlus className="text-gray-800" size={18} />
          </Button>

          {/* Chat History */}
          <Sheet open={historyOpen} onOpenChange={setHistoryOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="p-2 sm:px-3">
                <History size={16} className="sm:w-4 sm:h-4" />
                <span className="hidden lg:ml-2 lg:inline font-normal">History</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="font-normal text-left">Chat History</SheetTitle>
                <SheetDescription className="text-left">
                  Your previous conversations
                </SheetDescription>
              </SheetHeader>
              
              <div className="mt-6 space-y-1">
                {chatSessions.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    <History size={48} className="mx-auto mb-2 opacity-50" />
                    <p className="text-sm sm:text-base">No chat history yet</p>
                    <p className="text-xs sm:text-sm font-normal mt-1">
                      Start a conversation to see it here
                    </p>
                  </div>
                ) : (
                  <ScrollArea className="h-[500px] sm:h-[600px]">
                    <div className="space-y-2 pr-2">
                      {chatSessions.map((session) => (
                        <div
                          key={session.id}
                          className={`group relative p-3 rounded-lg border cursor-pointer transition-colors hover:bg-accent ${
                            currentSessionId === session.id
                              ? 'bg-accent border-primary'
                              : 'border-border'
                          }`}
                          onClick={() => handleLoadSession(session.id)}
                        >
                          <div className="flex justify-between items-start gap-2">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm abezee-text truncate">
                                {session.title}
                              </h4>
                              <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                                <Clock size={12} />
                                <span>{formatDate(session.updatedAt)}</span>
                                <span>•</span>
                                <span>{session.messages.length} messages</span>
                              </div>
                            </div>
                            
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 flex-shrink-0"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <MoreVertical size={12} />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleLoadSession(session.id);
                                  }}
                                >
                                  Load Chat
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteChatSession(session.id);
                                  }}
                                  className="text-destructive"
                                >
                                  <Trash2 size={12} className="mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </div>
            </SheetContent>
          </Sheet>

          {/* Theme Toggle */}
          <Button variant="ghost" size="sm" onClick={toggleTheme} className="p-2 sm:px-3">
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            <span className="hidden lg:ml-2 lg:inline font-normal">
              {theme === 'dark' ? 'Light' : 'Dark'}
            </span>
          </Button>

          {/* More Options */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="p-2">
                <MoreVertical size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={startNewChat}>
                <MessageSquarePlus size={16} className="mr-2" />
                New Chat
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    className="text-destructive"
                  >
                    <Trash2 size={16} className="mr-2" />
                    Clear All Chats
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-[90vw] max-w-md">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Clear All Chats</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete all your chat history. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={clearAllChats}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Clear All
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default ChatAppBar;