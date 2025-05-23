'use client'

import React from "react";
import DOMPurify from "dompurify";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface ResponseFormatterProps {
  content: string;
}

const ResponseFormatter: React.FC<ResponseFormatterProps> = ({ content }) => {
  // Process the content to identify code blocks
  const processContent = (rawContent: string) => {
    // First, sanitize the HTML
    const sanitizedContent = DOMPurify.sanitize(rawContent);
    
    // Parse code blocks inside <code> tags
    const codeBlockRegex = /<code>([\s\S]*?)<\/code>/g;
    let lastIndex = 0;
    const parts = [];
    let match;

    while ((match = codeBlockRegex.exec(sanitizedContent)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        const textBeforeCode = sanitizedContent.substring(lastIndex, match.index);
        parts.push({ type: "text", content: textBeforeCode });
      }

      // Add code block
      parts.push({ type: "code", content: match[1].trim() });
      lastIndex = match.index + match[0].length;
    }

    // Add remaining text after last code block (if any)
    if (lastIndex < sanitizedContent.length) {
      const textAfterLastCode = sanitizedContent.substring(lastIndex);
      parts.push({ type: "text", content: textAfterLastCode });
    }

    return parts;
  };

  const contentParts = processContent(content);

  return (
    <div className="formatted-response">
      {contentParts.map((part, index) => {
        if (part.type === "code") {
          return (
            <SyntaxHighlighter 
              key={index} 
              language="javascript" 
              style={atomDark}
              className="rounded-md my-2"
            >
              {part.content}
            </SyntaxHighlighter>
          );
        } else {
          return (
            <div 
              key={index} 
              className="text-content" 
              dangerouslySetInnerHTML={{ __html: part.content }}
            />
          );
        }
      })}
    </div>
  );
};

export default ResponseFormatter;