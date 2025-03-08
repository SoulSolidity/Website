"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface GoldChromeButtonProps {
  text?: string;
  href?: string;
  className?: string;
}

// Main component
export const GoldChromeButton = ({ 
  text = "Soul Solidity", 
  href = "/",
  className = ""
}: GoldChromeButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  
  const handleClick = () => {
    router.push(href);
  };

  return (
    <div 
      className={`relative cursor-pointer transition-all duration-300 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      title={text}
    >
      <div 
        className={`px-4 py-2 rounded-md text-lg font-bold text-black transition-all duration-300 ${
          isHovered ? 'scale-105' : ''
        }`}
        style={{
          backgroundImage: `linear-gradient(135deg, 
            #F0C419 0%, 
            #FFD700 20%, 
            #FFF0A0 30%, 
            #FFD700 40%, 
            #E6B400 60%, 
            #FFD700 80%, 
            #F0C419 100%)`,
          backgroundSize: isHovered ? '200% 200%' : '100% 100%',
          backgroundPosition: isHovered ? 'right bottom' : 'left top',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          textShadow: '0 1px 1px rgba(0,0,0,0.1)',
          border: '1px solid rgba(255,215,0,0.3)',
          boxShadow: isHovered 
            ? '0 10px 20px rgba(255, 215, 0, 0.3), 0 0 15px rgba(255, 215, 0, 0.5), inset 0 0 10px rgba(255,255,255,0.5)' 
            : '0 5px 15px rgba(255, 215, 0, 0.2), inset 0 0 5px rgba(255,255,255,0.3)',
        }}
      >
        {text}
      </div>
      
      {/* Add a shimmer effect overlay */}
      {isHovered && (
        <div 
          className="absolute inset-0 pointer-events-none rounded-md"
          style={{
            background: 'linear-gradient(45deg, rgba(255,215,0,0) 0%, rgba(255,215,0,0.5) 50%, rgba(255,215,0,0) 100%)',
            backgroundSize: '200% 200%',
            animation: 'shimmer 1.5s infinite',
            opacity: 0.6,
          }}
        />
      )}
      
      {/* Add keyframes for shimmer animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -100% -100%;
          }
          100% {
            background-position: 100% 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default GoldChromeButton;
