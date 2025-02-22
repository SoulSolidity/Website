"use client";

import { Suspense, lazy } from "react";

// Lazy load hero section component
const HeroSection = lazy(() => import("./components/hero-section"));

// Loading fallback component
const SectionSkeleton = () => (
    <div className="w-full h-[50vh] animate-pulse bg-accent/10 rounded-lg" />
);

export default function ComingSoonPage() {
    return (
        <Suspense fallback={<SectionSkeleton />}>
            <HeroSection />
        </Suspense>
    );
}
