"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, X, Copy, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { fadeInUp } from "../lib/constants";
import { usePlaygroundData } from "../hooks/use-playground-data";
import { useChainData } from "../hooks/use-chain-data";

export default function PlaygroundSection() {
    const { playgroundTokens, isLoading: isLoadingTokens } = usePlaygroundData();
    const { chainData, isLoading: isLoadingChains } = useChainData();
    const [selectedChain, setSelectedChain] = useState<number>(8453);
    const [tokenAddress, setTokenAddress] = useState<string>("");
    const [customPrice, setCustomPrice] = useState<number | null>(null);
    const [isLoadingCustom, setIsLoadingCustom] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [tokenInfo, setTokenInfo] = useState<{ name: string; symbol: string } | null>(null);
    const [isCopied, setIsCopied] = useState(false);
    const [isCustomToken, setIsCustomToken] = useState(false);

    // Filter tokens based on selected chain
    const filteredTokens = playgroundTokens.filter(token => token.chainId === selectedChain);

    // Update token selection when chain changes
    useEffect(() => {
        if (filteredTokens.length > 0 && !isCustomToken) {
            const defaultToken = filteredTokens[0];
            setTokenAddress(defaultToken.address);
            fetchCustomPrice(defaultToken.address, selectedChain);
        } else if (!isCustomToken) {
            setTokenAddress("");
            setCustomPrice(null);
            setTokenInfo(null);
        }
    }, [selectedChain, filteredTokens.length, isCustomToken]);

    const fetchCustomPrice = async (address: string, chainId: number) => {
        setIsLoadingCustom(true);
        setError(null);
        setTokenInfo(null);
        setCustomPrice(null);
        try {
            const response = await fetch(
                `https://price-getter-api-ee68578946e6.herokuapp.com/price?tokenAddress=${address}&chainId=${chainId}`
            );
            const data = await response.json();
            if (data.error) {
                setError(data.error);
                setCustomPrice(null);
            } else {
                setCustomPrice(Number(data.price));
                setTokenInfo({
                    name: data.name || "Unknown Token",
                    symbol: data.symbol || "???"
                });
            }
        } catch (error) {
            setError("Failed to fetch price. Please try again.");
            setCustomPrice(null);
        } finally {
            setIsLoadingCustom(false);
        }
    };

    const handleTokenSelect = (token: typeof playgroundTokens[0]) => {
        setIsCustomToken(false);
        setTokenAddress(token.address);
        fetchCustomPrice(token.address, selectedChain);
    };

    const handleCustomTokenSubmit = () => {
        if (!tokenAddress) return;
        setIsCustomToken(true);
        fetchCustomPrice(tokenAddress, selectedChain);
    };

    console.log("Filtered tokens:", filteredTokens.filter(token => token.isLp));

    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="py-20 bg-accent/10"
            id="try-it-out"
        >
            <div className="container max-w-4xl">
                <div className="text-center space-y-4 mb-12">
                    <h2 className="text-3xl font-bold">Try It Out</h2>
                </div>

                <Card className="p-8">
                    <div className="space-y-8">
                        {/* Chain Selection */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">1. Select Chain</h3>
                            <Select
                                value={selectedChain.toString()}
                                onValueChange={(value: string) => {
                                    setSelectedChain(Number(value));
                                    setIsCustomToken(false);
                                }}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select chain" />
                                </SelectTrigger>
                                <SelectContent>
                                    {chainData.map((chain) => (
                                        <SelectItem key={chain.name} value={chain.chainId.toString()}>
                                            <div className="flex items-center gap-2">
                                                <img
                                                    src={`https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/chains/${chain.image}`}
                                                    alt={chain.name}
                                                    className="size-4"
                                                    onError={(e) => {
                                                        e.currentTarget.src = '/logos/generic-chain.svg';
                                                    }}
                                                />
                                                {chain.name}
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Token Selection */}
                        <div className="space-y-5">
                            <h3 className="text-lg font-semibold">2. Select Token or LP</h3>
                            {isLoadingTokens ? (
                                <div className="text-center py-4 text-muted-foreground">
                                    <div className="size-6 border-2 border-current border-r-transparent rounded-full animate-spin mx-auto mb-2" />
                                    Loading tokens...
                                </div>
                            ) : filteredTokens.length > 0 ? (
                                <div className="flex gap-5 flex-wrap">
                                    {filteredTokens.map((token) => (
                                        <Button
                                            key={token.address}
                                            variant="outline"
                                            size="icon"
                                            className={`size-12 p-0 rounded-full relative transition-all ${
                                                tokenAddress === token.address && !isCustomToken 
                                                ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-110 shadow-lg" 
                                                : "hover:scale-105"
                                            }`}
                                            onClick={() => handleTokenSelect(token)}
                                            title={token.name}
                                        >
                                            <img
                                                src={token.icon}
                                                alt={token.name}
                                                className="size-full rounded-full"
                                                onError={(e) => {
                                                    e.currentTarget.src = '/logos/generic-token.svg';
                                                }}
                                            />
                                            {token.lpIcons && (
                                                <div className="absolute -bottom-2 -right-2 flex">
                                                    {token.lpIcons.map((icon, index) => (
                                                        <img
                                                            key={index}
                                                            src={icon}
                                                            alt={`${token.name} LP token ${index + 1}`}
                                                            className={`size-6 rounded-full border-2 border-background ${index > 0 ? '-ml-3' : ''}`}
                                                            onError={(e) => {
                                                                e.currentTarget.src = '/logos/generic-token.svg';
                                                            }}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </Button>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-4 text-muted-foreground">
                                    No tokens available for this chain
                                </div>
                            )}

                            {/* Custom Token Input */}
                            <div className="mt-6 pt-6 border-t">
                                <h4 className="text-sm font-medium mb-4">Or enter custom token address</h4>
                                <div className="flex gap-4">
                                    <div className="relative flex-1">
                                        <Input
                                            placeholder="Enter token address"
                                            value={tokenAddress}
                                            onChange={(e) => setTokenAddress(e.target.value)}
                                            className="pr-24"
                                        />
                                        <Button
                                            onClick={handleCustomTokenSubmit}
                                            disabled={!tokenAddress || isLoadingCustom}
                                            className="absolute right-0 top-0 h-full rounded-l-none"
                                        >
                                            {isLoadingCustom ? (
                                                <div className="size-4 border-2 border-current border-r-transparent rounded-full animate-spin" />
                                            ) : (
                                                <>
                                                    <Search className="size-4 mr-2" />
                                                    Get Price
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Result Display */}
                        <div className="p-6 rounded-lg bg-muted/50">
                            {error ? (
                                <div className="text-destructive flex items-center gap-2">
                                    <X className="size-4" />
                                    {error}
                                </div>
                            ) : (
                                (isLoadingCustom) ? (
                                    <div className="space-y-4 min-h-[88px]">
                                        <div className="flex items-center gap-2 h-7">
                                            <span className="text-sm text-muted-foreground">Token Info:</span>
                                            <div className="h-6 w-40 animate-pulse rounded bg-muted" />
                                        </div>
                                        <div className="flex items-center gap-2 h-9">
                                            <span className="text-sm text-muted-foreground">Price:</span>
                                            <div className="h-8 w-40 animate-pulse rounded bg-muted" />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4 min-h-[88px]">
                                        <div className="flex items-center gap-2 h-7">
                                            <span className="text-sm text-muted-foreground">Token Info:</span>
                                            <span className="font-medium">
                                                {tokenInfo?.name} {tokenInfo?.symbol ? `(${tokenInfo.symbol})` : ''}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 h-9">
                                            <span className="text-sm text-muted-foreground">Price:</span>
                                            <span className="font-medium text-2xl">
                                                ${typeof customPrice === 'number' ? customPrice.toFixed(6) : '0.00'}
                                            </span>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>

                        {/* API URL Display */}
                        {tokenAddress && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 rounded-lg bg-muted/50 font-mono text-sm"
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <div className="overflow-x-auto">
                                        <span className="text-muted-foreground">GET </span>
                                        <span className="text-primary">
                                            https://price-getter-api-ee68578946e6.herokuapp.com/price?tokenAddress={tokenAddress}&chainId={selectedChain}
                                        </span>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                            navigator.clipboard.writeText(
                                                `https://price-getter-api-ee68578946e6.herokuapp.com/price?tokenAddress=${tokenAddress}&chainId=${selectedChain}`
                                            );
                                            setIsCopied(true);
                                            setTimeout(() => setIsCopied(false), 2000);
                                        }}
                                        className="shrink-0 gap-2"
                                    >
                                        {isCopied ? (
                                            <>
                                                <Check className="size-4" />
                                                Copied!
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="size-4" />
                                                Copy URL
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </Card>
            </div>
        </motion.section>
    );
} 