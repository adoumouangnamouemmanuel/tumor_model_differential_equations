"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface ResearchMilestoneProps {
    year: string
    title: string
    description: string
    icon: ReactNode
}

export function ResearchMilestone({ year, title, description, icon }: ResearchMilestoneProps) {
    return (
        <div className="flex">
            {/* Timeline line */}
            <div className="flex flex-col items-center">
                <motion.div
                    className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 z-10"
                    whileHover={{ scale: 1.1, backgroundColor: "#dbeafe" }}
                >
                    {icon}
                </motion.div>
                <div className="w-0.5 h-full bg-blue-200 dark:bg-blue-800 -mt-2"></div>
            </div>

            {/* Content */}
            <motion.div
                className="ml-6 -mt-2 pb-12"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-slate-700">
                    <div className="flex items-center mb-2">
            <span className="text-sm font-bold px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              {year}
            </span>
                        <h3 className="text-xl font-bold ml-3 text-gray-900 dark:text-white">{title}</h3>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{description}</p>
                </div>
            </motion.div>
        </div>
    )
}