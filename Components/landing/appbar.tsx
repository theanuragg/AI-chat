import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useChatStore } from "../../stores/chatstore";
import {
  Sun,
  Moon,
  MessageSquarePlus,
  History,
  Trash2,
  MoreVertical,
  Clock,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
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
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

const ChatAppBar: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [historyOpen, setHistoryOpen] = useState(false);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    chatSessions,
    currentSessionId,
    startNewChat,
    loadChatSession,
    deleteChatSession,
    clearAllChats,
  } = useChatStore();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = Date.now();
    const diff = now - timestamp;

    // Less than 1 hour
    if (diff < 3600000) {
      return "Just now";
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
    <div className="sticky top-2 z-50 w-full sm:w-2xl sm:mx-auto mx-1 border border-border dark:border-gray-700 shadow-md rounded-lg bg-background/95 dark:bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:supports-[backdrop-filter]:bg-black/60">
      <div className="flex h-12 sm:h-14 lg:h-16 items-center justify-between px-2 sm:px-4 lg:px-6 max-w-7xl mx-auto">
        {/* Left side - Logo/Title */}
        <div className="flex items-center space-x-1 sm:space-x-2 min-w-0 flex-shrink-0">
          {mounted && (
            <h1
              className={`text-base sm:text-lg lg:text-xl font-semibold truncate ${
                theme === "dark" ? "bg-bagel-fat-one" : "bagel-fat-one"
              }`}
            >
              AI Chat
            </h1>
          )}
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-0.5 sm:space-x-1 lg:space-x-2 flex-shrink-0">
          {/* New Chat Button - Hidden on mobile, shown on tablet+ */}
          <Button
            variant="ghost"
            size="sm"
            onClick={startNewChat}
            className="hidden sm:flex items-center space-x-1 px-2 lg:px-3 py-1.5 lg:py-2 hover:bg-accent dark:hover:bg-gray-800"
          >
            <MessageSquarePlus
              className="text-gray-800 dark:text-gray-200"
              size={16}
            />
            <span className="text-sm font-normal hidden md:inline text-foreground dark:text-gray-200">
              New Chat
            </span>
          </Button>

          {/* New Chat Button - Mobile only (icon only) */}
          <Button
            variant="ghost"
            size="sm"
            onClick={startNewChat}
            className="sm:hidden p-1.5 hover:bg-accent dark:hover:bg-gray-800"
          >
            <MessageSquarePlus
              className="text-gray-800 dark:text-gray-200"
              size={16}
            />
          </Button>

          {/* Chat History */}
          <Sheet open={historyOpen} onOpenChange={setHistoryOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="p-1.5 sm:p-2 lg:px-3 hover:bg-accent dark:hover:bg-gray-800"
              >
                <History
                  size={16}
                  className="sm:w-4 sm:h-4 text-foreground dark:text-gray-200"
                />
                <span className="hidden lg:ml-2 lg:inline text-sm font-normal text-foreground dark:text-gray-200">
                  History
                </span>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[280px] sm:w-[350px] lg:w-[400px] bg-background dark:bg-black border-border dark:border-gray-700">
              <SheetHeader className="text-left">
                <SheetTitle className="font-normal text-base sm:text-lg text-foreground dark:text-white">
                  Chat History
                </SheetTitle>
                <SheetDescription className="text-xs sm:text-sm text-muted-foreground dark:text-gray-400">
                  Your previous conversations
                </SheetDescription>
              </SheetHeader>

              <div className="mt-4 sm:mt-6 space-y-1">
                {chatSessions.length === 0 ? (
                  <div className="text-center text-muted-foreground dark:text-gray-400 py-6 sm:py-8">
                    <History
                      size={36}
                      className="sm:w-12 sm:h-12 mx-auto mb-2 opacity-50"
                    />
                    <p className="text-xs sm:text-sm lg:text-base">
                      No chat history yet
                    </p>
                    <p className="text-xs font-normal mt-1 px-4">
                      Start a conversation to see it here
                    </p>
                  </div>
                ) : (
                  <ScrollArea className="h-[400px] sm:h-[500px] lg:h-[600px]">
                    <div className="space-y-2 sm:space-y-3 px-2 sm:px-2">
                      {chatSessions.map((session) => (
                        <div
                          key={session.id}
                          className={`group relative p-2.5 sm:p-3 rounded-lg border cursor-pointer transition-colors hover:bg-accent dark:hover:bg-gray-800 ${
                            currentSessionId === session.id
                              ? "bg-accent dark:bg-gray-800 border-primary dark:border-blue-500"
                              : "border-border dark:border-gray-600"
                          }`}
                          onClick={() => handleLoadSession(session.id)}
                        >
                          <div className="flex justify-between items-start gap-2">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm  tex-black truncate leading-tight text-foreground dark:font-normal dark:text-white">
                                {session.title}
                              </h4>
                              <div className="flex items-center space-x-1 sm:space-x-2 text-xs text-muted-foreground dark:text-gray-400 mt-1">
                                <Clock size={12} className="flex-shrink-0" />
                                <span className="truncate">
                                  {formatDate(session.updatedAt)}
                                </span>
                                <span>•</span>
                                <span className="truncate">
                                  {session.messages.length} messages
                                </span>
                              </div>
                            </div>

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 flex-shrink-0 p-0 hover:bg-accent dark:hover:bg-gray-700"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <MoreVertical
                                    size={12}
                                    className="text-foreground dark:text-gray-200"
                                  />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                align="end"
                                className="w-32 bg-background dark:bg-black border-border dark:border-gray-600"
                              >
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleLoadSession(session.id);
                                  }}
                                  className="text-xs sm:text-sm text-foreground dark:text-gray-200 hover:bg-accent dark:hover:bg-gray-800"
                                >
                                  Load Chat
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-border dark:bg-gray-600" />
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteChatSession(session.id);
                                  }}
                                  className="text-destructive dark:text-red-400 hover:bg-destructive/10 dark:hover:bg-red-900/20"
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
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="p-1.5 sm:p-2 lg:px-3 hover:bg-accent dark:hover:bg-gray-800"
          >
            {theme === "light" ? (
              <Sun size={16} className="text-yellow-200" />
            ) : (
              <Moon size={16} className="text-gray-700 dark:text-gray-200" />
            )}
            <span className="hidden lg:ml-2 lg:inline text-sm font-normal text-foreground dark:text-gray-200">
              {theme === "light" ? "Light" : "Dark"}
            </span>
          </Button>

          {/* More Options */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="p-1.5 sm:p-2 hover:bg-accent dark:hover:bg-gray-800"
              >
                <MoreVertical
                  size={16}
                  className="text-foreground dark:text-gray-200"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-36 bg-background dark:bg-black border-border dark:border-gray-600"
            >
              <DropdownMenuItem
                onClick={startNewChat}
                className="text-xs sm:text-sm text-foreground dark:text-gray-200 hover:bg-accent dark:hover:bg-gray-800"
              >
                <MessageSquarePlus size={12} className="sm:w-4 sm:h-4 mr-2" />
                New Chat
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border dark:bg-gray-600" />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    className="text-destructive dark:text-red-400 text-xs sm:text-sm hover:bg-destructive/10 dark:hover:bg-red-900/20"
                  >
                    <Trash2 size={12} className="sm:w-4 sm:h-4 mr-2" />
                    Clear, All
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-[90vw] max-w-sm sm:max-w-md mx-4 bg-background dark:bg-black border-border dark:border-gray-700">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-base sm:text-lg text-foreground dark:text-white">
                      Clear All Chats
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-xs sm:text-sm text-muted-foreground dark:text-gray-400">
                      This will permanently delete all your chat history. This
                      action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="flex-col sm:flex-row gap-2 sm:gap-2">
                    <AlertDialogCancel className="text-xs sm:text-sm w-full sm:w-auto bg-background dark:bg-black text-foreground dark:text-gray-200 border-border dark:border-gray-600 hover:bg-accent dark:hover:bg-gray-800">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={clearAllChats}
                      className="bg-destructive dark:bg-red-600 text-destructive-foreground dark:text-white hover:bg-destructive/90 dark:hover:bg-red-700 text-xs sm:text-sm w-full sm:w-auto"
                    >
                      Clear, All
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
