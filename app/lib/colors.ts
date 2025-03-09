// Product brand colors
export const PRODUCT_COLORS = {
    ZAP: "#FFD700",      // Modern yellow
    PRICE_API: "#4CAF50", // Green
    UPTICKR: "#2196F3",   // Blue
    CUSTOM: "#9C27B0"     // Purple
} as const;

// Color with opacity (hex to rgba)
export function withOpacity(color: string, opacity: number): string {
    // Convert hex to RGB
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
} 