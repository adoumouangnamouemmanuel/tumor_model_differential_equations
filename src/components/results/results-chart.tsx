"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"

interface ResultsChartProps {
    type: "immune" | "tumor" | "diet"
    title: string
    description: string
}

export function ResultsChart({ type, title, description }: ResultsChartProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isHovered, setIsHovered] = useState(false)

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
        window.addEventListener('resize', resizeCanvas)

        // Chart parameters
        const margin = { top: 40, right: 30, bottom: 50, left: 60 }
        const width = canvas.width - margin.left - margin.right
        const height = canvas.height - margin.top - margin.bottom

        // Generate data based on chart type
        const generateData = () => {
            const data = []

            if (type === "immune") {
                // Immune response data: two lines showing immune response with good vs poor diet
                const goodDietData = []
                const poorDietData = []

                for (let i = 0; i <= 100; i++) {
                    // Good diet: strong immune response that peaks and maintains
                    goodDietData.push({
                        x: i,
                        y: i < 40 ? 20 + i * 1.5 : i < 70 ? 80 : 80 - (i - 70) * 0.5
                    })

                    // Poor diet: weak immune response that declines
                    poorDietData.push({
                        x: i,
                        y: i < 30 ? 10 + i * 1 : 40 - (i - 30) * 0.3
                    })
                }

                return { goodDietData, poorDietData }
            }
            else if (type === "tumor") {
                // Tumor growth data: two lines showing tumor growth with strong vs weak immune system
                const strongImmuneData = []
                const weakImmuneData = []

                for (let i = 0; i <= 100; i++) {
                    // Strong immune: tumor growth is controlled
                    strongImmuneData.push({
                        x: i,
                        y: i < 30 ? i * 0.8 : i < 60 ? 24 + (i - 30) * 0.3 : 33 - (i - 60) * 0.2
                    })

                    // Weak immune: exponential tumor growth
                    weakImmuneData.push({
                        x: i,
                        y: 5 + Math.pow(i / 20, 2)
                    })
                }

                return { strongImmuneData, weakImmuneData }
            }
            else {
                // Diet quality vs immune efficiency
                const dietData = []

                for (let i = 0; i <= 100; i++) {
                    dietData.push({
                        x: i,
                        y: 10 + i * 0.7 + Math.sin(i / 5) * 5
                    })
                }

                return { dietData }
            }
        }

        // Animation variables
        let progress = 0
        const animationSpeed = isHovered ? 0.5 : 0.2

        function draw() {
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Draw title
            ctx.font = "16px Arial"
            ctx.fillStyle = "#1e293b"
            ctx.textAlign = "center"
            ctx.fillText(title, canvas.width / 2, 20)

            // Draw axes
            ctx.beginPath()
            ctx.moveTo(margin.left, margin.top)
            ctx.lineTo(margin.left, canvas.height - margin.bottom)
            ctx.lineTo(canvas.width - margin.right, canvas.height - margin.bottom)
            ctx.strokeStyle = "#94a3b8"
            ctx.lineWidth = 2
            ctx.stroke()

            // Draw axes labels
            ctx.font = "14px Arial"
            ctx.fillStyle = "#64748b"
            ctx.textAlign = "center"

            // X-axis label
            ctx.fillText("Time", canvas.width / 2, canvas.height - 10)

            // Y-axis label
            ctx.save()
            ctx.translate(15, canvas.height / 2)
            ctx.rotate(-Math.PI / 2)
            ctx.textAlign = "center"

            if (type === "immune") {
                ctx.fillText("Immune Response", 0, 0)
            } else if (type === "tumor") {
                ctx.fillText("Tumor Size", 0, 0)
            } else {
                ctx.fillText("Immune Efficiency", 0, 0)
            }

            ctx.restore()

            // Draw grid lines
            ctx.beginPath()
            for (let i = 0; i <= 5; i++) {
                const y = margin.top + (height / 5) * i
                ctx.moveTo(margin.left, y)
                ctx.lineTo(canvas.width - margin.right, y)
            }
            ctx.strokeStyle = "#e2e8f0"
            ctx.lineWidth = 1
            ctx.stroke()

            // Get data based on chart type
            const data = generateData()

            // Calculate visible data based on progress
            const visiblePoints = Math.floor(100 * Math.min(1, progress))

            if (visiblePoints > 1) {
                if (type === "immune") {
                    // Draw good diet line
                    drawLine(data.goodDietData.slice(0, visiblePoints), "#3b82f6", "Good Diet")

                    // Draw poor diet line
                    drawLine(data.poorDietData.slice(0, visiblePoints), "#ef4444", "Poor Diet")
                }
                else if (type === "tumor") {
                    // Draw strong immune line
                    drawLine(data.strongImmuneData.slice(0, visiblePoints), "#3b82f6", "Strong Immune")

                    // Draw weak immune line
                    drawLine(data.weakImmuneData.slice(0, visiblePoints), "#ef4444", "Weak Immune")
                }
                else {
                    // Draw diet quality line
                    drawLine(data.dietData.slice(0, visiblePoints), "#10b981", "Diet Quality")
                }
            }

            // Helper function to draw a line
            function drawLine(points: {x: number, y: number}[], color: string, label: string) {
                // Draw line
                ctx.beginPath()
                for (let i = 0; i < points.length; i++) {
                    const point = points[i]
                    const x = margin.left + (point.x / 100) * width
                    const y = canvas.height - margin.bottom - (point.y / 100) * height

                    if (i === 0) {
                        ctx.moveTo(x, y)
                    } else {
                        ctx.lineTo(x, y)
                    }
                }
                ctx.strokeStyle = color
                ctx.lineWidth = 3
                ctx.stroke()

                // Draw points
                for (let i = 0; i < points.length; i += 10) {
                    const point = points[i]
                    const x = margin.left + (point.x / 100) * width
                    const y = canvas.height - margin.bottom - (point.y / 100) * height

                    ctx.beginPath()
                    ctx.arc(x, y, 4, 0, Math.PI * 2)
                    ctx.fillStyle = color
                    ctx.fill()
                }

                // Add label to legend
                const legendY = margin.top + 20 + (type === "diet" ? 0 : (label === "Good Diet" || label === "Strong Immune") ? 0 : 20)
                const legendX = canvas.width - margin.right - 120

                ctx.fillStyle = color
                ctx.fillRect(legendX, legendY, 20, 10)
                ctx.fillStyle = "#64748b"
                ctx.textAlign = "left"
                ctx.fillText(label, legendX + 30, legendY + 10)
            }

            // Update progress
            progress += animationSpeed / 100
            if (progress > 1.2) progress = 0

            requestAnimationFrame(draw)
        }

        draw()

        return () => {
            window.removeEventListener('resize', resizeCanvas)
        }
    }, [isHovered, type, title])

    return (
        <div className="space-y-4">
            <div
                className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-lg bg-white dark:bg-slate-800"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <canvas ref={canvasRef} className="w-full h-full" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
        </div>
    )
}