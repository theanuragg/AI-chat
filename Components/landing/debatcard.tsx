'use client';

import { useState, useRef, useEffect } from 'react';
// import { debate } from '../../action/debate';


interface DebateCardPopupProps {
  onClose: () => void;
  onStart: (leftParty: string, rightParty: string, topic: string) => void;
  debateTopic: string; // Accept the debate topic as a prop
}

export default function DebateCardPopup({ onClose }: DebateCardPopupProps) {
  const availableModels = [
    "llama8b", "mistral", "gemma", "llama70b", "qwen", "scout",
  ];

  const [leftParty, setLeftParty] = useState(availableModels[0]);
  const [rightParty, setRightParty] = useState(availableModels[1]);

  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  // const [winnerData, setWinnerData] = useState<{
  //   winner: string | null;
  //   score: number | null;
  //   loserScore: number | null;
  //   reasoning: string | null;
  //   highlights: string[];
  // } | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  // Setup drag event listeners
  useEffect(() => {
    const cardElement = cardRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - offset.x,
          y: e.clientY - offset.y,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (cardElement) {
      const handleMouseDown = (e: MouseEvent) => {
        setIsDragging(true);
        setOffset({
          x: e.clientX - position.x,
          y: e.clientY - position.y,
        });
      };

      cardElement.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      if (cardElement) {
        cardElement.removeEventListener('mousedown', handleMouseMove);
      }
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, offset, position]);

  useEffect(() => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setPosition({
        x: (window.innerWidth - rect.width) / 2,
        y: (window.innerHeight - rect.height) / 2,
      });
    }
  }, []);

  // const handleCreateDebate = async (event: React.FormEvent) => {
  //   event.preventDefault();
  //   setLeftParty(leftParty);
  //   setRightParty(rightParty);

  //   try {
  //     // Initiate the debate with the new arguments
  //     const response = await debate(leftParty, rightParty, debateTopic, 3); // Use the passed topic here
    
  //     // After the debate is created, process the response
  //     debate(leftParty, rightParty, debateTopic, 3);
    
  //     const judgement = response.judgement;
    
  //     const winnerMatch = judgement.match(/WINNER: ([^\n]+)/);
  //     const scoreMatch = judgement.match(/SCORE: ([0-9]+) - ([0-9]+)/);
  //     const reasoningMatch = judgement.match(/ (.+)$/s);
    
  //     const winner = winnerMatch ? winnerMatch[1].trim() : null;
  //     const loserScore = scoreMatch ? parseInt(scoreMatch[1]) : null;
  //     const winnerScore = scoreMatch ? parseInt(scoreMatch[2]) : null;
  //     const reasoning = reasoningMatch ? reasoningMatch[1].trim() : null;
    
  //     let highlights = [];
  //     if (reasoning) {
  //       const sentences = reasoning.split(". ");
  //       highlights = sentences
  //         .filter(
  //           (s: string) =>
  //             s.includes("demonstrated") ||
  //             s.includes("showcased") ||
  //             s.includes("effectively") ||
  //             s.includes("strong") ||
  //             s.includes("creative") ||
  //             s.includes("confident")
  //         )
  //         .slice(0, 3)
  //         .map((s: string) => s.trim() + (s.endsWith(".") ? "" : "."));
    
  //       // If we couldn't extract enough highlights, adding some generic ones
  //       if (highlights.length < 2) {
  //         highlights = [
  //           `${winner} demonstrated superior debating skills.`,
  //           `${winner} presented more compelling arguments.`,
  //           `${winner} showed better engagement with the topic.`,
  //         ];
  //       }
  //     }
    
  //     // Set the winner data to the state
  //     setWinnerData({
  //       winner,
  //       score: winnerScore,
  //       loserScore,
  //       reasoning,
  //       highlights,
  //     });
    
  //     // If the response contains an ID, set it as the battle ID
  //     // if (response.id) {
  //     //   setBattleId(response.id);
  //     // }
  //   } catch (error: unknown) {
  //     console.error("Error creating debate:", error);
  //   }
    
  // };

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={cardRef}
        style={{ position: 'absolute', left: `${position.x}px`, top: `${position.y}px` }}
        className="bg-white rounded-lg p-6 w-96 max-w-full shadow-lg border border-gray-200"
      >
        <h2 className="abezee-text text-start mb-6" style={{ cursor: isDragging ? 'grabbing' : 'grab' }}>
          Have a debate
        </h2>

        <div className="flex items-center justify-between mb-8">
          <div className="w-32">
            <select
              name="leftParty"
              value={leftParty}
              onChange={(e) => setLeftParty(e.target.value)}
              className="w-full px-3 py-2 bg-gray-100 rounded-md focus:outline-none"
            >
              {availableModels.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col items-center">
            <span className="bagel-fat-one mb-1">Vs</span>
          </div>

          <div className="w-32">
            <select
              name="rightParty"
              value={rightParty}
              onChange={(e) => setRightParty(e.target.value)}
              className="w-full px-3 py-2 bg-gray-100 rounded-md focus:outline-none"
            >
              {availableModels.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-between gap-4">
          <button onClick={onClose} className="flex-1 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition">
            Cancel
          </button>
          <button onClick={() => {alert('working on it')}} className="flex-1 py-2 bg-black text-white rounded-md cursor-cell transition">
            Start Debate
          </button>
        </div>
      </div>
    </div>
  );
}
// function setBattleId(id: any) {
//   throw new Error('Function not implemented.');
// }

