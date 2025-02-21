import { useEffect, useState, useCallback } from "react";
import { DexFactories, DexProtocol } from "../lib/constants";

export function useDexData() {
    const [dexData, setDexData] = useState<DexFactories | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDexData = async () => {
            try {
                const response = await fetch('https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/data/constants/dex.json');
                const data = await response.json();
                setDexData(data);
            } catch (err) {
                setError('Failed to fetch DEX data');
                console.error('Failed to fetch DEX data:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDexData();
    }, []);

    const getUniqueDexes = useCallback(() => {
        if (!dexData) return new Set<string>();
        
        const uniqueDexes = new Set<string>();
        Object.values(dexData.dexFactories).forEach((chainDexes) => {
            chainDexes.forEach((dex) => uniqueDexes.add(dex.name));
        });
        return new Set(Array.from(uniqueDexes).sort());
    }, [dexData]);

    const getFeaturedDexes = useCallback(() => {
        if (!dexData) return [];
        
        const uniqueDexMap = new Map<string, DexProtocol>();
        Object.values(dexData.dexFactories).forEach((chainDexes) => {
            chainDexes.forEach((dex) => {
                if (!uniqueDexMap.has(dex.name)) {
                    uniqueDexMap.set(dex.name, dex);
                }
            });
        });
        
        return Array.from(uniqueDexMap.values())
            .sort((a, b) => a.name.localeCompare(b.name));
    }, [dexData]);

    return {
        dexData,
        isLoading,
        error,
        getUniqueDexes,
        getFeaturedDexes,
    };
} 