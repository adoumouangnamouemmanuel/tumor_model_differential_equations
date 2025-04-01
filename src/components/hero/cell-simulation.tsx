"use client"

import { useRef, useEffect, useState } from "react"
import { useTheme } from "next-themes"

// Cell types
type CellType = "normal" | "tumor" | "immune"

// Cell interface
interface Cell {
    id: number
    x: number
    y: number
    vx: number
    vy: number
    radius: number
    type: CellType
    age: number
    divisionTime: number
    health: number
    opacity: number
    pulse: number
    pulseSpeed: number
    trail: { x: number; y: number; age: number; radius: number }[]
}

export function CellSimulation() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const cellsRef = useRef<Cell[]>([])
    // @ts-expect-error: This is necessary because TypeScript incorrectly infers the type here
    const animationRef = useRef<number>()
    const isInitializedRef = useRef(false)
    const mouseRef = useRef({ x: 0, y: 0, active: false })
    const { resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    // Cell colors based on theme
    const getCellColors = (isDark: boolean) => ({
        normal: {
            fill: isDark ? "rgba(100, 210, 255, 0.6)" : "rgba(59, 130, 246, 0.4)",
            stroke: isDark ? "rgba(100, 210, 255, 0.9)" : "rgba(59, 130, 246, 0.7)",
            glow: isDark ? "rgba(100, 210, 255, 0.3)" : "rgba(59, 130, 246, 0.2)",
        },
        tumor: {
            fill: isDark ? "rgba(255, 100, 100, 0.6)" : "rgba(239, 68, 68, 0.4)",
            stroke: isDark ? "rgba(255, 100, 100, 0.9)" : "rgba(239, 68, 68, 0.7)",
            glow: isDark ? "rgba(255, 100, 100, 0.3)" : "rgba(239, 68, 68, 0.2)",
        },
        immune: {
            fill: isDark ? "rgba(130, 255, 150, 0.6)" : "rgba(34, 197, 94, 0.4)",
            stroke: isDark ? "rgba(130, 255, 150, 0.9)" : "rgba(34, 197, 94, 0.7)",
            glow: isDark ? "rgba(130, 255, 150, 0.3)" : "rgba(34, 197, 94, 0.2)",
        },
    })

    // Cell parameters
    const cellParams = {
        maxCells: 180,
        normalCellDivisionRate: 0.001,
        tumorCellDivisionRate: 0.002,
        immuneCellDivisionRate: 0.0015,
        normalCellDeathRate: 0.0005,
        tumorCellDeathRate: 0.0003,
        immuneCellDeathRate: 0.0008,
        immuneKillRate: 0.01,
        tumorDamageRate: 0.005,
        maxTrailLength: 10,
        trailDecay: 0.05,
    }

    // Initialize cells
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const initializeCells = (width: number, height: number) => {
        const initialCells: Cell[] = []

        // Create normal cells
        for (let i = 0; i < 40; i++) {
            initialCells.push(createCell("normal", width, height))
        }

        // Create tumor cells
        for (let i = 0; i < 15; i++) {
            initialCells.push(createCell("tumor", width, height))
        }

        // Create immune cells
        for (let i = 0; i < 25; i++) {
            initialCells.push(createCell("immune", width, height))
        }

        cellsRef.current = initialCells
    }

    // Create a new cell
    const createCell = (type: CellType, width: number, height: number, parent?: Cell): Cell => {
        const radius =
            type === "normal" ? 8 + Math.random() * 4 : type === "tumor" ? 10 + Math.random() * 6 : 6 + Math.random() * 3

        // Calculate velocity directly without the intermediate speed variable
        const angle = Math.random() * Math.PI * 2
        const velocity =
            type === "normal"
                ? 0.15 + Math.random() * 0.2
                : type === "tumor"
                    ? 0.1 + Math.random() * 0.15
                    : 0.2 + Math.random() * 0.3

        // If parent cell exists, position near parent
        const x = parent
            ? Math.max(radius, Math.min(width - radius, parent.x + (Math.random() * 20 - 10)))
            : radius + Math.random() * (width - radius * 2)

        const y = parent
            ? Math.max(radius, Math.min(height - radius, parent.y + (Math.random() * 20 - 10)))
            : radius + Math.random() * (height - radius * 2)

        return {
            id: Math.random(),
            x,
            y,
            vx: Math.cos(angle) * velocity,
            vy: Math.sin(angle) * velocity,
            radius,
            type,
            age: 0,
            divisionTime:
                type === "normal"
                    ? 500 + Math.random() * 500
                    : type === "tumor"
                        ? 300 + Math.random() * 300
                        : 600 + Math.random() * 600,
            health: 100,
            opacity: 0.7 + Math.random() * 0.3,
            pulse: 0,
            pulseSpeed: 0.02 + Math.random() * 0.03,
            trail: [],
        }
    }

    // Draw a single cell with advanced effects
    const drawCell = (ctx: CanvasRenderingContext2D, cell: Cell, isDark: boolean) => {
        const colors = getCellColors(isDark)[cell.type]

        // Draw trail
        cell.trail.forEach((point, index) => {
            const opacity = 1 - index / cell.trail.length
            ctx.beginPath()
            ctx.arc(point.x, point.y, point.radius * opacity, 0, Math.PI * 2)
            ctx.fillStyle =
                cell.type === "normal"
                    ? isDark
                        ? `rgba(100, 210, 255, ${opacity * 0.2})`
                        : `rgba(59, 130, 246, ${opacity * 0.15})`
                    : cell.type === "tumor"
                        ? isDark
                            ? `rgba(255, 100, 100, ${opacity * 0.2})`
                            : `rgba(239, 68, 68, ${opacity * 0.15})`
                        : isDark
                            ? `rgba(130, 255, 150, ${opacity * 0.2})`
                            : `rgba(34, 197, 94, ${opacity * 0.15})`
            ctx.fill()
        })

        // Outer glow
        const glowSize = cell.radius * (1.5 + Math.sin(cell.pulse) * 0.3)
        const gradient = ctx.createRadialGradient(cell.x, cell.y, cell.radius * 0.8, cell.x, cell.y, glowSize)
        gradient.addColorStop(0, colors.glow)
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

        ctx.beginPath()
        ctx.arc(cell.x, cell.y, glowSize, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Inner glow
        const innerGradient = ctx.createRadialGradient(
            cell.x - cell.radius * 0.3,
            cell.y - cell.radius * 0.3,
            0,
            cell.x,
            cell.y,
            cell.radius,
        )
        innerGradient.addColorStop(0, isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.9)")
        innerGradient.addColorStop(0.4, colors.fill)
        innerGradient.addColorStop(1, colors.stroke)

        // Cell body
        ctx.beginPath()
        ctx.arc(cell.x, cell.y, cell.radius, 0, Math.PI * 2)
        ctx.fillStyle = innerGradient
        ctx.fill()

        // Cell membrane
        ctx.beginPath()
        ctx.arc(cell.x, cell.y, cell.radius, 0, Math.PI * 2)
        ctx.lineWidth = 1.5
        ctx.strokeStyle = colors.stroke
        ctx.stroke()

        // Highlight
        ctx.beginPath()
        ctx.arc(cell.x - cell.radius * 0.3, cell.y - cell.radius * 0.3, cell.radius * 0.4, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)"
        ctx.fill()
    }

    // Animation loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const animate = () => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const width = canvas.width
        const height = canvas.height

        const isDark = resolvedTheme === "dark"

        // Clear canvas with a semi-transparent background to create trails
        ctx.fillStyle = isDark ? "rgba(10, 15, 30, 0.1)" : "rgba(255, 255, 255, 0.1)"
        ctx.fillRect(0, 0, width, height)

        const updatedCells = [...cellsRef.current]
        const newCells: Cell[] = []

        // Process cell interactions and movements
        for (let i = 0; i < updatedCells.length; i++) {
            const cell = updatedCells[i]

            // Update pulse
            cell.pulse += cell.pulseSpeed
            if (cell.pulse > Math.PI * 2) {
                cell.pulse = 0
            }

            // Update trail
            if (cell.trail.length > 0) {
                // Age all trail points
                cell.trail.forEach((point) => {
                    point.age += 1
                })

                // Remove old trail points
                cell.trail = cell.trail.filter((point) => point.age < 20)
            }

            // Add new trail point occasionally
            if (Math.random() < 0.2 && cell.trail.length < cellParams.maxTrailLength) {
                cell.trail.push({
                    x: cell.x,
                    y: cell.y,
                    age: 0,
                    radius: cell.radius,
                })
            }

            // Age the cell
            cell.age += 1

            // Check for cell division
            if (cell.age >= cell.divisionTime && updatedCells.length + newCells.length < cellParams.maxCells) {
                const divisionProbability =
                    cell.type === "normal"
                        ? cellParams.normalCellDivisionRate
                        : cell.type === "tumor"
                            ? cellParams.tumorCellDivisionRate
                            : cell.type === "immune"
                                ? cellParams.immuneCellDivisionRate
                                : 0

                if (Math.random() < divisionProbability) {
                    newCells.push(createCell(cell.type, width, height, cell))
                    cell.age = 0
                }
            }

            // Check for cell death
            const deathProbability =
                cell.type === "normal"
                    ? cellParams.normalCellDeathRate
                    : cell.type === "tumor"
                        ? cellParams.tumorCellDeathRate
                        : cell.type === "immune"
                            ? cellParams.immuneCellDeathRate
                            : 0

            if (Math.random() < deathProbability || cell.health <= 0) {
                updatedCells.splice(i, 1)
                i--
                continue
            }

            // Cell interactions
            for (let j = 0; j < updatedCells.length; j++) {
                if (i === j) continue

                const otherCell = updatedCells[j]
                const dx = otherCell.x - cell.x
                const dy = otherCell.y - cell.y
                const distance = Math.sqrt(dx * dx + dy * dy)
                const minDistance = cell.radius + otherCell.radius

                // Collision detection
                if (distance < minDistance) {
                    // Collision response - simple repulsion
                    const angle = Math.atan2(dy, dx)
                    const overlap = minDistance - distance

                    // Move cells apart
                    const moveX = Math.cos(angle) * overlap * 0.5
                    const moveY = Math.sin(angle) * overlap * 0.5

                    if (i !== j) {
                        cell.x -= moveX
                        cell.y -= moveY
                        otherCell.x += moveX
                        otherCell.y += moveY
                    }

                    // Immune cells attack tumor cells
                    if (cell.type === "immune" && otherCell.type === "tumor") {
                        if (Math.random() < cellParams.immuneKillRate) {
                            otherCell.health -= 10

                            // Visual effect for attack
                            for (let k = 0; k < 3; k++) {
                                const angle = Math.random() * Math.PI * 2
                                // const speed = 0.5 + Math.random() * 1
                                const radius = 2 + Math.random() * 2

                                cell.trail.push({
                                    x: cell.x + Math.cos(angle) * cell.radius,
                                    y: cell.y + Math.sin(angle) * cell.radius,
                                    age: 0,
                                    radius: radius,
                                })
                            }
                        }
                    }

                    // Tumor cells damage normal cells
                    if (cell.type === "tumor" && otherCell.type === "normal") {
                        if (Math.random() < cellParams.tumorDamageRate) {
                            otherCell.health -= 5
                        }
                    }
                }
            }

            // Mouse interaction
            if (mouseRef.current.active) {
                const dx = mouseRef.current.x - cell.x
                const dy = mouseRef.current.y - cell.y
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < 100) {
                    // Repel from mouse
                    const angle = Math.atan2(dy, dx)
                    const force = ((100 - distance) / 100) * 2
                    cell.vx -= Math.cos(angle) * force
                    cell.vy -= Math.sin(angle) * force
                }
            }

            // Update position
            cell.x += cell.vx
            cell.y += cell.vy

            // Apply slight drag
            cell.vx *= 0.99
            cell.vy *= 0.99

            // Boundary collision
            if (cell.x - cell.radius < 0) {
                cell.x = cell.radius
                cell.vx *= -1
            } else if (cell.x + cell.radius > width) {
                cell.x = width - cell.radius
                cell.vx *= -1
            }

            if (cell.y - cell.radius < 0) {
                cell.y = cell.radius
                cell.vy *= -1
            } else if (cell.y + cell.radius > height) {
                cell.y = height - cell.radius
                cell.vy *= -1
            }

            // Draw cell
            drawCell(ctx, cell, isDark)
        }

        // Add new cells from division
        cellsRef.current = [...updatedCells, ...newCells]

        // Continue animation loop
        animationRef.current = requestAnimationFrame(animate)
    }

    // Handle canvas setup and animation
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const handleResize = () => {
            if (!canvas) return

            canvas.width = window.innerWidth
            canvas.height = window.innerHeight

            if (!isInitializedRef.current) {
                initializeCells(canvas.width, canvas.height)
                isInitializedRef.current = true
            }
        }

        // Mouse interaction handlers
        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect()
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
                active: true,
            }
        }

        const handleMouseLeave = () => {
            mouseRef.current.active = false
        }

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                const rect = canvas.getBoundingClientRect()
                mouseRef.current = {
                    x: e.touches[0].clientX - rect.left,
                    y: e.touches[0].clientY - rect.top,
                    active: true,
                }
            }
        }

        const handleTouchEnd = () => {
            mouseRef.current.active = false
        }

        // Initial setup
        handleResize()

        // Start animation
        animationRef.current = requestAnimationFrame(animate)

        // Event listeners
        window.addEventListener("resize", handleResize)
        canvas.addEventListener("mousemove", handleMouseMove)
        canvas.addEventListener("mouseleave", handleMouseLeave)
        canvas.addEventListener("touchmove", handleTouchMove)
        canvas.addEventListener("touchend", handleTouchEnd)

        // Cleanup
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
            window.removeEventListener("resize", handleResize)
            canvas.removeEventListener("mousemove", handleMouseMove)
            canvas.removeEventListener("mouseleave", handleMouseLeave)
            canvas.removeEventListener("touchmove", handleTouchMove)
            canvas.removeEventListener("touchend", handleTouchEnd)
        }
    }, [resolvedTheme, initializeCells, animate])

    // Fix hydration issue by using a neutral background initially, then applying theme-specific styles after mounting
    const bgClass = mounted
        ? resolvedTheme === "dark"
            ? "bg-gradient-to-b from-slate-950 to-blue-950"
            : "bg-gradient-to-b from-white to-blue-50"
        : "bg-gray-100" // Neutral initial background

    // Add overflow control to the canvas container
    return (
        <div className="w-full h-full overflow-hidden">
            <canvas ref={canvasRef} className={`w-full h-full ${bgClass}`} />
        </div>
    )
}