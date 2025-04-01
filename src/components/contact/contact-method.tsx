"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ContactMethodProps {
    icon: ReactNode
    title: string
    description: string
    contactInfo: string
    actionLabel: string
    actionHref: string
    color: "blue" | "purple" | "green" | "orange"
}

export function ContactMethod({
                                  icon,
                                  title,
                                  description,
                                  contactInfo,
                                  actionLabel,
                                  actionHref,
                                  color,
                              }: ContactMethodProps) {
    const colorClasses = {
        blue: {
            bg: "bg-blue-50 dark:bg-blue-900/20",
            border: "border-blue-200 dark:border-blue-800",
            icon: "text-blue-600 dark:text-blue-400",
            button: "bg-blue-600 hover:bg-blue-700",
        },
        purple: {
            bg: "bg-purple-50 dark:bg-purple-900/20",
            border: "border-purple-200 dark:border-purple-800",
            icon: "text-purple-600 dark:text-purple-400",
            button: "bg-purple-600 hover:bg-purple-700",
        },
        green: {
            bg: "bg-green-50 dark:bg-green-900/20",
            border: "border-green-200 dark:border-green-800",
            icon: "text-green-600 dark:text-green-400",
            button: "bg-green-600 hover:bg-green-700",
        },
        orange: {
            bg: "bg-orange-50 dark:bg-orange-900/20",
            border: "border-orange-200 dark:border-orange-800",
            icon: "text-orange-600 dark:text-orange-400",
            button: "bg-orange-600 hover:bg-orange-700",
        },
    }

    return (
        <motion.div
            className={`p-6 rounded-xl border ${colorClasses[color].bg} ${colorClasses[color].border}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{
                y: -5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
        >
            <div className="flex flex-col items-center text-center">
                <div className={`p-3 rounded-full bg-white dark:bg-slate-800 shadow-sm ${colorClasses[color].icon} mb-4`}>
                    {icon}
                </div>

                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{title}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{description}</p>

                <div className="font-medium text-lg mb-6 text-gray-900 dark:text-white">{contactInfo}</div>

                <Button asChild className={`${colorClasses[color].button} text-white`}>
                    <a href={actionHref} className="flex items-center gap-2">
                        <span>{actionLabel}</span>
                        <ExternalLink className="h-4 w-4" />
                    </a>
                </Button>
            </div>
        </motion.div>
    )
}