"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, HeartPulse, Dna, Brain } from "lucide-react"
import Link from "next/link"

// Define a more specific type for MathJax instead of using 'any'
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

// Define types for MathJax
declare global {
    interface Window {
        MathJax: MathJaxObject | MathJaxConfig
    }
}

export default function IntroductionPage() {
    // Initialize MathJax when the component mounts
    useEffect(() => {
        // Function to initialize or re-render MathJax
        const initMathJax = () => {
            // Only run on client side
            if (typeof window === "undefined") return

            if (window.MathJax) {
                // If MathJax is already loaded, just typeset the page
                if ("typeset" in window.MathJax) {
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    window.MathJax.typeset && window.MathJax.typeset()
                }
            } else {
                // If MathJax isn't loaded yet, load it
                const script = document.createElement("script")
                script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
                script.async = true
                script.onload = () => {
                    // Configure MathJax
                    window.MathJax = {
                        tex: {
                            inlineMath: [["$$", "$$"]],
                            displayMath: [["\\[", "\\]"]],
                        },
                        svg: {
                            fontCache: "global",
                        },
                    }
                    // Typeset the page
                    if ("typeset" in window.MathJax) {
                        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                        window.MathJax.typeset && window.MathJax.typeset()
                    }
                }
                document.head.appendChild(script)
            }
        }

        // Initialize MathJax with a slight delay to avoid hydration issues
        const timer = setTimeout(() => {
            initMathJax()
        }, 100)

        return () => {
            clearTimeout(timer)
        }
    }, [])

    return (
        <div className="container max-w-6xl mx-auto py-12 px-4 md:px-6">
            {/* Hero Section */}
            <motion.div
                className="mb-16 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600 font-serif">
                    Introduction of the topic
                </h1>
                <p className="text-xl md:text-2xl text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto font-light tracking-wide">
                    NTIUNHDM: Normal-Tumor-Immune-Unhealthy Diet Model
                </p>
            </motion.div>

            {/* Main Content */}
            <motion.div
                className="mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <Card className="border-none shadow-lg overflow-hidden">
                    <CardContent className="p-0">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className="p-8 flex items-center">
                                <div>
                                    <h2 className="text-3xl font-bold mb-4 font-serif">Research Topic: Cancer</h2>
                                    <p className="text-lg leading-relaxed font-light">
                                        Cancer remains a leading cause of mortality worldwide, with dietary factors playing a
                                        significant but
                                        often underappreciated role in its development and progression.
                                    </p>
                                    <p className="text-lg leading-relaxed font-light mt-4">
                                        This research addresses the critical question: How do dietary choices influence immune
                                        function and
                                        subsequently affect cancer development?
                                        <br/>paper demonstrates that poor dietary habits can significantly impair immune
                                        surveillance,
                                        creating favorable conditions for tumor establishment and growth. This
                                        mathematical approach
                                        provides insights into how lifestyle factors influence cancer progression.
                                    </p>
                                </div>
                            </div>
                            <div
                                className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-900 p-8 flex items-center justify-center overflow-hidden">
                                <div className="relative w-full h-64">
                                    <EnhancedCellAnimation/>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>


            {/* Key Findings Preview */}
            <motion.div
                className="mb-16"
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8, delay: 0.7}}
            >
                <Card
                    className="border-none shadow-lg">
                    <CardContent className="p-8">
                        <h2 className="text-3xl font-bold mb-4 font-serif">Methodology</h2>
                        <p className="text-lg leading-relaxed font-light mb-4">
                            The Normal-Tumor-Immune-Unhealthy Diet Model (NTIUNHDM) employs a system of differential
                            equations to
                            simulate the dynamic interactions between normal cells, tumor cells, and immune cells under
                            the influence
                            of dietary factors.
                        </p>
                        <p className="text-lg leading-relaxed font-light">
                            Through numerical simulations and mathematical analysis, we explore how these complex
                            biological systems
                            respond to changes in immune function potentially caused by poor dietary habits.
                        </p>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Three Cell Types */}
            <motion.div
                className="mb-16"
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="border-none shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-900">
                        <CardContent className="p-6 text-center">
                            <motion.div
                                className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4"
                                animate={{
                                    scale: [1, 1.1, 1],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: "easeInOut",
                                }}
                            />
                            <h3 className="text-2xl font-bold mb-2 font-serif">Normal Cells</h3>
                            <p className="font-light">Cells with stable DNA that can be targeted by tumor cells</p>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-lg bg-gradient-to-br from-red-50 to-red-100 dark:from-slate-800 dark:to-slate-900">
                        <CardContent className="p-6 text-center">
                            <motion.div
                                className="w-16 h-16 bg-red-500 rounded-full mx-auto mb-4"
                                animate={{
                                    scale: [1, 1.2, 1],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: "easeInOut",
                                    delay: 0.5,
                                }}
                            />
                            <h3 className="text-2xl font-bold mb-2 font-serif">Tumor Cells</h3>
                            <p className="font-light">Cells that emerge when the immune system fails to eradicate abnormal cells</p>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-slate-800 dark:to-slate-900">
                        <CardContent className="p-6 text-center">
                            <motion.div
                                className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4"
                                animate={{
                                    scale: [1, 1.1, 1],
                                }}
                                transition={{
                                    duration: 3.5,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: "easeInOut",
                                }}
                            />
                            <h3 className="text-2xl font-bold mb-2 font-serif">Immune Cells</h3>
                            <p className="font-light">Cells responsible for protecting the body from cancerous cells</p>
                        </CardContent>
                    </Card>
                </div>
            </motion.div>


            {/* Navigation Section */}
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8, delay: 0.8}}
                className="flex justify-end"
            >
                <Button className="flex items-center gap-2" asChild>
                    <Link href="/differential/model-description">
                        Continue to Model Description <ArrowRight className="h-4 w-4"/>
                    </Link>
                </Button>
            </motion.div>
        </div>
    )
}

// Enhanced Cell Animation Component with fixed positions to avoid hydration errors
function EnhancedCellAnimation() {
    // Fixed positions for particles to avoid hydration errors
    const particlePositions = [
        { left: "37%", top: "60%", color: "bg-blue-500", delay: 0 },
        { left: "66%", top: "73%", color: "bg-red-500", delay: 0.2 },
        { left: "55%", top: "65%", color: "bg-green-500", delay: 0.4 },
        { left: "75%", top: "58%", color: "bg-blue-500", delay: 0.6 },
        { left: "34%", top: "21%", color: "bg-red-500", delay: 0.8 },
        { left: "73%", top: "60%", color: "bg-green-500", delay: 1.0 },
        { left: "52%", top: "49%", color: "bg-blue-500", delay: 1.2 },
        { left: "22%", top: "27%", color: "bg-red-500", delay: 1.4 },
        { left: "52%", top: "66%", color: "bg-green-500", delay: 1.6 },
        { left: "58%", top: "55%", color: "bg-blue-500", delay: 1.8 },
    ]

    return (
        <div className="relative w-full h-full">
            {/* Enhanced Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-indigo-50/20 to-purple-50/30 dark:from-slate-900/50 dark:via-indigo-900/30 dark:to-purple-900/50 rounded-xl overflow-hidden">
                {/* Background Patterns */}
                <div className="absolute inset-0 opacity-10">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>

                {/* Animated Background Circles */}
                <motion.div
                    className="absolute w-64 h-64 rounded-full bg-blue-500/5 dark:bg-blue-500/10"
                    style={{ top: "10%", left: "20%" }}
                    animate={{
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute w-48 h-48 rounded-full bg-red-500/5 dark:bg-red-500/10"
                    style={{ bottom: "5%", right: "15%" }}
                    animate={{
                        scale: [1, 1.3, 1],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: 2,
                    }}
                />
                <motion.div
                    className="absolute w-40 h-40 rounded-full bg-green-500/5 dark:bg-green-500/10"
                    style={{ top: "30%", right: "25%" }}
                    animate={{
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: 1,
                    }}
                />
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                    {/* Normal Cells */}
                    <motion.div
                        className="absolute w-24 h-24 rounded-full bg-blue-500/20 border border-blue-500/40 shadow-lg shadow-blue-500/10 backdrop-blur-sm"
                        animate={{
                            scale: [1, 1.05, 1],
                            x: [0, 10, 0],
                            y: [0, -10, 0],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                        }}
                        style={{ left: "30%", top: "20%" }}
                    >
                        <motion.div
                            className="absolute inset-0 rounded-full bg-blue-500/10"
                            animate={{
                                scale: [0.8, 1.2, 0.8],
                                opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                            }}
                        />
                        <HeartPulse className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-blue-500/80" />
                    </motion.div>

                    {/* Tumor Cells */}
                    <motion.div
                        className="absolute w-28 h-28 rounded-full bg-red-500/20 border border-red-500/40 shadow-lg shadow-red-500/10 backdrop-blur-sm"
                        animate={{
                            scale: [1, 1.1, 1],
                            x: [0, -15, 0],
                            y: [0, 15, 0],
                        }}
                        transition={{
                            duration: 6,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                        }}
                        style={{ right: "25%", bottom: "25%" }}
                    >
                        <motion.div
                            className="absolute inset-0 rounded-full bg-red-500/10"
                            animate={{
                                scale: [0.8, 1.2, 0.8],
                                opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                                delay: 1,
                            }}
                        />
                        <Dna className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-10 w-10 text-red-500/80" />
                    </motion.div>

                    {/* Immune Cells */}
                    <motion.div
                        className="absolute w-20 h-20 rounded-full bg-green-500/20 border border-green-500/40 shadow-lg shadow-green-500/10 backdrop-blur-sm"
                        animate={{
                            scale: [1, 1.08, 1],
                            x: [0, 20, 0],
                            y: [0, 20, 0],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                        }}
                        style={{ right: "35%", top: "30%" }}
                    >
                        <motion.div
                            className="absolute inset-0 rounded-full bg-green-500/10"
                            animate={{
                                scale: [0.8, 1.2, 0.8],
                                opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{
                                duration: 3.5,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                                delay: 0.5,
                            }}
                        />
                        <Brain className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-7 w-7 text-green-500/80" />
                    </motion.div>

                    {/* Enhanced Connection Lines */}
                    <svg className="absolute inset-0 w-full h-full">
                        {/* Gradient definitions */}
                        <defs>
                            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.7)" />
                                <stop offset="100%" stopColor="rgba(59, 130, 246, 0.2)" />
                            </linearGradient>
                            <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="rgba(239, 68, 68, 0.7)" />
                                <stop offset="100%" stopColor="rgba(239, 68, 68, 0.2)" />
                            </linearGradient>
                            <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="rgba(34, 197, 94, 0.7)" />
                                <stop offset="100%" stopColor="rgba(34, 197, 94, 0.2)" />
                            </linearGradient>
                        </defs>

                        {/* Animated particles along paths */}
                        <motion.path
                            d="M100,60 C130,100 160,120 180,120"
                            stroke="url(#blueGradient)"
                            strokeWidth="1.5"
                            strokeDasharray="5,5"
                            fill="none"
                            animate={{
                                opacity: [0.4, 0.8, 0.4],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Number.POSITIVE_INFINITY,
                            }}
                        />
                        <motion.circle
                            cx="0"
                            cy="0"
                            r="2"
                            fill="#3b82f6"
                            animate={{
                                cx: [100, 130, 160, 180],
                                cy: [60, 100, 120, 120],
                                opacity: [0, 1, 1, 0],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                            }}
                        />

                        <motion.path
                            d="M180,120 C160,140 140,160 120,170"
                            stroke="url(#redGradient)"
                            strokeWidth="1.5"
                            strokeDasharray="5,5"
                            fill="none"
                            animate={{
                                opacity: [0.4, 0.8, 0.4],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Number.POSITIVE_INFINITY,
                                delay: 1,
                            }}
                        />
                        <motion.circle
                            cx="0"
                            cy="0"
                            r="2"
                            fill="#ef4444"
                            animate={{
                                cx: [180, 160, 140, 120],
                                cy: [120, 140, 160, 170],
                                opacity: [0, 1, 1, 0],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                                delay: 1,
                            }}
                        />

                        <motion.path
                            d="M120,170 C140,140 160,110 180,80"
                            stroke="url(#greenGradient)"
                            strokeWidth="1.5"
                            strokeDasharray="5,5"
                            fill="none"
                            animate={{
                                opacity: [0.4, 0.8, 0.4],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Number.POSITIVE_INFINITY,
                                delay: 2,
                            }}
                        />
                        <motion.circle
                            cx="0"
                            cy="0"
                            r="2"
                            fill="#22c55e"
                            animate={{
                                cx: [120, 140, 160, 180],
                                cy: [170, 140, 110, 80],
                                opacity: [0, 1, 1, 0],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                                delay: 2,
                            }}
                        />
                    </svg>

                    {/* Small floating particles with fixed positions */}
                    {particlePositions.map((particle, i) => (
                        <motion.div
                            key={i}
                            className={`absolute w-1 h-1 rounded-full ${particle.color}`}
                            style={{
                                left: particle.left,
                                top: particle.top,
                            }}
                            animate={{
                                x: [0, i % 2 === 0 ? 10 : -10],
                                y: [0, i % 3 === 0 ? -10 : 10],
                                opacity: [0.2, 0.7, 0.2],
                            }}
                            transition={{
                                duration: 3 + (i % 2),
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "reverse",
                                delay: particle.delay,
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}