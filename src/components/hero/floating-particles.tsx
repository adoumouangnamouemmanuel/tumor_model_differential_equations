"use client"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function FloatingParticles() {
    const { theme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const isDark = theme === "dark"

    return (
        <>
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={i}
                    className={`absolute rounded-full ${isDark ? "bg-blue-400/30" : "bg-blue-300/20"} backdrop-blur-sm`}
                    initial={{
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                        scale: 0.5 + Math.random() * 0.5,
                        opacity: 0.1 + Math.random() * 0.3,
                    }}
                    animate={{
                        x: [
                            Math.random() * Math.min(window.innerWidth - 40, 1200),
                            Math.random() * Math.min(window.innerWidth - 40, 1200),
                        ],
                        y: [
                            Math.random() * Math.min(window.innerHeight - 40, 800),
                            Math.random() * Math.min(window.innerHeight - 40, 800),
                        ],
                        opacity: [0.1 + Math.random() * 0.3, 0.2 + Math.random() * 0.5, 0.1 + Math.random() * 0.3],
                    }}
                    transition={{
                        duration: 10 + Math.random() * 20,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                        ease: "easeInOut",
                    }}
                    style={{
                        width: `${10 + Math.random() * 20}px`,
                        height: `${10 + Math.random() * 20}px`,
                    }}
                />
            ))}
        </>
    )
}