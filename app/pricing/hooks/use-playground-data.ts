import { useEffect, useState } from "react";

interface PlaygroundToken {
    name: string;
    address: string;
    chainId: number;
    icon: string;
    isLp: boolean;
    lpIcons: string[];
}

export function usePlaygroundData() {
    const [playgroundTokens, setPlaygroundTokens] = useState<PlaygroundToken[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPlaygroundData = async () => {
            try {
                const response = await fetch('https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/data/constants/constants.json');
                const data = await response.json();
                setPlaygroundTokens(data.priceGetterPlaygroundTokens);
            } catch (err) {
                setError('Failed to fetch playground data');
                console.error('Failed to fetch playground data:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPlaygroundData();
    }, []);

    return {
        playgroundTokens,
        isLoading,
        error
    };
} 