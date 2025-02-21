"use client";

import * as React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";
import { ModeToggle } from "./toggle";

const products = [
  {
    title: "⚡ Zap",
    href: "/zap",
    description: "Simplify your crypto transactions with our powerful Zap tool.",
  },
  {
    title: "💰 Pricing",
    href: "/pricing",
    description: "Get real-time price data from multiple DEXs across different chains",
  },
  {
    title: "📈 UpTickr",
    href: "/uptickr",
    description: "Advanced DeFi analytics and tracking platform (Coming soon).",
  },
  {
    title: "🛠️ Custom Software",
    href: "/custom",
    description: "Tailored blockchain solutions and smart contract development for your specific needs.",
  },
];

const navVariants: Variants = {
  hidden: { y: -100 },
  visible: {
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2
    }
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2
    }
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1
    }
  }
};

export function MainNav() {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        "fixed top-0 left-0 right-0 z-50 border-b transition-all duration-200",
        isScrolled
          ? "bg-background/80 backdrop-blur-lg shadow-sm"
          : "bg-transparent border-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <Icons.logo className="h-6 w-6" />
            <span className="font-bold hidden sm:block">Soul Solidity</span>
          </Link>

          <NavigationMenu className="hidden md:block">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    "bg-transparent",
                    isScrolled ? "" : "text-foreground"
                  )}
                >
                  Products
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4">
                    {products.map((product) => (
                      <motion.li
                        key={product.title}
                        variants={itemVariants}
                        initial="visible"
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <NavigationMenuLink asChild>
                          <a
                            href={product.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{product.title}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {product.description}
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </motion.li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/#about" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                      isScrolled ? "" : "text-foreground"
                    )}
                  >
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-4">
          <ModeToggle />
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
          >
            <Button
              asChild
              variant="outline"
              size="sm"
              className="hidden md:inline-flex"
            >
              <Link href="/#contact">Contact Us</Link>
            </Button>
          </motion.div>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4">
                <Link
                  href="/"
                  className="flex items-center gap-2 py-2"
                >
                  <Icons.logo className="h-6 w-6" />
                  <span className="font-bold">Soul Solidity</span>
                </Link>
                <div className="flex flex-col gap-2">
                  <h4 className="font-medium">Products</h4>
                  {products.map((product) => (
                    <Link
                      key={product.title}
                      href={product.href}
                      className="text-muted-foreground hover:text-foreground transition-colors py-2"
                    >
                      {product.title}
                    </Link>
                  ))}
                </div>
                <Link
                  href="/#features"
                  className="text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  Features
                </Link>
                <Link
                  href="/#contact"
                  className="text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  Contact
                </Link>
                <div className="pt-4">
                  <ModeToggle />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
