"use client"

import { useState, useEffect, useRef } from "react"
import { Slider } from "@/components/ui/slider"

type ModelType = "normal" | "tumor" | "immune"

interface ModelInteractiveProps {
    type: ModelType
}

export function ModelInteractive({ type }: ModelInteractiveProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [time, setTime] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [parameters, setParameters] = useState({
        // Normal cell parameters
        r: 0.5, // growth rate
        beta1: 0.01, // carrying capacity factor
        eta: 0.1, // immune attack rate
        gamma: 0.1, // tumor inhibition rate

        // Tumor cell parameters
        alpha1: 0.6, // growth rate
        alpha2: 0.01, // carrying capacity factor
        beta2: 0.2, // normal cell stimulation
        alpha3: 0.2, // immune killing efficiency

        // Immune cell parameters
        sigma: 0.1, // baseline production
        delta: 0.1, // natural death rate
        rho: 0.2, // normal cell stimulation
        rho1: 0.3, // tumor cell stimulation
        m: 1.0, // normal saturation
        m1: 1.0, // tumor saturation
        mu: 0.1, // normal exhaustion
        mu1: 0.1, // tumor exhaustion
    })

    // Animation frame
    useEffect(() => {
        if (!isPlaying) return

        const interval = setInterval(() => {
            setTime((prev) => (prev + 0.1) % 100)
        }, 100)

        return () => clearInterval(interval)
    }, [isPlaying])

    // Draw the simulation
    useEffect(() => {
        if (!canvasRef.current) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Set dimensions
        const width = canvas.width
        const height = canvas.height

        // Draw grid
        ctx.strokeStyle = "rgba(200, 200, 200, 0.3)"
        ctx.lineWidth = 1

        // Vertical grid lines
        for (let x = 0; x <= width; x += width / 10) {
            ctx.beginPath()
            ctx.moveTo(x, 0)
            ctx.lineTo(x, height)
            ctx.stroke()
        }

        // Horizontal grid lines
        for (let y = 0; y <= height; y += height / 5) {
            ctx.beginPath()
            ctx.moveTo(0, y)
            ctx.lineTo(width, y)
            ctx.stroke()
        }

        // Draw axes
        ctx.strokeStyle = "rgba(100, 100, 100, 0.8)"
        ctx.lineWidth = 2

        // X-axis (time)
        ctx.beginPath()
        ctx.moveTo(0, height - 20)
        ctx.lineTo(width, height - 20)
        ctx.stroke()

        // Y-axis (population)
        ctx.beginPath()
        ctx.moveTo(20, 0)
        ctx.lineTo(20, height)
        ctx.stroke()

        // Label axes
        ctx.fillStyle = "rgba(100, 100, 100, 0.8)"
        ctx.font = "12px sans-serif"
        ctx.fillText("Time", width - 30, height - 5)
        ctx.fillText("Population", 5, 15)

        // Simulate the model
        const dt = 0.01
        const tMax = 10
        const numPoints = Math.min(Math.floor(((time / 100) * tMax) / dt), 1000)

        let N = 1.0 // Initial normal cell population
        let T = 0.1 // Initial tumor cell population
        let I = 0.1 // Initial immune cell population

        const normalPoints: [number, number][] = []
        const tumorPoints: [number, number][] = []
        const immunePoints: [number, number][] = []

        for (let i = 0; i < numPoints; i++) {
            const t = i * dt

            // Store current points
            normalPoints.push([t, N])
            tumorPoints.push([t, T])
            immunePoints.push([t, I])

            // Calculate derivatives
            const dN = parameters.r * N * (1 - parameters.beta1 * N) - parameters.eta * N * I - parameters.gamma * N * T
            const dT =
                parameters.alpha1 * T * (1 - parameters.alpha2 * T) + parameters.beta2 * N * T - parameters.alpha3 * T * I
            const dI =
                parameters.sigma -
                parameters.delta * I +
                (parameters.rho * N * I) / (parameters.m + N) +
                (parameters.rho1 * T * I) / (parameters.m1 + T) -
                parameters.mu * N * I -
                parameters.mu1 * T * I

            // Update using Euler method
            N += dN * dt
            T += dT * dt
            I += dI * dt

            // Ensure non-negative values
            N = Math.max(0, N)
            T = Math.max(0, T)
            I = Math.max(0, I)
        }

        // Scale points to canvas
        const scaleX = (t: number) => 20 + (t / tMax) * (width - 40)
        const scaleY = (p: number) => height - 20 - (p * (height - 40)) / 2

        // Draw normal cell curve
        ctx.strokeStyle = "hsl(var(--primary))"
        ctx.lineWidth = 3
        ctx.beginPath()
        normalPoints.forEach(([t, p], i) => {
            if (i === 0) {
                ctx.moveTo(scaleX(t), scaleY(p))
            } else {
                ctx.lineTo(scaleX(t), scaleY(p))
            }
        })
        ctx.stroke()

        // Draw tumor cell curve
        ctx.strokeStyle = "hsl(var(--destructive))"
        ctx.lineWidth = 3
        ctx.beginPath()
        tumorPoints.forEach(([t, p], i) => {
            if (i === 0) {
                ctx.moveTo(scaleX(t), scaleY(p))
            } else {
                ctx.lineTo(scaleX(t), scaleY(p))
            }
        })
        ctx.stroke()

        // Draw immune cell curve
        ctx.strokeStyle = "hsl(var(--secondary))"
        ctx.lineWidth = 3
        ctx.beginPath()
        immunePoints.forEach(([t, p], i) => {
            if (i === 0) {
                ctx.moveTo(scaleX(t), scaleY(p))
            } else {
                ctx.lineTo(scaleX(t), scaleY(p))
            }
        })
        ctx.stroke()

        // Draw legend
        const legendItems = [
            { label: "Normal Cells (N)", color: "hsl(var(--primary))" },
            { label: "Tumor Cells (T)", color: "hsl(var(--destructive))" },
            { label: "Immune Cells (I)", color: "hsl(var(--secondary))" },
        ]

        legendItems.forEach((item, i) => {
            const y = 40 + i * 20

            // Line
            ctx.strokeStyle = item.color
            ctx.lineWidth = 3
            ctx.beginPath()
            ctx.moveTo(width - 150, y)
            ctx.lineTo(width - 120, y)
            ctx.stroke()

            // Label
            ctx.fillStyle = "rgba(100, 100, 100, 0.8)"
            ctx.font = "12px sans-serif"
            ctx.fillText(item.label, width - 115, y + 4)
        })
    }, [time, parameters, type])

    // Parameter controls based on model type
    const renderControls = () => {
        switch (type) {
            case "normal":
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium">Growth Rate (r): {parameters.r.toFixed(2)}</label>
                            <Slider
                                value={[parameters.r]}
                                min={0.1}
                                max={1.0}
                                step={0.01}
                                onValueChange={([value]) => setParameters((prev) => ({ ...prev, r: value }))}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium">
                                Carrying Capacity Factor (β₁): {parameters.beta1.toFixed(3)}
                            </label>
                            <Slider
                                value={[parameters.beta1]}
                                min={0.001}
                                max={0.05}
                                step={0.001}
                                onValueChange={([value]) => setParameters((prev) => ({ ...prev, beta1: value }))}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Immune Attack Rate (η): {parameters.eta.toFixed(2)}</label>
                            <Slider
                                value={[parameters.eta]}
                                min={0.01}
                                max={0.5}
                                step={0.01}
                                onValueChange={([value]) => setParameters((prev) => ({ ...prev, eta: value }))}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Tumor Inhibition Rate (γ): {parameters.gamma.toFixed(2)}</label>
                            <Slider
                                value={[parameters.gamma]}
                                min={0.01}
                                max={0.5}
                                step={0.01}
                                onValueChange={([value]) => setParameters((prev) => ({ ...prev, gamma: value }))}
                            />
                        </div>
                    </div>
                )
            case "tumor":
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium">Growth Rate (α₁): {parameters.alpha1.toFixed(2)}</label>
                            <Slider
                                value={[parameters.alpha1]}
                                min={0.1}
                                max={1.0}
                                step={0.01}
                                onValueChange={([value]) => setParameters((prev) => ({ ...prev, alpha1: value }))}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium">
                                Carrying Capacity Factor (α₂): {parameters.alpha2.toFixed(3)}
                            </label>
                            <Slider
                                value={[parameters.alpha2]}
                                min={0.001}
                                max={0.05}
                                step={0.001}
                                onValueChange={([value]) => setParameters((prev) => ({ ...prev, alpha2: value }))}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Normal Cell Stimulation (β₂): {parameters.beta2.toFixed(2)}</label>
                            <Slider
                                value={[parameters.beta2]}
                                min={0.01}
                                max={0.5}
                                step={0.01}
                                onValueChange={([value]) => setParameters((prev) => ({ ...prev, beta2: value }))}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium">
                                Immune Killing Efficiency (α₃): {parameters.alpha3.toFixed(2)}
                            </label>
                            <Slider
                                value={[parameters.alpha3]}
                                min={0.01}
                                max={0.5}
                                step={0.01}
                                onValueChange={([value]) => setParameters((prev) => ({ ...prev, alpha3: value }))}
                            />
                        </div>
                    </div>
                )
            case "immune":
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium">Baseline Production (σ): {parameters.sigma.toFixed(2)}</label>
                            <Slider
                                value={[parameters.sigma]}
                                min={0.01}
                                max={0.3}
                                step={0.01}
                                onValueChange={([value]) => setParameters((prev) => ({ ...prev, sigma: value }))}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Natural Death Rate (δ): {parameters.delta.toFixed(2)}</label>
                            <Slider
                                value={[parameters.delta]}
                                min={0.01}
                                max={0.3}
                                step={0.01}
                                onValueChange={([value]) => setParameters((prev) => ({ ...prev, delta: value }))}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Normal Cell Stimulation (ρ): {parameters.rho.toFixed(2)}</label>
                            <Slider
                                value={[parameters.rho]}
                                min={0.01}
                                max={0.5}
                                step={0.01}
                                onValueChange={([value]) => setParameters((prev) => ({ ...prev, rho: value }))}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Tumor Cell Stimulation (ρ₁): {parameters.rho1.toFixed(2)}</label>
                            <Slider
                                value={[parameters.rho1]}
                                min={0.01}
                                max={0.5}
                                step={0.01}
                                onValueChange={([value]) => setParameters((prev) => ({ ...prev, rho1: value }))}
                            />
                        </div>
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <div className="bg-[hsl(var(--card))] p-6 rounded-xl shadow-lg border border-[hsl(var(--border))]">
            <h3 className="text-lg font-bold mb-4">Interactive Simulation</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                    <canvas
                        ref={canvasRef}
                        width={600}
                        height={300}
                        className="w-full h-[300px] bg-[hsl(var(--background))] rounded-md border border-[hsl(var(--border))]"
                    />

                    <div className="flex items-center justify-between mt-4">
                        <button
                            className={`px-4 py-2 rounded-md ${
                                isPlaying
                                    ? "bg-[hsl(var(--destructive))] text-[hsl(var(--destructive-foreground))]"
                                    : "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
                            }`}
                            onClick={() => setIsPlaying(!isPlaying)}
                        >
                            {isPlaying ? "Pause" : "Play"}
                        </button>

                        <button
                            className="px-4 py-2 rounded-md bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]"
                            onClick={() => {
                                setTime(0)
                                setIsPlaying(false)
                            }}
                        >
                            Reset
                        </button>

                        <div className="flex items-center">
                            <span className="mr-2 text-sm">Time:</span>
                            <Slider
                                value={[time]}
                                min={0}
                                max={100}
                                step={0.1}
                                className="w-[150px]"
                                onValueChange={([value]) => {
                                    setTime(value)
                                    setIsPlaying(false)
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h4 className="font-medium">Adjust Parameters</h4>
                    {renderControls()}
                </div>
            </div>
        </div>
    )
}