"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, LineChart, Pill, Salad } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

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

export default function ModifiedResultsPage() {
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
                className="mb-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600 font-serif">
                    Modified Model Results
                </h1>
                <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto">
                    Comparing original and enhanced model outcomes
                </p>
            </motion.div>

            {/* Cell Population Dynamics Comparison */}
            <motion.section
                className="mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <h2 className="text-3xl font-bold mb-6 font-serif">Cell Population Dynamics</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="border-none shadow-lg">
                        <CardHeader>
                            <CardTitle className="flex items-center font-serif">
                                <LineChart className="h-5 w-5 mr-2 text-[hsl(var(--primary))]" />
                                Original Model
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
                                <Image
                                    src="/images/fig5_reproduction.png"
                                    alt="Original model cell population dynamics"
                                    width={600}
                                    height={400}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div className="mt-4">
                                <p className="font-light text-sm">
                                    Original model: tumor cells rapidly overtake normal cells as immune cells become exhausted
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-lg">
                        <CardHeader>
                            <CardTitle className="flex items-center font-serif">
                                <LineChart className="h-5 w-5 mr-2 text-[hsl(var(--primary))]" />
                                Modified Model with Therapies
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
                                <Image
                                    src="/images/modified_cell_dynamics.png"
                                    alt="Modified model cell population dynamics"
                                    width={600}
                                    height={400}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div className="mt-4">
                                <p className="font-light text-sm">
                                    Modified model: combined therapies suppress tumor growth while normal cells recover
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </motion.section>

            {/* Additional Results */}
            <motion.section
                className="mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <h2 className="text-3xl font-bold mb-6 font-serif">Treatment Effects</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="border-none shadow-lg">
                        <CardHeader>
                            <CardTitle className="flex items-center font-serif">
                                <Pill className="h-5 w-5 mr-2 text-purple-600" />
                                Immunotherapy Dynamics
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
                                <Image
                                    src="/images/immunotherapy_dynamics.png"
                                    alt="Immunotherapy drug concentrations"
                                    width={600}
                                    height={400}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div className="mt-4">
                                <p className="font-light text-sm">
                                    Checkpoint inhibitors (magenta) and CAR-T cells (cyan) during treatment period (days 30-60)
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-lg">
                        <CardHeader>
                            <CardTitle className="flex items-center font-serif">
                                <Salad className="h-5 w-5 mr-2 text-green-600" />
                                Nutritional Intervention Effect
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
                                <Image
                                    src="/images/nutritional_intervention.png"
                                    alt="Nutritional intervention effect"
                                    width={600}
                                    height={400}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div className="mt-4">
                                <p className="font-light text-sm">
                                    Nutritional intervention builds up gradually from day 70, reaching equilibrium around day 85
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </motion.section>

            {/* Key Insights */}
            <motion.section
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
            >
                <h2 className="text-3xl font-bold mb-6 font-serif">Key Insights</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="border-none shadow-lg bg-white dark:bg-slate-800">
                        <CardContent className="p-6">
                            <h3 className="text-lg font-bold mb-3 font-serif">Therapeutic Synergy</h3>
                            <p className="font-light">
                                Sequential application of immunotherapy followed by nutritional support creates better outcomes than
                                either approach alone
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-lg bg-white dark:bg-slate-800">
                        <CardContent className="p-6">
                            <h3 className="text-lg font-bold mb-3 font-serif">Critical Timing</h3>
                            <p className="font-light">
                                Early immunotherapy (days 30-60) controls initial tumor growth, while later nutritional support (day
                                70+) maintains long-term health
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-lg bg-white dark:bg-slate-800">
                        <CardContent className="p-6">
                            <h3 className="text-lg font-bold mb-3 font-serif">Clinical Relevance</h3>
                            <p className="font-light">
                                Model suggests integrating nutritional counseling with standard immunotherapy protocols for improved
                                cancer care
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </motion.section>

            {/* Navigation Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex justify-between"
            >
                <Button variant="outline" className="flex items-center gap-2" asChild>
                    <Link href="/differential/modifications">
                        <ArrowLeft className="h-4 w-4" /> Model Modifications
                    </Link>
                </Button>
            </motion.div>
        </div>
    )
}