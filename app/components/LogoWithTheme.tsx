import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

// Component to handle theme-based logo switching
export function LogoWithTheme() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
  
    // After mounting, we can safely show the theme-dependent content
    useEffect(() => {
      setMounted(true);
    }, []);
  
    if (!mounted) {
      // Return a placeholder or nothing during SSR to avoid hydration mismatch
      return (
        <div className="w-full h-[100px] flex items-center justify-center">
          {/* Placeholder while loading */}
        </div>
      );
    }
  
    return (
      <img 
        src={theme === "light" ? "/Color logo - no background.svg" : "/White logo - no background.svg"}
        alt="Soul Solidity Logo"
        className="w-full h-auto"
      />
    );
  }