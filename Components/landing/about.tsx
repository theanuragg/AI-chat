"use client";

import { useState, useRef, useEffect } from "react";

interface DebateCardPopupProps {
  onClose: () => void;
  onStart: () => void;
}

export default function DebateCardPopup({ onClose }: DebateCardPopupProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

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

    const handleMouseUp = () => setIsDragging(false);

    if (cardElement) {
      const handleMouseDown = (e: MouseEvent) => {
        setIsDragging(true);
        setOffset({
          x: e.clientX - position.x,
          y: e.clientY - position.y,
        });
      };

      cardElement.addEventListener("mousedown", handleMouseDown);
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      if (cardElement)
        cardElement.removeEventListener("mousedown", handleMouseMove);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
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

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={cardRef}
        style={{
          position: "absolute",
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
        className="bg-white rounded-lg p-6 w-96 max-w-full shadow-lg border border-gray-200"
      >
        <h2
          className="abezee-text text-start mb-4"
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
        >
          About
        </h2>

        <p className="text-sm text-gray-600 mb-6">
          This card is about the assignment I got for an internship, where I
          have to build a chat interface using Gemini.
        </p>

        <div className="flex justify-between gap-4">
          <button
            onClick={onClose}
            className="flex-1 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => alert("working on it")}
            className="flex-1 py-2 bg-black text-white rounded-md cursor-cell transition"
          >
            Start Chat
          </button>
        </div>
      </div>
    </div>
  );
}
