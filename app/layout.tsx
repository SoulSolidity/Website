import { MainNav } from "@/components/main-nav";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import "./globals.css";
import { fontSans, fontMono } from "@/lib/fonts";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteFooter } from "@/components/site-footer";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://soulsolidity.com'),
  title: "Soul Solidity | DeFi Development Lab",
  description: "We are a developer lab with a passion for Solidity, dedicated to building simple, secure, and robust decentralized systems.",
  keywords: [
    "Solidity",
    "DeFi",
    "Blockchain",
    "Smart Contracts",
    "Web3",
    "Ethereum",
    "Development",
  ],
  authors: [
    {
      name: "Soul Solidity",
      url: "https://soulsolidity.com",
    },
  ],
  creator: "Soul Solidity",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://soulsolidity.com",
    title: "Soul Solidity | DeFi Development Lab",
    description: "Building secure and innovative DeFi solutions",
    siteName: "Soul Solidity",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soul Solidity | DeFi Development Lab",
    description: "Building secure and innovative DeFi solutions",
    creator: "@soulsolidity",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="!scroll-smooth">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontMono.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <MainNav />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
          <Toaster />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
