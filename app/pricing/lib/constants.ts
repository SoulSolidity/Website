export const PROTOCOL_TYPES = {
    UNIV2: 0,
    UNIV3: 1,
    ALGEBRA: 3,
    ALGEBRA_INTEGRAL: 4,
    SOLIDLY: 5,
    CURVE: 6,
} as const;

export const comparisonFeatures = [
    {
        feature: "Support for any and every token",
        soulSolidity: true,
        coingecko: false,
        dexscreener: false,
    },
    {
        feature: "LP price support",
        soulSolidity: true,
        coingecko: false,
        dexscreener: false,
    },
];

export const POPULAR_TOKENS = [
    {
        name: "Coinbase Wrapped BTC",
        symbol: "cbBTC",
        address: "0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf",
        chainId: 8453,
        icon: "/logos/bitcoin.svg"
    },
    {
        name: "Wrapped Ethereum",
        symbol: "WETH",
        address: "0x940181a94A35A4569E4529A3CDfB74e38FD98631",
        chainId: 8453,
        icon: "/logos/ethereum.svg"
    },
    {
        name: "USD Coin",
        symbol: "USDC",
        address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
        chainId: 8453,
        icon: "/logos/usdc.svg"
    }
];

export interface DexProtocol {
    name: string;
    factory: string;
    router?: string;
    hideImage?: boolean;
    protocol: (typeof PROTOCOL_TYPES)[keyof typeof PROTOCOL_TYPES];
}

export type DexFactories = Record<string, DexProtocol[]>;

export interface Chain {
    id: number;
    name: string;
    logo: string;
}

export interface Token {
    name: string;
    symbol: string;
    address: string;
    chainId: number;
    icon: string;
}

export const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
};

export const fadeInUpDelayed = (delay: number) => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay },
    },
}); 