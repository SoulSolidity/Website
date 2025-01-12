"use client";

import { Boxes } from "@/components/ui/background-boxes";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { Footerdemo } from "@/components/ui/footer-section";
import { TimelineDemo } from "@/components/TimelineDemo/TimelineDemo";
import { Waves } from "@/components/ui/waves-background";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { LogoCarouselDemo } from "@/components/logo-carousel/logo-carousel";
import { Header1 } from "@/components/ui/header";
import Footer7 from "@/components/Footer/Footer";
import Hero from "@/components/Hero/Hero";

export default function Home() {
  return (
    <div className="">
      <Header1 />
      <main className="mx-10">
        <div className="z-10">
          <Hero />
        </div>
        {/* <div className="absolute inset-0 -z-10">
          <Waves
            lineColor={"rgba(100, 100, 100, 0.2)"}
            backgroundColor="transparent"
            waveSpeedX={0.02}
            waveSpeedY={0.01}
            waveAmpX={40}
            waveAmpY={20}
            friction={0.9}
            tension={0.01}
            maxCursorMove={120}
            xGap={12}
            yGap={36}
          />
        </div> */}
        <TimelineDemo />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <Footerdemo />
        <Footer7 />
      </footer>
    </div>
  );
}
