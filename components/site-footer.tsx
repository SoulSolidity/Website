"use client";

import * as React from "react"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "./ui/button"
import { motion } from "framer-motion"

// import { siteConfig } from "@/config/site"
// import { ModeToggle } from "@/components/mode-toggle"

const socialLinks = [
  { name: "Twitter", href: "https://twitter.com/SoulSolidity", icon: "twitter", className: "fill-muted-foreground hover:fill-foreground transition-colors" },
  // { name: "Discord", href: "https://discord.gg/soulsolidity", icon: "discord" },
  { name: "Telegram", href: "https://t.me/doublo", icon: "telegram" },
  { name: "GitHub", href: "https://github.com/SoulSolidity", icon: "gitHub" },
]

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn("border-t bg-muted/30", className)}>
      <div className="container py-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="flex space-x-4">
            {socialLinks.map((link) => {
              const Icon = Icons[link.icon as keyof typeof Icons]
              return (
                <Button
                  key={link.name}
                  variant="ghost"
                  size="icon"
                  asChild
                  className="hover:text-foreground"
                >
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={link.name}
                  >
                    <Icon className={cn("h-4 w-4", link.className)} />
                  </a>
                </Button>
              )
            })}
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Soul Solidity. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}