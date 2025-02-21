import { cn } from "@/lib/utils";

interface DexCardProps {
    name: string;
    className?: string;
}

export function DexCard({ name, className }: DexCardProps) {
    return (
        <div className={cn("flex flex-col items-center gap-2", className)}>
            <div className="w-16 h-16 rounded-full overflow-hidden bg-background/80 backdrop-blur-sm">
                <img
                    src={`https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/dexes/${name}.png`}
                    alt={name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.currentTarget.src = 'https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/default.png';
                    }}
                />
            </div>
            <span className="font-medium text-sm">{name}</span>
        </div>
    );
} 