"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface FutureDirectionsProps {
    icon: ReactNode
    title: string
    description: string
}

export function FutureDirections({ icon, title, description }: FutureDirectionsProps) {
    return (
        <motion.div
            className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{
                y: -5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
        >
            {/* Animated gradient background */}
            <motion.div
                className="absolute -top-24 -right-24 w-40 h-40 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 opacity-10 blur-xl"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                }}
            />

            <div className="flex flex-col items-center text-center gap-4">
                <motion.div
                    className="p-3 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    whileHover={{ rotate: 15, scale: 1.1 }}
                >
                    {icon}
                </motion.div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>

                <p className="text-gray-700 dark:text-gray-300 relative z-10">{description}</p>
            </div>
        </motion.div>
    )
}