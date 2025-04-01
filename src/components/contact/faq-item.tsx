"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

interface FaqItemProps {
    question: string
    answer: string
}

export function FaqItem({ question, answer }: FaqItemProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <motion.div
            className="border border-gray-200 dark:border-slate-700 rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-50px" }}
        >
            <motion.button
                className="flex justify-between items-center w-full p-4 text-left bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ backgroundColor: isOpen ? "" : "rgba(243, 244, 246, 0.5)" }}
            >
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{question}</h3>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </motion.div>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 bg-gray-50 dark:bg-slate-700/20 border-t border-gray-200 dark:border-slate-700">
                            <p className="text-gray-700 dark:text-gray-300">{answer}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}