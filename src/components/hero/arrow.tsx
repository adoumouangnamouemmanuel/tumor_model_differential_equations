"use client"

import { motion } from "framer-motion"

interface ArrowProps {
    start: { x: number; y: number }
    end: { x: number; y: number }
    color?: string
    dashed?: boolean
    delay?: number
    label?: string
    labelPosition?: "start" | "middle" | "end"
    id?: string
}

export function Arrow({
                          start,
                          end,
                          color = "#000",
                          dashed = false,
                          delay = 0,
                          label,
                          labelPosition = "middle",
                          id = "arrow",
                      }: ArrowProps) {
    // Calculate the angle for the arrowhead
    const angle = Math.atan2(end.y - start.y, end.x - start.x)

    // Calculate the length of the arrow
    const length = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2))

    // Calculate the position for the label
    const getLabelPosition = () => {
        if (labelPosition === "start") {
            return {
                x: start.x + Math.cos(angle) * (length * 0.2),
                y: start.y + Math.sin(angle) * (length * 0.2),
            }
        } else if (labelPosition === "end") {
            return {
                x: start.x + Math.cos(angle) * (length * 0.8),
                y: start.y + Math.sin(angle) * (length * 0.8),
            }
        } else {
            return {
                x: start.x + Math.cos(angle) * (length * 0.5),
                y: start.y + Math.sin(angle) * (length * 0.5),
            }
        }
    }

    const labelPos = getLabelPosition()

    return (
        <>
            <motion.div
                key={`${id}-line`}
                className="absolute"
                style={{
                    width: length,
                    height: 2,
                    backgroundColor: color,
                    transformOrigin: "left center",
                    left: start.x,
                    top: start.y,
                    transform: `rotate(${angle}rad)`,
                    borderStyle: dashed ? "dashed" : "solid",
                    zIndex: 5,
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay }}
            />

            {/* Arrowhead */}
            <motion.div
                key={`${id}-head`}
                className="absolute"
                style={{
                    width: 0,
                    height: 0,
                    borderLeft: "8px solid transparent",
                    borderRight: "8px solid transparent",
                    borderBottom: `12px solid ${color}`,
                    transformOrigin: "center bottom",
                    left: end.x - 8,
                    top: end.y - 12,
                    transform: `rotate(${angle + Math.PI / 2}rad)`,
                    zIndex: 6,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: delay + 0.8 }}
            />

            {/* Label */}
            {label && (
                <motion.div
                    key={`${id}-label`}
                    className="absolute whitespace-nowrap text-xs font-medium"
                    style={{
                        left: labelPos.x,
                        top: labelPos.y,
                        transform: "translate(-50%, -50%)",
                        zIndex: 7,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: delay + 0.5 }}
                >
                    {label}
                </motion.div>
            )}
        </>
    )
}