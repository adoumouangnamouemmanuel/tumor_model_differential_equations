"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, Box, LineChart, FileVideo } from 'lucide-react'
import Link from "next/link"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { SectionHeader } from "@/components/code-explanation/section-header"

// Define types for MathJax
interface MathJaxConfig {
    tex: {
        inlineMath: string[][]
        displayMath: string[][]
    }
    svg: {
        fontCache: string
    }
}

interface MathJaxObject {
    typeset?: () => void
    [key: string]: unknown
}

declare global {
    interface Window {
        MathJax: MathJaxObject | MathJaxConfig
    }
}

export default function VisualizationsPage() {
    // Initialize MathJax
    useEffect(() => {
        const initMathJax = () => {
            if (typeof window === "undefined") return

            if (window.MathJax) {
                if ("typeset" in window.MathJax) {
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    window.MathJax.typeset && window.MathJax.typeset()
                }
            } else {
                const script = document.createElement("script")
                script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
                script.async = true
                script.onload = () => {
                    window.MathJax = {
                        tex: {
                            inlineMath: [["$$", "$$"]],
                            displayMath: [["\\[", "\\]"]],
                        },
                        svg: {
                            fontCache: "global",
                        },
                    }
                    if ("typeset" in window.MathJax) {
                        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                        window.MathJax.typeset && window.MathJax.typeset()
                    }
                }
                document.head.appendChild(script)
            }
        }

        setTimeout(initMathJax, 100)
    }, [])

    return (
        <div className="container max-w-6xl mx-auto py-12 px-4 md:px-6">
            {/* Hero Section */}
            <motion.div
                className="mb-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600 font-serif">
                    Visualizations
                </h1>
                <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto">
                    Mathematical modeling of tumor-immune dynamics through advanced visualization techniques
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Side Navigation */}
                <div className="hidden md:block">
                    <VisualizationsSideNav />
                </div>

                {/* Main Content */}
                <div className="md:col-span-3 space-y-12">
                    {/* Time Series Section */}
                    <section id="time-series">
                        <Card className="border-none shadow-lg overflow-hidden">
                            <CardContent className="p-6">
                                <SectionHeader title="Time Series Visualization" icon={LineChart} />

                                <div className="mb-6 rounded-xl overflow-hidden shadow-lg">
                                    <img
                                        src="/images/fig5_reproduction.png"
                                        alt="Time Series Plot"
                                        className="w-full h-auto"
                                    />
                                    <div className="bg-muted p-3 text-sm text-center">
                                        Figure 1: Time series plot showing population dynamics
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </section>

                    {/* 3D Visualization Section */}
                    <section id="3d-visualization">
                        <Card className="border-none shadow-lg overflow-hidden">
                            <CardContent className="p-6">
                                <SectionHeader title="3D Phase Space Visualization" icon={Box} />

                                <div className="mb-6 rounded-xl overflow-hidden shadow-lg">
                                    <img
                                        src="/images/3d_phase_space.png"
                                        alt="3D Phase Space"
                                        className="w-full h-auto"
                                    />
                                    <div className="bg-muted p-3 text-sm text-center">
                                        Figure 2: 3D phase space trajectory
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </section>

                    {/* Animation Section */}
                    <section id="animation">
                        <Card className="border-none shadow-lg overflow-hidden">
                            <CardContent className="p-6">
                                <SectionHeader title="Dynamic Animations" icon={FileVideo} />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div className="rounded-xl overflow-hidden shadow-lg">
                                        <video
                                            controls
                                            className="w-full h-auto"
                                            style={{ maxHeight: "250px" }}
                                        >
                                            <source src="/videos/simulation.mp4" type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                        <div className="bg-muted p-3 text-sm text-center">
                                            Video 1: 2D Model Animation
                                        </div>
                                    </div>

                                    <div className="rounded-xl overflow-hidden shadow-lg">
                                        <video
                                            controls
                                            className="w-full h-auto"
                                            style={{ maxHeight: "250px" }}
                                        >
                                            <source src="/videos/3d_phase.mp4" type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                        <div className="bg-muted p-3 text-sm text-center">
                                            Video 2: 3D Phase Space Animation
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div className="rounded-xl overflow-hidden shadow-lg">
                                        <video
                                            controls
                                            className="w-full h-auto"
                                            style={{ maxHeight: "250px" }}
                                        >
                                            <source src="/videos/2d_modified.mp4" type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                        <div className="bg-muted p-3 text-sm text-center">
                                            Video 3: 2D Modified Model
                                        </div>
                                    </div>

                                    <div className="rounded-xl overflow-hidden shadow-lg">
                                        <video
                                            controls
                                            className="w-full h-auto"
                                            style={{ maxHeight: "250px" }}
                                        >
                                            <source src="/videos/3d_modified.mp4" type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                        <div className="bg-muted p-3 text-sm text-center">
                                            Video 4: 3D Modified Model
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div className="rounded-xl overflow-hidden shadow-lg">
                                        <video
                                            controls
                                            className="w-full h-auto"
                                            style={{ maxHeight: "250px" }}
                                        >
                                            <source src="/videos/immunotherapy.mp4" type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                        <div className="bg-muted p-3 text-sm text-center">
                                            Video 5: Immunotherapy Simulation
                                        </div>
                                    </div>

                                    <div className="rounded-xl overflow-hidden shadow-lg">
                                        <video
                                            controls
                                            className="w-full h-auto"
                                            style={{ maxHeight: "250px" }}
                                        >
                                            <source src="/videos/nutritional_support.mp4" type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                        <div className="bg-muted p-3 text-sm text-center">
                                            Video 6: Nutritional Support Simulation
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-xl overflow-hidden shadow-lg mb-6">
                                    <video
                                        controls
                                        className="w-full h-auto"
                                        style={{ maxHeight: "400px" }}
                                    >
                                        <source src="/videos/promo_demo.mp4" type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                    <div className="bg-muted p-3 text-sm text-center">
                                        Video 7: Promotional Video
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </section>

                    {/* Parameter Exploration Section */}
                    <section id="parameter-exploration">
                        <Card className="border-none shadow-lg overflow-hidden">
                            <CardContent className="p-6">
                                <SectionHeader title="Parameter Exploration" icon={BarChart3} />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div className="rounded-xl overflow-hidden shadow-lg">
                                        <img
                                            src="/images/NTIUNHDM_Sensitivity.png"
                                            alt="Parameter Heatmap"
                                            className="w-full h-auto"
                                        />
                                        <div className="bg-muted p-3 text-sm text-center">
                                            Figure 3: Heatmap showing tumor growth sensitivity
                                        </div>
                                    </div>
                                    <div className="rounded-xl overflow-hidden shadow-lg">
                                        <img
                                            src="/placeholder.svg?height=250&width=500"
                                            alt="3D Parameter Surface"
                                            className="w-full h-auto"
                                        />
                                        <div className="bg-muted p-3 text-sm text-center">
                                            Figure 4: 3D surface plot of parameter response
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </section>

                    {/* Navigation */}
                    <div className="flex justify-between">
                        <Button variant="outline" className="flex items-center gap-2" asChild>
                            <Link href="/applied-programming/error-analysis">
                                <ArrowRight className="h-4 w-4 rotate-180" /> Error Analysis
                            </Link>
                        </Button>

                        <Button className="flex items-center gap-2" asChild>
                            <Link href="/applied-programming/conclusions">
                                Conclusions <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function VisualizationsSideNav() {
    const [activeSection, setActiveSection] = useState("time-series")

    const navItems = [
        { id: "time-series", title: "Time Series", icon: <LineChart className="h-4 w-4" /> },
        { id: "3d-visualization", title: "3D Visualization", icon: <Box className="h-4 w-4" /> },
        { id: "animation", title: "Animation", icon: <FileVideo className="h-4 w-4" /> },
        { id: "parameter-exploration", title: "Parameter Exploration", icon: <BarChart3 className="h-4 w-4" /> },
    ]

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id)
                    }
                })
            },
            { threshold: 0.2 },
        )

        navItems.forEach((item) => {
            const element = document.getElementById(item.id)
            if (element) observer.observe(element)
        })

        return () => {
            navItems.forEach((item) => {
                const element = document.getElementById(item.id)
                if (element) observer.unobserve(element)
            })
        }
    }, [])

    return (
        <motion.div
            className="fixed top-24 h-fit"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <nav className="space-y-1">
                {navItems.map((item) => (
                    <Link
                        key={item.id}
                        href={`#${item.id}`}
                        className={cn(
                            "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                            activeSection === item.id
                                ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                                : "hover:bg-muted",
                        )}
                        onClick={(e) => {
                            e.preventDefault()
                            document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })
                        }}
                    >
                        {item.icon}
                        {item.title}
                    </Link>
                ))}
            </nav>
        </motion.div>
    )
}