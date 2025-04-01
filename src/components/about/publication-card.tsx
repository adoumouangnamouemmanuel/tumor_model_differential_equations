"use client"

import { motion } from "framer-motion"
import { FileText, ExternalLink } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface PublicationCardProps {
    title: string
    authors: string
    journal: string
    year: string
    doi: string
}

export function PublicationCard({ title, authors, journal, year, doi }: PublicationCardProps) {
    return (
        <motion.div
            className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-slate-700"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{
                y: -5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
        >
            <div className="flex items-start gap-4">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg text-blue-600 dark:text-blue-400 mt-1">
                    <FileText className="h-6 w-6" />
                </div>

                <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{title}</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-1">{authors}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                        {journal}, {year}
                    </p>

                    <Button
                        variant="outline"
                        size="sm"
                        className="text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                        asChild
                    >
                        <a href={`https://doi.org/${doi}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                            <span>View Publication</span>
                            <ExternalLink className="h-3 w-3" />
                        </a>
                    </Button>
                </div>
            </div>
        </motion.div>
    )
}