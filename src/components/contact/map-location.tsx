"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { MapPin } from "lucide-react"

export function MapLocation() {
    const mapRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // This is a placeholder for a real map implementation
        // In a real application, you would use a library like Google Maps, Mapbox, or Leaflet

        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")

        if (!mapRef.current || !ctx) return

        // Set canvas dimensions
        const resizeCanvas = () => {
            if (!mapRef.current) return
            const rect = mapRef.current.getBoundingClientRect()
            canvas.width = rect.width
            canvas.height = rect.height

            drawMap()
        }

        // Draw a simple map placeholder
        const drawMap = () => {
            if (!ctx) return

            // Background
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
            gradient.addColorStop(0, "#f0f9ff")
            gradient.addColorStop(1, "#e0f2fe")

            ctx.fillStyle = gradient
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            // Grid lines
            ctx.strokeStyle = "#bfdbfe"
            ctx.lineWidth = 1

            // Horizontal lines
            for (let y = 0; y < canvas.height; y += 20) {
                ctx.beginPath()
                ctx.moveTo(0, y)
                ctx.lineTo(canvas.width, y)
                ctx.stroke()
            }

            // Vertical lines
            for (let x = 0; x < canvas.width; x += 20) {
                ctx.beginPath()
                ctx.moveTo(x, 0)
                ctx.lineTo(x, canvas.height)
                ctx.stroke()
            }

            // Roads
            ctx.strokeStyle = "#94a3b8"
            ctx.lineWidth = 6

            // Main road
            ctx.beginPath()
            ctx.moveTo(0, canvas.height / 2)
            ctx.lineTo(canvas.width, canvas.height / 2)
            ctx.stroke()

            // Cross road
            ctx.beginPath()
            ctx.moveTo(canvas.width / 2, 0)
            ctx.lineTo(canvas.width / 2, canvas.height)
            ctx.stroke()

            // Buildings
            ctx.fillStyle = "#cbd5e1"

            // Building 1
            ctx.fillRect(canvas.width / 4, canvas.height / 4, 50, 50)

            // Building 2
            ctx.fillRect((canvas.width / 4) * 3 - 50, canvas.height / 4, 50, 50)

            // Building 3
            ctx.fillRect(canvas.width / 4, (canvas.height / 4) * 3 - 50, 50, 50)

            // University building (our location)
            ctx.fillStyle = "#3b82f6"
            ctx.fillRect((canvas.width / 4) * 3 - 50, (canvas.height / 4) * 3 - 50, 50, 50)
        }

        // Initialize canvas
        mapRef.current.appendChild(canvas)
        resizeCanvas()

        // Handle resize
        window.addEventListener("resize", resizeCanvas)

        return () => {
            window.removeEventListener("resize", resizeCanvas)
            if (mapRef.current?.contains(canvas)) {
                mapRef.current.removeChild(canvas)
            }
        }
    }, [])

    return (
        <div className="h-full flex flex-col">
            <div className="relative flex-1 rounded-lg overflow-hidden" ref={mapRef}>
                {/* Map will be rendered here */}

                {/* Location marker */}
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <div className="relative">
                        <MapPin className="h-10 w-10 text-red-500" />
                        <motion.div
                            className="absolute -inset-2 rounded-full bg-red-500 opacity-20"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        />
                    </div>
                </motion.div>
            </div>

            <div className="mt-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">Research Building</h4>
                <p className="text-gray-700 dark:text-gray-300">123 University Ave, Anytown, ST 12345</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Located on the main campus, Building 4, Floor 3</p>
            </div>
        </div>
    )
}