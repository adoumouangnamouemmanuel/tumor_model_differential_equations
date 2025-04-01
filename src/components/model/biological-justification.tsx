"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface BiologicalJustificationProps {
    title: string
    icon: React.ReactNode
    description: string
}

export function BiologicalJustification({ title, icon, description }: BiologicalJustificationProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
        >
            <Card className="shadow-lg border-none">
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <div className="mr-2 text-[hsl(var(--primary))]">{icon}</div>
                        {title}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{description}</p>
                </CardContent>
            </Card>
        </motion.div>
    )
}