"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Brain, Pizza, Dna, HeartPulse } from "lucide-react"

export function RelationshipDiagram() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Set canvas dimensions
        const resizeCanvas = () => {
            const rect = canvas.getBoundingClientRect()
            canvas.width = rect.width
            canvas.height = rect.height
        }

        resizeCanvas()
        window.addEventListener("resize", resizeCanvas)

        // Animation variables
        let animationFrame: number
        let time = 0

        function draw() {
            if (!ctx || !canvas) return

            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Draw connections
            const centerX = canvas.width / 2
            const centerY = canvas.height / 2
            const radius = Math.min(centerX, centerY) * 0.7

            // Calculate node positions
            const nodePositions = [
                { x: centerX, y: centerY - radius }, // Immune (top)
                { x: centerX + radius, y: centerY }, // Tumor (right)
                { x: centerX, y: centerY + radius }, // Diet (bottom)
                { x: centerX - radius, y: centerY }, // Normal (left)
            ]

            // Draw connections with animated flow
            drawConnection(nodePositions[0], nodePositions[1], "#ef4444", time, -1) // Immune -> Tumor (negative)
            drawConnection(nodePositions[2], nodePositions[0], "#10b981", time, 1) // Diet -> Immune (positive)
            drawConnection(nodePositions[1], nodePositions[3], "#ef4444", time, -1) // Tumor -> Normal (negative)
            drawConnection(nodePositions[0], nodePositions[3], "#3b82f6", time, 1) // Immune -> Normal (positive)

            // Update time
            time += 0.01
            animationFrame = requestAnimationFrame(draw)
        }

        function drawConnection(
            start: { x: number; y: number },
            end: { x: number; y: number },
            color: string,
            time: number,
            effect: number, // 1 for positive, -1 for negative
        ) {
            if (!ctx) return

            // Draw line
            ctx.beginPath()
            ctx.moveTo(start.x, start.y)
            ctx.lineTo(end.x, end.y)
            ctx.strokeStyle = color
            ctx.lineWidth = 2
            ctx.stroke()

            // Draw animated particles along the line
            const dx = end.x - start.x
            const dy = end.y - start.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            for (let i = 0; i < 5; i++) {
                const t = (time * 0.5 + i / 5) % 1
                const x = start.x + dx * t
                const y = start.y + dy * t

                ctx.beginPath()
                ctx.arc(x, y, 4, 0, Math.PI * 2)
                ctx.fillStyle = color
                ctx.fill()
            }

            // Draw effect indicator (+ or -)
            const midX = (start.x + end.x) / 2
            const midY = (start.y + end.y) / 2

            // Offset the indicator slightly from the line
            const perpX = (-dy / distance) * 15
            const perpY = (dx / distance) * 15

            ctx.beginPath()
            ctx.arc(midX + perpX, midY + perpY, 10, 0, Math.PI * 2)
            ctx.fillStyle = "white"
            ctx.fill()
            ctx.strokeStyle = color
            ctx.lineWidth = 2
            ctx.stroke()

            ctx.font = "16px Arial"
            ctx.fillStyle = color
            ctx.textAlign = "center"
            ctx.textBaseline = "middle"
            ctx.fillText(effect > 0 ? "+" : "−", midX + perpX, midY + perpY)
        }

        draw()

        return () => {
            window.removeEventListener("resize", resizeCanvas)
            cancelAnimationFrame(animationFrame)
        }
    }, [])

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-center text-gray-900 dark:text-white">
                Diet-Immune-Tumor-Normal Cell Relationship
            </h3>

            <div className="relative h-[450px] mb-12">
                <canvas ref={canvasRef} className="w-full h-full" />

                {/* Node labels with icons */}
                <motion.div
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 p-3 rounded-full shadow-lg"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                >
                    <Brain className="h-8 w-8 text-blue-500" />
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap font-medium">
                        Immune System
                    </div>
                </motion.div>

                <motion.div
                    className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 p-3 rounded-full shadow-lg"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                >
                    <Dna className="h-8 w-8 text-red-500" />
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap font-medium">
                        Tumor Cells
                    </div>
                </motion.div>

                <motion.div
                    className="absolute bottom-[10%] left-1/2 -translate-x-1/2 translate-y-1/2 bg-white dark:bg-slate-800 p-3 rounded-full shadow-lg"
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                >
                    <Pizza className="h-8 w-8 text-green-500" />
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap font-medium">
                        Diet Quality
                    </div>
                </motion.div>

                <motion.div
                    className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 p-3 rounded-full shadow-lg"
                    animate={{ x: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1.5 }}
                >
                    <HeartPulse className="h-8 w-8 text-purple-500" />
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap font-medium">
                        Normal Cells
                    </div>
                </motion.div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto">
                This diagram illustrates the relationships between the key components in our model. A positive diet enhances
                immune function, which suppresses tumor growth and protects normal cells. Tumor cells negatively impact normal
                cell populations through competition and inhibition.
            </p>
        </div>
    )
}