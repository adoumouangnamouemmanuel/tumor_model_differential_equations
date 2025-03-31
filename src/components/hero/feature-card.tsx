"use client"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function FeatureCard({
                                title,
                                description,
                                delay,
                                color,
                            }: {
    title: string
    description: string
    delay: number
    color: "blue" | "purple" | "cyan"
}) {
    const { theme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const isDark = theme === "dark"

    const gradients = {
        blue: isDark ? "from-blue-500 to-blue-700" : "from-blue-400 to-blue-600",
        purple: isDark ? "from-purple-500 to-purple-700" : "from-purple-400 to-purple-600",
        cyan: isDark ? "from-cyan-500 to-cyan-700" : "from-cyan-400 to-cyan-600",
    }

    return (
        <motion.div
            className={`${isDark ? "bg-slate-800/80" : "bg-white"} backdrop-blur-sm p-8 rounded-xl border ${isDark ? "border-slate-700" : "border-gray-200"} overflow-hidden relative shadow-lg`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay,
            }}
            viewport={{ once: true }}
            whileHover={{
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)",
                transition: { type: "spring", stiffness: 400, damping: 10 },
            }}
        >
            {/* Animated gradient background */}
            <motion.div
                className={`absolute -top-24 -right-24 w-40 h-40 rounded-full bg-gradient-to-br ${gradients[color]} opacity-20 blur-xl`}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                }}
            />

            <motion.h3
                className={`text-2xl font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"} relative z-10`}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
                {title}
            </motion.h3>
            <p className={`${isDark ? "text-gray-300" : "text-gray-700"} relative z-10`}>{description}</p>
        </motion.div>
    )
}