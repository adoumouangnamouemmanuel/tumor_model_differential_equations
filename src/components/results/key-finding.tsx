"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface KeyFindingProps {
    icon: ReactNode
    title: string
    description: string
    color: "blue" | "purple" | "green" | "orange"
}

export function KeyFinding({ icon, title, description, color }: KeyFindingProps) {
    const colorClasses = {
        blue: {
            bg: "bg-blue-50 dark:bg-blue-900/20",
            border: "border-blue-200 dark:border-blue-800",
            icon: "text-blue-600 dark:text-blue-400",
            gradient: "from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500"
        },
        purple: {
            bg: "bg-purple-50 dark:bg-purple-900/20",
            border: "border-purple-200 dark:border-purple-800",
            icon: "text-purple-600 dark:text-purple-400",
            gradient: "from-purple-500 to-purple-600 dark:from-purple-400 dark:to-purple-500"
        },
        green: {
            bg: "bg-green-50 dark:bg-green-900/20",
            border: "border-green-200 dark:border-green-800",
            icon: "text-green-600 dark:text-green-400",
            gradient: "from-green-500 to-green-600 dark:from-green-400 dark:to-green-500"
        },
        orange: {
            bg: "bg-orange-50 dark:bg-orange-900/20",
            border: "border-orange-200 dark:border-orange-800",
            icon: "text-orange-600 dark:text-orange-400",
            gradient: "from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-500"
        }
    }

    return (
        <motion.div
            className={`p-6 rounded-xl border ${colorClasses[color].bg} ${colorClasses[color].border} relative overflow-hidden`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{
                y: -5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
        >
            {/* Animated gradient background */}
            <motion.div
                className={`absolute -top-24 -right-24 w-40 h-40 rounded-full bg-gradient-to-br ${colorClasses[color].gradient} opacity-20 blur-xl`}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
            />

            <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-full bg-white dark:bg-slate-800 shadow-sm ${colorClasses[color].icon}`}>
                    {icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
            </div>

            <p className="text-gray-700 dark:text-gray-300 relative z-10 leading-relaxed">
                {description}
            </p>
        </motion.div>
    )
}