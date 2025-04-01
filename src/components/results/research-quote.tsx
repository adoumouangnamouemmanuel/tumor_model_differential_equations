"use client"

import { motion } from "framer-motion"

interface ResearchQuoteProps {
    quote: string
    author: string
}

export function ResearchQuote({ quote, author }: ResearchQuoteProps) {
    return (
        <motion.div
            className="relative py-10 px-6 md:px-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-100 dark:border-blue-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-50px" }}
        >
            <div className="absolute top-4 left-4 text-6xl text-blue-300 dark:text-blue-700 opacity-50">&ldquo;</div>
            <div className="absolute bottom-4 right-4 text-6xl text-blue-300 dark:text-blue-700 opacity-50">&rdquo;</div>

            <div className="relative z-10">
                <p className="text-xl md:text-2xl text-gray-800 dark:text-gray-200 italic text-center mb-6">{quote}</p>

                <p className="text-right text-gray-600 dark:text-gray-400 font-medium">— {author}</p>
            </div>
        </motion.div>
    )
}