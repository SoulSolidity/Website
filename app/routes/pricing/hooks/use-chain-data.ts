import { useEffect, useState } from "react";

interface ChainData {
    name: string;
    image: string;
    chainId: number;
}

export function useChainData() {
    const [chainData, setChainData] = useState<ChainData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchChainData = async () => {
            try {
                const response = await fetch('https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/data/constants/constants.json');
                const data = await response.json();
                setChainData(data.priceGetterSupportedChainsImages);
            } catch (err) {
                setError('Failed to fetch chain data');
                console.error('Failed to fetch chain data:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchChainData();
    }, []);

    return {
        chainData,
        isLoading,
        error
    };
} 