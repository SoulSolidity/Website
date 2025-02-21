import {
    JetBrains_Mono as FontMono,
    Inter as FontSans,
  } from "next/font/google";
  
  export const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
    display: "swap",
    fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
    preload: true,
    weight: ["400", "500", "600", "700"],
  });
  
  export const fontMono = FontMono({
    subsets: ["latin"],
    variable: "--font-mono",
    display: "swap",
    fallback: ["Consolas", "Monaco", "Lucida Console", "Liberation Mono", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Courier New", "monospace"],
    preload: true,
  });