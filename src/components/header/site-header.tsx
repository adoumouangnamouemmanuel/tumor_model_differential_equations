"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { MainNav } from "@/components/header/main-nav"
import { MobileNav } from "@/components/header/mobile-nav"
import { Sparkles } from "lucide-react"
import { useEffect, useState } from "react"

export function SiteHeader() {
    // Add state to track scroll position
    const [scrolled, setScrolled] = useState(false)

    // Add scroll event listener
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10)
        }

        // Add event listener
        window.addEventListener("scroll", handleScroll)

        // Initial check
        handleScroll()

        // Clean up
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 w-full border-b transition-all duration-200 ${
                scrolled
                    ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-sm"
                    : "bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm"
            } border-gray-200 dark:border-slate-800`}
        >
            <div className="container flex h-16 items-center px-6">
                <motion.div
                    className="mr-8 flex"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 20,
                    }}
                >
                    <Link href="/" className="flex items-center space-x-2">
                        <motion.div
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 10,
                            }}
                            className="rounded-full bg-gradient-to-r from-blue-500 to-blue-700 p-1"
                        >
                            <motion.div
                                animate={{
                                    rotate: [0, 360],
                                }}
                                transition={{
                                    duration: 20,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: "linear",
                                }}
                            >
                                <Sparkles className="h-6 w-6 text-white" />
                            </motion.div>
                        </motion.div>
                        <motion.span
                            className="hidden font-bold sm:inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600"
                            whileHover={{ scale: 1.05 }}
                            animate={{
                                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "reverse",
                            }}
                            style={{
                                backgroundSize: "200% 200%",
                            }}
                        >
                            Diverse Buzima
                        </motion.span>
                    </Link>
                </motion.div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex flex-1 justify-center">
                    <MainNav />
                </div>

                {/* Mobile Navigation */}
                <div className="flex md:hidden flex-1 justify-end">
                    <MobileNav />
                </div>
            </div>
        </header>
    )
}