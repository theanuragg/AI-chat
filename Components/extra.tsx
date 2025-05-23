
{/* before u read this garbage code i am working on it  */}


 // "use client";
// import React, { useRef, useEffect, useState } from "react";
// import Image from "next/image";
// import DebateCardPopup from "./debatcard";

// export default function Hero() {
//   const buttonRef = useRef<HTMLButtonElement>(null);
//   const [showDebatePopup, setShowDebatePopup] = useState(false);
//   const [inputText, setInputText] = useState("");
//   const [messages, setMessages] = useState<string[]>([]);
//   const [showHeading, setShowHeading] = useState(true);
//   const [hasMessages, setHasMessages] = useState(false);

//   const handleStartDebate = (leftParty: string, rightParty: string): void => {
//     console.log("Starting debate between:", leftParty, "and", rightParty);
//     // Add your logic to navigate or start the debate
//     setShowDebatePopup(false);
//   };

//   const handleSendMessage = () => {
//     if (inputText.trim()) {
//       // Add message to the messages array
//       setMessages((prevMessages) => [...prevMessages, inputText]);
//       // Clear input field
//       setInputText("");
//       // Hide the heading
//       setShowHeading(false);
//       // Set has messages to true to adjust layout
//       setHasMessages(true);
//     }
//   };

//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === "Enter") {
//         buttonRef.current?.click();
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);

//     // Clean up on unmount
//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, []);

//   return (
//     <div
//       className={`flex flex-col items-center w-full max-w-lg mx-auto ${
//         hasMessages ? "h-screen" : ""
//       }`}
//     >
//       {/* Initial centered content when no messages */}
//       {!hasMessages && (
//         <div className="flex flex-col items-center justify-center flex-grow w-full">
//           {/* Header */}
//           {showHeading && (
//             <h1 className="heading mb-10">Hey, how can I help you</h1>
//           )}

//           {/* Message Input Card - Centered */}
//           <div className="w-full bg-white rounded-xl shadow-lg p-4 border border-gray-100">
//             <input
//               className="w-full text-style mb-4 focus:outline-none"
//               placeholder="have a healthy debate............"
//               type="text"
//               value={inputText}
//               onChange={(e) => setInputText(e.target.value)}
//             />

//             {/* Tag */}
//             <div className="flex items-center">
//               <div
//                 className="flex items-center bg-white rounded-full px-3 py-1 border border-gray-200 hover:scale-105 transition-transform duration-200 ease-in-out cursor-pointer"
//                 onClick={() => setShowDebatePopup(true)}
//               >
//                 <Image src="/crab.webp" alt="" width={20} height={20} />
//                 <span className="text-gray-500 px-1">debate</span>
//               </div>

//               {showDebatePopup && (
//                 <DebateCardPopup
//                 debateTopic={inputText}
//                   onClose={() => setShowDebatePopup(false)}
//                   onStart={handleStartDebate}
//                 />
//               )}

//               {/* Arrow Button */}
//               <div className="ml-auto">
//                 <button
//                   ref={buttonRef}
//                   className="rounded-full bg-black p-2 hover:scale-110 transition-transform duration-200 ease-in-out"
//                   onClick={handleSendMessage}
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="16"
//                     height="16"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="white"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <path d="M12 19V5" />
//                     <path d="M5 12l7-7 7 7" />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Layout after messages are sent */}
//       {hasMessages && (
//         <>
//           {/* Messages container - scrollable area */}
//           <div className="w-full flex flex-col pt-10 px-4 pb-28">
//             {messages.map((message, index) => (
//               <div
//                 key={index}
//                 className="bg-gray-50 p-2 rounded-lg mb-8 text- ml-auto text-end inline-block max-w-[70%]"
//               >
//                 {message}
//               </div>
//             ))}
//           </div>

//           {/* Message Input Card - Fixed at bottom */}
//           <div className="w-full bg-white rounded-xl shadow-lg p-4 border border-gray-100 fixed bottom-4 left-0 right-0 max-w-lg mx-auto">
//             <input
//               className="w-full text-style mb-4 focus:outline-none"
//               placeholder="have a healthy debate............"
//               type="text"
//               value={inputText}
//               onChange={(e) => setInputText(e.target.value)}
//             />

//             {/* Tag */}
//             <div className="flex items-center">
//               <div
//                 className="flex items-center bg-white rounded-full px-3 py-1 border border-gray-200 hover:scale-105 transition-transform duration-200 ease-in-out cursor-pointer"
//                 onClick={() => setShowDebatePopup(true)}
//               >
//                 <Image src="/crab.webp" alt="" width={20} height={20} />
//                 <span className="text-gray-500 px-1">debate</span>
//               </div>

//               {showDebatePopup && (
//                 <DebateCardPopup
//                  debateTopic={inputText}
//                   onClose={() => setShowDebatePopup(false)}
//                   onStart={handleStartDebate}
//                 />
//               )}

//               {/* Arrow Button */}
//               <div className="ml-auto">
//                 <button
//                   ref={buttonRef}
//                   className="rounded-full bg-black p-2 hover:scale-110 transition-transform duration-200 ease-in-out"
//                   onClick={handleSendMessage}
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="16"
//                     height="16"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="white"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <path d="M12 19V5" />
//                     <path d="M5 12l7-7 7 7" />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
