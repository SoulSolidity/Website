"use client";

import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { Check, X, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Companies } from "@/components/social-proof";
import PriceBackground from "./components/PriceBackground";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import ErrorBoundary from "@/components/error-boundary";

// TODO: Need to implement
import { useDexData } from "./hooks/use-dex-data";

const supportedChains = [
    { name: "Ethereum", logo: "/logos/ethereum.svg" },
    { name: "MATIC", logo: "/logos/polygon.svg" },
    { name: "BSC", logo: "/logos/binance.svg" },
    { name: "ARBITRUM", logo: "/logos/arbitrum.svg" },
    { name: "LINEA", logo: "/logos/linea.svg" },
    { name: "LIGHTLINK", logo: "/logos/lightlink.svg" },
    { name: "IOTA", logo: "/logos/iota.svg" },
    { name: "BASE", logo: "/logos/base.svg" },
    { name: "GRAPHLINQ", logo: "/logos/graphlinq.svg" },
    { name: "AVAX", logo: "/logos/avalanche.svg" },
    { name: "BLAST", logo: "/logos/blast.svg" },
];

const comparisonFeatures = [
    {
        feature: "Real-time Price Updates",
        soulSolidity: true,
        coingecko: false,
        dexscreener: true,
    },
    {
        feature: "Historical Price Data",
        soulSolidity: true,
        coingecko: true,
        dexscreener: false,
    },
    {
        feature: "LP Analytics",
        soulSolidity: true,
        coingecko: false,
        dexscreener: true,
    },
    {
        feature: "Cross-Chain Support",
        soulSolidity: true,
        coingecko: false,
        dexscreener: true,
    },
    {
        feature: "WebSocket Support",
        soulSolidity: true,
        coingecko: false,
        dexscreener: false,
    },
    {
        feature: "Custom Rate Limits",
        soulSolidity: true,
        coingecko: false,
        dexscreener: false,
    },
    {
        feature: "Free Public API",
        soulSolidity: true,
        coingecko: true,
        dexscreener: true,
    },
    {
        feature: "Multi-DEX Support",
        soulSolidity: true,
        coingecko: false,
        dexscreener: true,
    },
];

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
};

const fadeInUpDelayed = (delay: number) => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay },
    },
});

// Enums replaced with maps as per TypeScript guidelines
const PROTOCOL_TYPES = {
    UNIV2: 0,
    UNIV3: 1,
    ALGEBRA: 3,
    ALGEBRA_INTEGRAL: 4,
    SOLIDLY: 5,
    CURVE: 6,
} as const;

interface DexProtocol {
    name: string;
    factory: string;
    router?: string;
    protocol: (typeof PROTOCOL_TYPES)[keyof typeof PROTOCOL_TYPES];
}

interface DexFactories {
    dexFactories: Record<string, DexProtocol[]>;
}

interface Chain {
    id: number;
    name: string;
    logo: string;
}

interface Token {
    name: string;
    symbol: string;
    address: string;
    chainId: number;
    icon: string;
}

const SUPPORTED_CHAINS: Chain[] = [
    { id: 8453, name: "Base", logo: "/logos/base.svg" },
    { id: 1, name: "Ethereum", logo: "/logos/ethereum.svg" },
    { id: 137, name: "Polygon", logo: "/logos/polygon.svg" },
    { id: 56, name: "BSC", logo: "/logos/binance.svg" },
    { id: 42161, name: "Arbitrum", logo: "/logos/arbitrum.svg" },
];

const POPULAR_TOKENS: Token[] = [
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

// DexCard component for reusability
const DexCard: React.FC<{ name: string; className?: string }> = ({ name, className }) => (
    <Card className={cn("p-4 flex items-center justify-center space-x-3 hover:border-primary transition-colors bg-background/80 backdrop-blur-sm", className)}>
        <Image
            src={`/logos/dex/${name.toLowerCase()}.svg`}
            alt={name}
            width={24}
            height={24}
            className="w-6 h-6"
            onError={(e) => {
                // @ts-ignore - TypeScript doesn't know about the currentTarget property
                e.currentTarget.src = '/logos/dex/generic.svg';
            }}
        />
        <span className="font-medium">{name}</span>
    </Card>
);

// Lazy load components for better performance
const HeroSection = lazy(() => import("@/app/pricing/components/hero-section"));
const SupportedDexesSection = lazy(() => import("@/app/pricing/components/supported-dexes-section"));
const SupportedChainsSection = lazy(() => import("@/app/pricing/components/supported-chains-section"));
const ComparisonSection = lazy(() => import("@/app/pricing/components/comparison-section"));
const PlaygroundSection = lazy(() => import("@/app/pricing/components/playground-section"));
const CTASection = lazy(() => import("@/app/pricing/components/cta-section"));

// Loading fallback component
const SectionSkeleton = () => (
    <div className="w-full h-[50vh] animate-pulse bg-accent/10 rounded-lg" />
);

export default function PricingPage() {
    return (
        <>
            <PriceBackground />
            <ErrorBoundary>
                <Suspense fallback={<SectionSkeleton />}>
                    <HeroSection />
                </Suspense>
            </ErrorBoundary>
            
            <ErrorBoundary>
                <Suspense fallback={<SectionSkeleton />}>
                    <SupportedChainsSection />
                </Suspense>
            </ErrorBoundary>
            
            <ErrorBoundary>
                <Suspense fallback={<SectionSkeleton />}>
                    <SupportedDexesSection />
                </Suspense>
            </ErrorBoundary>
            
            <ErrorBoundary
                onError={(error) => {
                    console.error("PlaygroundSection error:", error);
                }}
                fallback={
                    <div className="py-20 bg-accent/10">
                        <div className="container max-w-4xl">
                            <div className="text-center space-y-4 mb-12">
                                <h2 className="text-3xl font-bold">Try It Out</h2>
                                <p className="text-muted-foreground">
                                    This section is temporarily unavailable. We're working on it!
                                </p>
                            </div>
                        </div>
                    </div>
                }
            >
                <Suspense fallback={<SectionSkeleton />}>
                    <PlaygroundSection />
                </Suspense>
            </ErrorBoundary>
            
            <ErrorBoundary>
                <Suspense fallback={<SectionSkeleton />}>
                    <CTASection />
                </Suspense>
            </ErrorBoundary>
        </>
    );
}
