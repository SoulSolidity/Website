"use client";

import { Suspense, lazy } from "react";
import { Card } from "@/components/ui/card";
import { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

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
const HeroSection = lazy(() => import("@/app/hire-us/components/hero-section"));
const CTASection = lazy(() => import("@/app/_pagetemplate/components/cta-section"));

// Loading fallback component
const SectionSkeleton = () => (
    <div className="w-full h-[50vh] animate-pulse bg-accent/10 rounded-lg" />
);

export default function HireUsPage() {
    return (
        <>
            <Suspense fallback={<SectionSkeleton />}>
                <HeroSection />
            </Suspense>
        </>
    );
}
