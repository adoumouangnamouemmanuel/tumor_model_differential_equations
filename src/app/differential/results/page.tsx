"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, ArrowLeft, Brain, Dna, HeartPulse, Pizza, LineChart, BarChart3 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { RelationshipDiagram } from "@/components/results/relationship-diagram"

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

export default function ResultsPage() {
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
                    Study Results
                </h1>
                <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto">
                    Key findings and implications from the Normal-Tumor-Immune-Unhealthy Diet Model
                </p>
            </motion.div>

            {/* Key Findings Section */}
            <motion.section
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <h2 className="text-3xl font-bold mb-6 font-serif">Key Findings</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <Card className="border-none shadow-lg bg-white dark:bg-slate-800">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/20">
                                    <Brain className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h3 className="text-xl font-bold font-serif">Immune System Vulnerability</h3>
                            </div>
                            <p className="font-light">
                                Poor diet compromises immune function, allowing tumor cells to establish and grow rapidly beyond a
                                critical threshold.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-lg bg-white dark:bg-slate-800">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="p-2 rounded-full bg-purple-50 dark:bg-purple-900/20">
                                    <Dna className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                </div>
                                <h3 className="text-xl font-bold font-serif">Tumor Growth Dynamics</h3>
                            </div>
                            <p className="font-light">
                                Tumors show initial lag phase followed by exponential growth, creating a critical intervention window.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-lg bg-white dark:bg-slate-800">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="p-2 rounded-full bg-green-50 dark:bg-green-900/20">
                                    <Pizza className="h-6 w-6 text-green-600 dark:text-green-400" />
                                </div>
                                <h3 className="text-xl font-bold font-serif">Dietary Impact</h3>
                            </div>
                            <p className="font-light">
                                Diet directly affects immune efficiency, with quantifiable correlations to tumor establishment risk.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-lg bg-white dark:bg-slate-800">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="p-2 rounded-full bg-orange-50 dark:bg-orange-900/20">
                                    <HeartPulse className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                                </div>
                                <h3 className="text-xl font-bold font-serif">Normal Cell Resilience</h3>
                            </div>
                            <p className="font-light">
                                Healthy cells maintain stability when supported by proper immune function, even with some tumor
                                presence.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </motion.section>

            {/* Visualization Section */}
            <motion.section
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <h2 className="text-3xl font-bold mb-6 font-serif">System Dynamics</h2>

                <Tabs defaultValue="timeseries" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger value="timeseries" className="cursor-pointer">
                            Time Series Analysis
                        </TabsTrigger>
                        <TabsTrigger value="relationships" className="cursor-pointer">
                            Component Relationships
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="timeseries" className="space-y-6">
                        <Card className="border-none shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center font-serif">
                                    <LineChart className="h-5 w-5 mr-2 text-[hsl(var(--primary))]" />
                                    Cell Population Dynamics Over Time
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="aspect-video bg-muted rounded-lg overflow-hidden relative mb-6">
                                    <Image
                                        src="/images/fig5_reproduction.png"
                                        alt="Cell population dynamics"
                                        width={800}
                                        height={400}
                                        className="w-full h-full object-contain"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <p className="font-light">
                                        The time series analysis reveals three distinct phases in the system dynamics:
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                                            <h3 className="font-medium mb-2">Initial Phase (Days 0-5)</h3>
                                            <p className="text-sm font-light">
                                                Stable coexistence of normal cells and immune cells with minimal tumor presence
                                            </p>
                                        </div>

                                        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                                            <h3 className="font-medium mb-2">Transition Phase (Days 5-15)</h3>
                                            <p className="text-sm font-light">
                                                Rapid tumor growth accompanied by declining normal cell population and immune response
                                            </p>
                                        </div>

                                        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                                            <h3 className="font-medium mb-2">Final Phase (Days 15-30)</h3>
                                            <p className="text-sm font-light">
                                                New equilibrium with dominant tumor population, depleted normal cells, and exhausted immune
                                                response
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="relationships" className="space-y-6">
                        <Card className="border-none shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center font-serif">
                                    <BarChart3 className="h-5 w-5 mr-2 text-[hsl(var(--primary))]" />
                                    Component Interaction Analysis
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
                                    <RelationshipDiagram />
                                </div>

                                <div className="mt-6 space-y-4">
                                    <p className="font-light">
                                        The relationship diagram illustrates the complex interactions between diet quality, immune function,
                                        tumor growth, and normal cell health. Key relationships include:
                                    </p>

                                    <ul className="list-disc pl-6 space-y-2 font-light">
                                        <li>Positive influence of healthy diet on immune function</li>
                                        <li>Negative impact of tumor cells on normal cell populations</li>
                                        <li>Suppressive effect of properly functioning immune cells on tumor growth</li>
                                        <li>Protective relationship between immune cells and normal cells</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </motion.section>

            {/* Implications Section */}
            <motion.section
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
            >
                <h2 className="text-3xl font-bold mb-6 font-serif">Research Implications</h2>

                <Card className="border-none shadow-lg">
                    <CardContent className="p-6">
                        <div className="space-y-6">
                            <p className="font-light">
                                Our findings have several important implications for cancer prevention and treatment strategies:
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-900 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold mb-3 font-serif">Prevention Strategies</h3>
                                    <ul className="list-disc pl-6 space-y-2 font-light">
                                        <li>Dietary interventions should be considered a fundamental component of cancer prevention</li>
                                        <li>Early intervention during the initial phase of tumor development is critical</li>
                                        <li>
                                            Immune-boosting strategies may be most effective when implemented before significant tumor
                                            establishment
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-900 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold mb-3 font-serif">Treatment Approaches</h3>
                                    <ul className="list-disc pl-6 space-y-2 font-light">
                                        <li>
                                            Combined approaches targeting both tumor cells and supporting immune function show the most
                                            promise
                                        </li>
                                        <li>Dietary modifications should be integrated with conventional cancer treatments</li>
                                        <li>Personalized approaches based on individual immune function may improve outcomes</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="bg-muted p-6 rounded-lg">
                                <h3 className="text-lg font-semibold mb-3 font-serif">Future Research Directions</h3>
                                <p className="font-light">
                                    This model provides a foundation for future research exploring specific dietary components and their
                                    mechanisms of action on immune function and tumor development. Clinical studies are needed to validate
                                    these mathematical predictions and develop targeted interventions.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.section>

            {/* Navigation Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex justify-between"
            >
                <Button variant="outline" className="flex items-center gap-2" asChild>
                    <Link href="/differential/figure-replication">
                        <ArrowLeft className="h-4 w-4" /> Figure Replication
                    </Link>
                </Button>

                <Button className="flex items-center gap-2" asChild>
                    <Link href="/differential/modifications">
                        Model Modifications <ArrowRight className="h-4 w-4" />
                    </Link>
                </Button>
            </motion.div>
        </div>
    )
}