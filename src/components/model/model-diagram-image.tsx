"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function ModelDiagramImage() {
    return (
        <motion.div
            className="w-full flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <h3 className="text-xl font-bold mb-4 text-center">Model Interactions</h3>

            {/* Replace with your actual image URL */}
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Model Interaction Diagram"
                    fill
                    className="object-contain"
                />
            </div>

            <p className="text-sm text-[hsl(var(--muted-foreground))] mt-4 text-center">
                Diagram showing the interactions between normal cells, tumor cells, immune cells, and dietary factors
            </p>
        </motion.div>
    )
}