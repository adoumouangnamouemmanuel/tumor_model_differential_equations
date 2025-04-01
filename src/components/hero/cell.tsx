"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

export type CellType = "normal" | "abnormal" | "tumor" | "immune" | "tissue" | "cancer"

interface CellProps {
    type: CellType
    size?: number
    delay?: number
    x?: number
    y?: number
    speed?: number
    opacity?: number
    hasNucleus?: boolean
    id?: string
}

export function Cell({
                         type,
                         size = 40,
                         delay = 0,
                         x = 0,
                         y = 0,
                         speed = 1,
                         opacity = 1,
                         hasNucleus = true,
                         // id = "cell",
                     }: CellProps) {
    const colors = {
        normal: "#f8e0c0", // beige/cream
        abnormal: "#f8a0a0", // light pink
        tumor: "#e07070", // darker pink
        immune: "#b0b0e0", // purple
        tissue: "#f8e0c0", // same as normal
        cancer: "#a04040", // dark red
    }

    const nucleusColors = {
        normal: "#e0c090", // darker beige
        abnormal: "#e07070", // pink
        tumor: "#c05050", // darker pink
        immune: "#8080c0", // darker purple
        tissue: "#e0c090", // same as normal
        cancer: "#802020", // very dark red
    }

    const pulseVariants = {
        normal: {
            scale: [1, 1.05, 1],
            opacity: [opacity, opacity * 0.9, opacity],
        },
        abnormal: {
            scale: [1, 1.1, 1],
            opacity: [opacity, opacity * 0.85, opacity],
        },
        tumor: {
            scale: [1, 1.15, 1],
            opacity: [opacity, opacity * 0.8, opacity],
        },
        immune: {
            scale: [1, 1.1, 1],
            opacity: [opacity, opacity * 0.7, opacity],
        },
        tissue: {
            scale: [1, 1.02, 1],
            opacity: [opacity, opacity * 0.95, opacity],
        },
        cancer: {
            scale: [1, 1.2, 1],
            opacity: [opacity, opacity * 0.75, opacity],
        },
    }

    const floatVariants = {
        normal: {
            x: [x, x + 10 * speed, x],
            y: [y, y + 5 * speed, y],
        },
        abnormal: {
            x: [x, x + 12 * speed, x],
            y: [y, y + 8 * speed, y],
        },
        tumor: {
            x: [x, x + 15 * speed, x],
            y: [y, y + 10 * speed, y],
        },
        immune: {
            x: [x, x + 20 * speed, x],
            y: [y, y + 15 * speed, y],
        },
        tissue: {
            x: [x, x + 3 * speed, x],
            y: [y, y + 2 * speed, y],
        },
        cancer: {
            x: [x, x + 8 * speed, x],
            y: [y, y + 6 * speed, y],
        },
    }

    const cellRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!cellRef.current) return

        // Add some random rotation
        const rotation = Math.random() * 360
        cellRef.current.style.transform = `rotate(${rotation}deg)`
    }, [])

    return (
        <motion.div
            ref={cellRef}
            className="absolute rounded-full flex items-center justify-center"
            style={{
                backgroundColor: colors[type],
                width: size,
                height: size,
                boxShadow: `0 0 ${size / 8}px ${colors[type]}`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
                scale: pulseVariants[type].scale,
                opacity: pulseVariants[type].opacity,
                x: floatVariants[type].x,
                y: floatVariants[type].y,
                transition: {
                    duration: 2.5 * speed,
                    repeat: Number.POSITIVE_INFINITY,
                    delay,
                },
            }}
            whileHover={{
                scale: 1.3,
                zIndex: 10,
                boxShadow: `0 0 ${size / 4}px ${colors[type]}`,
            }}
        >
            {hasNucleus && (
                <motion.div
                    className="rounded-full"
                    style={{
                        backgroundColor: nucleusColors[type],
                        width: size * 0.4,
                        height: size * 0.4,
                    }}
                    animate={{
                        scale: [1, 1.1, 1],
                        transition: {
                            duration: 3 * speed,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: delay + 0.5,
                        },
                    }}
                />
            )}
        </motion.div>
    )
}