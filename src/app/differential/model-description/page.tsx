"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, ArrowLeft, Brain, Dna, HeartPulse, Pizza, Zap } from "lucide-react"
import { ModelAssumption } from "@/components/model/model-assumption"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ModelEquation } from "@/components/model/model-equation"
import { ModelDiagram } from "@/components/model/model-diagram"
import { BiologicalJustification } from "@/components/model/biological-justification"
import { Button } from "@/components/ui/button"
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

export default function ModelDescriptionPage() {
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

    // Model equation data
    const normalCellEquation = {
        equation: "\\frac{dN}{dt} = rN(1 - \\beta_1 N) - \\eta NI - \\gamma NT",
        parameters: [
            { symbol: "r", description: "Intrinsic growth rate of normal cells" },
            { symbol: "\\beta_1", description: "Determines the carrying capacity of normal cells" },
            { symbol: "\\eta", description: "Effect of immune cells on normal cells" },
            { symbol: "\\gamma", description: "Inhibitory effect of tumor cells on normal cells" },
        ],
        terms: [
            {
                name: "Logistic Growth",
                term: "rN(1 - \\beta_1 N)",
                description: "Represents the logistic growth of normal cells",
            },
            {
                name: "Immune System Interaction",
                term: "- \\eta NI",
                description: "Models potential autoimmune effects",
            },
            {
                name: "Tumor Competition Effect",
                term: "- \\gamma NT",
                description: "Captures tumor inhibition of normal cells",
            },
        ],
    }

    const tumorCellEquation = {
        equation: "\\frac{dT}{dt} = \\alpha_1 T(1-\\alpha_2 T) + \\beta_2 NT - \\alpha_3 TI",
        parameters: [
            { symbol: "\\alpha_1", description: "Intrinsic growth rate of tumor cells" },
            { symbol: "\\alpha_2", description: "Controls the tumor carrying capacity" },
            { symbol: "\\beta_2", description: "Effect of normal cells on tumor growth" },
            { symbol: "\\alpha_3", description: "Killing efficiency of immune cells against tumors" },
        ],
        terms: [
            {
                name: "Tumor Logistic Growth",
                term: "\\alpha_1 T(1-\\alpha_2 T)",
                description: "Represents the logistic growth of tumor cells",
            },
            {
                name: "Tumor Promotion",
                term: "\\beta_2 NT",
                description: "Tumor benefit from normal cell interactions",
            },
            {
                name: "Immune Suppression",
                term: "- \\alpha_3 TI",
                description: "Immune cells attacking tumor cells",
            },
        ],
    }

    const immuneCellEquation = {
        equation:
            "\\frac{dI}{dt} = \\sigma - \\delta I + \\frac{\\rho NI}{m + N} + \\frac{\\rho_1 TI}{m_1 + T} - \\mu NI - \\mu_1 TI",
        parameters: [
            { symbol: "\\sigma", description: "Baseline immune cell production rate" },
            { symbol: "\\delta", description: "Natural death rate of immune cells" },
            { symbol: "\\rho, \\rho_1", description: "Stimulation of immune cells by normal/tumor cells" },
            { symbol: "m, m_1", description: "Saturation effects on immune activation" },
            { symbol: "\\mu, \\mu_1", description: "Immune exhaustion parameters" },
        ],
        terms: [
            {
                name: "Immune Production & Decay",
                term: "\\sigma - \\delta I",
                description: "Baseline production and natural degradation",
            },
            {
                name: "Immune Activation",
                term: "\\frac{\\rho NI}{m + N} + \\frac{\\rho_1 TI}{m_1 + T}",
                description: "Activation by normal and tumor cells with saturation",
            },
            {
                name: "Immune Exhaustion",
                term: "- \\mu NI - \\mu_1 TI",
                description: "Immune cell exhaustion from excessive interactions",
            },
        ],
    }

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
                    Normal-Tumor-Immune-Unhealthy Diet Model
                </h1>
                <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto">
                    A mathematical framework describing interactions between normal cells, tumor cells, and immune response
                </p>
            </motion.div>

            {/* Model Overview */}
            <motion.section
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-6 font-serif">Model Overview</h2>
                        <p className="mb-4">
                            The NTIUNHDM is represented as a system of three differential equations capturing the interactions
                            between:
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <div className="mr-4 bg-[hsl(var(--primary))] bg-opacity-20 p-2 rounded-full">
                                    <HeartPulse className="h-5 w-5 text-[hsl(var(--primary))]" />
                                </div>
                                <div>
                                    <span className="font-bold">N(t):</span> Normal (healthy) cells
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="mr-4 bg-[hsl(var(--destructive))] bg-opacity-20 p-2 rounded-full">
                                    <Dna className="h-5 w-5 text-[hsl(var(--destructive))]" />
                                </div>
                                <div>
                                    <span className="font-bold">T(t):</span> Tumor cells
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="mr-4 bg-[hsl(var(--secondary))] bg-opacity-20 p-2 rounded-full">
                                    <Brain className="h-5 w-5 text-[hsl(var(--secondary))]" />
                                </div>
                                <div>
                                    <span className="font-bold">I(t):</span> Immune cells
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-[hsl(var(--card))] p-6 rounded-xl shadow-xl">
                        <ModelDiagram />
                    </div>
                </div>
            </motion.section>

            {/* Model Assumptions */}
            <motion.section
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <h2 className="text-3xl font-bold mb-6 font-serif">Key Model Assumptions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ModelAssumption
                        number={1}
                        title="Logistic Growth"
                        icon={<Zap className="h-5 w-5" />}
                        description="Normal and tumor cells follow logistic growth, accounting for resource limitations like oxygen, nutrients, and space."
                    />

                    <ModelAssumption
                        number={2}
                        title="Cell Competition"
                        icon={<ArrowRight className="h-5 w-5" />}
                        description="Tumor cells compete with normal cells for resources, introducing an inhibitory effect on normal cell survival."
                    />

                    <ModelAssumption
                        number={3}
                        title="Immune System Role"
                        icon={<Brain className="h-5 w-5" />}
                        description="The immune system eliminates tumor cells but can also attack normal cells. Its activation depends on both cell types."
                    />

                    <ModelAssumption
                        number={4}
                        title="Dietary Influence"
                        icon={<Pizza className="h-5 w-5" />}
                        description="An unhealthy diet weakens immune function, reducing effectiveness against tumor cells."
                    />
                </div>
            </motion.section>

            {/* Model Equations */}
            <motion.section
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
            >
                <h2 className="text-3xl font-bold mb-6 font-serif">Model Equations</h2>

                <Tabs defaultValue="normal" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-6">
                        <TabsTrigger value="normal" className="cursor-pointer">
                            Normal Cells
                        </TabsTrigger>
                        <TabsTrigger value="tumor" className="cursor-pointer">
                            Tumor Cells
                        </TabsTrigger>
                        <TabsTrigger value="immune" className="cursor-pointer">
                            Immune Cells
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="normal" className="space-y-6 border-none">
                        <Card className="shadow-lg border-none">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <HeartPulse className="h-5 w-5 mr-2 text-[hsl(var(--primary))]" />
                                    Normal Cell Dynamics
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ModelEquation {...normalCellEquation} />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="tumor" className="space-y-6">
                        <Card className="shadow-lg border-none">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Dna className="h-5 w-5 mr-2 text-[hsl(var(--destructive))]" />
                                    Tumor Cell Dynamics
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ModelEquation {...tumorCellEquation} />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="immune" className="space-y-6">
                        <Card className="shadow-lg border-none">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Brain className="h-5 w-5 mr-2 text-[hsl(var(--secondary))]" />
                                    Immune Cell Dynamics
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ModelEquation {...immuneCellEquation} />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </motion.section>

            {/* Biological Justifications */}
            <motion.section
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
            >
                <h2 className="text-3xl font-bold mb-6 font-serif">Biological Justifications</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <BiologicalJustification
                        title="Normal Cell Growth"
                        icon={<HeartPulse className="h-5 w-5" />}
                        description="The logistic term ensures normal cells stabilize due to limited resources, reflecting tissue homeostasis."
                    />

                    <BiologicalJustification
                        title="Tumor Competition"
                        icon={<Dna className="h-5 w-5" />}
                        description="Tumor cells outcompete normal cells, representing cancer progression where malignant cells displace healthy tissue."
                    />

                    <BiologicalJustification
                        title="Immune Regulation"
                        icon={<Brain className="h-5 w-5" />}
                        description="Immune cells are stimulated by both cell types but constrained by saturation and exhaustion effects."
                    />

                    <BiologicalJustification
                        title="Dietary Influence"
                        icon={<Pizza className="h-5 w-5" />}
                        description="An unhealthy diet affects immune function, altering the balance between tumor suppression and immune exhaustion."
                    />
                </div>
            </motion.section>

            {/* Navigation */}
            <div className="flex justify-between mt-16">
                <Button variant="outline" asChild>
                    <Link href="/differential/introduction" className="flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" /> Introduction
                    </Link>
                </Button>
                <Button variant="outline" asChild>
                    <Link href="/differential/results" className="flex items-center gap-2">
                        Study Results <ArrowRight className="h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}