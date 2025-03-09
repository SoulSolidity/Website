import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

interface DexCardProps {
    name: string;
    className?: string;
}

export function DexCard({ name, className }: DexCardProps) {
    // Ensure name is a valid string
    const displayName = typeof name === 'string' ? name : 'Unknown DEX';

    // Create a local fallback image path
    const fallbackImage = "/logos/generic-dex-pricing.svg";

    const [imgSrc, setImgSrc] = useState(() => {
        if(typeof name !== 'string') return fallbackImage;
        return `https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/dexes/${name}.png`;
    });


    return (
        <div className={cn("flex flex-col items-center gap-2", className)}>
            <div className="w-16 h-16 rounded-full overflow-hidden bg-background/80 backdrop-blur-sm">
                <Image
                    src={imgSrc}
                    alt={displayName}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                    onError={() => setImgSrc(fallbackImage)}
                />
            </div>
            <span className="font-medium text-sm">{displayName}</span>
        </div>
    );
}
