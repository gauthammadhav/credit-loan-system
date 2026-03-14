"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Container } from "./ui/container"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Apply", href: "/apply" },
  { name: "Dashboard", href: "/dashboard" },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl">
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#5B0E14] to-[#F1E194] flex items-center justify-center font-bold text-black text-sm">
            AI
          </div>
          <span className="text-xl font-bold tracking-tight text-white font-heading">
            Aura<span className="text-[#F1E194]">Loan</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-sm font-medium transition-colors hover:text-white",
                  isActive ? "text-white" : "text-gray-400"
                )}
              >
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-[31px] left-0 right-0 h-0.5 bg-[#F1E194]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
        </div>

        <Link 
          href="/apply"
          className="px-5 py-2 rounded-full bg-[#F1E194] text-black text-sm font-semibold hover:bg-[#d8c983] transition-colors"
        >
          Get Started
        </Link>
      </Container>
    </nav>
  )
}
