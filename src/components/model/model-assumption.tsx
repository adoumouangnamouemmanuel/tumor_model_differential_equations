"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ModelAssumptionProps {
    number: number
    title: string
    icon: React.ReactNode
    description: string
    className?: string
}

export function ModelAssumption({ number, title, icon, description, className }: ModelAssumptionProps) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: number * 0.1 }}
            whileHover={{ scale: 1.02 }}
        >
            <Card
                className="shadow-lg border-none"
            >
                <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg">
                        <div className="w-8 h-8 rounded-full bg-[hsl(var(--primary))] bg-opacity-20 flex items-center justify-center mr-3">
                            {icon}
                        </div>
                        {title}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-[hsl(var(--muted-foreground))]">{description}</p>
                </CardContent>
            </Card>
        </motion.div>
    )
}