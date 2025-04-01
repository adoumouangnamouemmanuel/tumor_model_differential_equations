"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Info } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ParameterProps {
    symbol: string
    description: string
}

interface TermProps {
    name: string
    term: string
    description: string
}

interface ModelEquationProps {
    equation: string
    parameters: ParameterProps[]
    terms: TermProps[]
}

export function ModelEquation({ equation, parameters, terms }: ModelEquationProps) {
    const [activeTermIndex, setActiveTermIndex] = useState<number | null>(null)

    useEffect(() => {
        // Ensure MathJax re-renders the equations
        if (window.MathJax && "typeset" in window.MathJax && window.MathJax.typeset) {
            if ("typeset" in window.MathJax) {
                window.MathJax.typeset()
            }
        }
    }, [equation, activeTermIndex]) // Re-run when equation or active term changes

    return (
        <div className="space-y-6">
            {/* Main equation */}
            <div className="flex flex-col items-center">
                <div className="text-2xl md:text-3xl py-6 overflow-x-auto w-full text-center">\[{equation}\]</div>

                <div className="flex flex-wrap gap-2 justify-center">
                    {terms.map((term, index) => (
                        <motion.button
                            key={index}
                            className={`px-3 py-1 rounded-full text-sm border cursor-pointer ${
                                activeTermIndex === index
                                    ? "bg-blue-600 text-white border-blue-600 dark:bg-blue-500 dark:border-blue-500"
                                    : "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] border-[hsl(var(--border))]"
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setActiveTermIndex(activeTermIndex === index ? null : index)}
                        >
                            {term.name}
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Term explanation */}
            {activeTermIndex !== null && (
                <motion.div
                    className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                >
                    <h4 className="font-bold mb-2">
                        {terms[activeTermIndex].name}: <span>$${terms[activeTermIndex].term}$$</span>
                    </h4>
                    <p>{terms[activeTermIndex].description}</p>
                </motion.div>
            )}

            {/* Parameters */}
            <div className="mt-6">
                <h4 className="font-semibold mb-3">Parameters:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {parameters.map((param, index) => (
                        <TooltipProvider key={index} delayDuration={100}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-[hsl(var(--muted))] cursor-pointer">
                                        <span className="text-lg">$${param.symbol}$$</span>
                                        <Info className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent align="center" sideOffset={5} className="max-w-xs">
                                    <p>{param.description}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    ))}
                </div>
            </div>
        </div>
    )
}