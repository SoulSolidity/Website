import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

interface DexCardProps {
    name: string;
    className?: string;
}

export function DexCard({ name, className }: DexCardProps) {
    const [imgSrc, setImgSrc] = useState(`https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/dexes/${name}.png`);

    return (
        <div className={cn("flex flex-col items-center gap-2", className)}>
            <div className="w-16 h-16 rounded-full overflow-hidden bg-background/80 backdrop-blur-sm">
                <Image
                    src={imgSrc}
                    alt={name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                    onError={() => setImgSrc("https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/default.png")}
                />
            </div>
            <span className="font-medium text-sm">{name}</span>
        </div>
    );
} 