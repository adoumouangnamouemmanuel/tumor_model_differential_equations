"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, ArrowLeft, Salad, Syringe, HeartPulse, Dna, Brain } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ModelEquation } from "@/components/model/model-equation"

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

export default function ModificationsPage() {
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

    // Modified model equation data
    const normalCellEquation = {
        equation: "\\frac{dN}{dt} = r N(1 - \\beta_1 N)(1 + f F) - \\eta NI - \\gamma NT",
        parameters: [
            { symbol: "r", description: "Intrinsic growth rate of normal cells" },
            { symbol: "\\beta_1", description: "Determines the carrying capacity of normal cells" },
            { symbol: "f", description: "Nutritional impact coefficient" },
            { symbol: "F", description: "Nutritional intervention effect" },
        ],
        terms: [
            {
                name: "Enhanced Logistic Growth",
                term: "rN(1 - \\beta_1 N)(1 + f F)",
                description: "Nutritional intervention enhances normal cell growth",
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
        equation: "\\frac{dT}{dt} = \\alpha_1 T(1-\\alpha_2 T)(1 - f F) + \\beta_2 NT - \\alpha_3 TI",
        parameters: [
            { symbol: "\\alpha_1", description: "Intrinsic growth rate of tumor cells" },
            { symbol: "\\alpha_2", description: "Controls the tumor carrying capacity" },
            { symbol: "f", description: "Nutritional impact coefficient" },
            { symbol: "F", description: "Nutritional intervention effect" },
        ],
        terms: [
            {
                name: "Inhibited Tumor Growth",
                term: "\\alpha_1 T(1-\\alpha_2 T)(1 - f F)",
                description: "Nutritional intervention reduces tumor growth",
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
            "\\frac{dI}{dt} = \\sigma - \\delta I + \\frac{\\rho NI}{m + N} + \\frac{\\rho_1 TI}{m_1 + T} - \\mu NI - \\mu_1 TI + \\tau_1 C_1 + \\tau_2 C_2",
        parameters: [
            { symbol: "\\sigma", description: "Baseline immune cell production rate" },
            { symbol: "\\delta", description: "Natural death rate of immune cells" },
            { symbol: "\\tau_1", description: "Checkpoint inhibitor efficacy" },
            { symbol: "\\tau_2", description: "CAR-T cell efficacy" },
            { symbol: "C_1", description: "Checkpoint inhibitor concentration" },
            { symbol: "C_2", description: "CAR-T cell concentration" },
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
            {
                name: "Immunotherapy Effect",
                term: "\\tau_1 C_1 + \\tau_2 C_2",
                description: "Boost to immune function from immunotherapy",
            },
        ],
    }

    const immunotherapyEquations = {
        equation: "\\frac{dC_1}{dt} = k_1 u_{immuno}(t) - \\gamma_1 C_1",
        parameters: [
            { symbol: "k_1", description: "Checkpoint inhibitor absorption rate" },
            { symbol: "\\gamma_1", description: "Checkpoint inhibitor clearance rate" },
            { symbol: "u_{immuno}(t)", description: "Treatment protocol (1 during days 30-60, 0 otherwise)" },
        ],
        terms: [
            {
                name: "Drug Administration",
                term: "k_1 u_{immuno}(t)",
                description: "Rate of drug administration during treatment period",
            },
            {
                name: "Drug Clearance",
                term: "- \\gamma_1 C_1",
                description: "Natural clearance of drugs from the system",
            },
        ],
    }

    const carTEquations = {
        equation: "\\frac{dC_2}{dt} = k_2 u_{immuno}(t) - \\gamma_2 C_2",
        parameters: [
            { symbol: "k_2", description: "CAR-T cell absorption rate" },
            { symbol: "\\gamma_2", description: "CAR-T cell clearance rate" },
            { symbol: "u_{immuno}(t)", description: "Treatment protocol (1 during days 30-60, 0 otherwise)" },
        ],
        terms: [
            {
                name: "Cell Administration",
                term: "k_2 u_{immuno}(t)",
                description: "Rate of CAR-T cell administration during treatment period",
            },
            {
                name: "Cell Clearance",
                term: "- \\gamma_2 C_2",
                description: "Natural clearance of CAR-T cells from the system",
            },
        ],
    }

    const nutritionEquation = {
        equation: "\\frac{dF}{dt} = \\epsilon u_{nutrition}(t) - \\phi F",
        parameters: [
            { symbol: "\\epsilon", description: "Intervention uptake rate" },
            { symbol: "\\phi", description: "Natural decay rate" },
            { symbol: "u_{nutrition}(t)", description: "Nutritional protocol (1 from day 70 onward, 0 before)" },
        ],
        terms: [
            {
                name: "Intervention Uptake",
                term: "\\epsilon u_{nutrition}(t)",
                description: "Rate of nutritional intervention uptake",
            },
            {
                name: "Natural Decay",
                term: "- \\phi F",
                description: "Metabolic clearance of nutritional factors",
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
                    Model Modifications
                </h1>
                <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto">
                    Extending the NTIUNHDM with immunotherapy and nutritional interventions
                </p>
            </motion.div>

            {/* Introduction to Modifications */}
            <motion.section
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-6 font-serif">Enhanced Therapeutic Model</h2>
                        <p className="mb-4">
                            We extended the original NTIUNHDM to incorporate two clinically relevant interventions:
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <div className="mr-4 bg-purple-500 bg-opacity-20 p-2 rounded-full">
                                    <Syringe className="h-5 w-5 text-purple-600" />
                                </div>
                                <div>
                                    <span className="font-bold">Immunotherapy:</span> Checkpoint inhibitors and CAR-T cells that enhance
                                    immune response against tumor cells
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="mr-4 bg-green-500 bg-opacity-20 p-2 rounded-full">
                                    <Salad className="h-5 w-5 text-green-600" />
                                </div>
                                <div>
                                    <span className="font-bold">Nutritional Support:</span> Targeted dietary intervention that enhances
                                    normal cell growth while inhibiting tumor proliferation
                                </div>
                            </li>
                        </ul>
                        <div className="mt-6">
                            <h3 className="text-xl font-bold mb-3 font-serif">Treatment Protocols</h3>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <span className="inline-block w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                                    <span>Immunotherapy: Applied during days 30-60</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                                    <span>Nutritional Support: Begins at day 70 and continues</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-900 p-6 rounded-xl shadow-xl">
                        <div className="relative w-full h-64">
                            <TherapeuticInteractionDiagram />
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Modified Equations */}
            <motion.section
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <h2 className="text-3xl font-bold mb-6 font-serif">Modified Model Equations</h2>

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
                                    <HeartPulse className="h-5 w-5 mr-2 text-blue-600" />
                                    Normal Cell Dynamics with Nutritional Support
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
                                    <Dna className="h-5 w-5 mr-2 text-red-600" />
                                    Tumor Cell Dynamics with Nutritional Inhibition
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
                                    <Brain className="h-5 w-5 mr-2 text-green-600" />
                                    Immune Cell Dynamics with Immunotherapy
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ModelEquation {...immuneCellEquation} />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </motion.section>

            {/* Treatment Dynamics */}
            <motion.section
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
            >
                <h2 className="text-3xl font-bold mb-6 font-serif">Treatment Dynamics</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="shadow-lg border-none">
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center text-base">
                                <Syringe className="h-4 w-4 mr-2 text-purple-600" />
                                Checkpoint Inhibitor Dynamics
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="text-sm">
                                <ModelEquation {...immunotherapyEquations} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-lg border-none">
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center text-base">
                                <Syringe className="h-4 w-4 mr-2 text-purple-600" />
                                CAR-T Cell Dynamics
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="text-sm">
                                <ModelEquation {...carTEquations} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-lg border-none md:col-span-2">
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center text-base">
                                <Salad className="h-4 w-4 mr-2 text-green-600" />
                                Nutritional Intervention Dynamics
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="text-sm">
                                <ModelEquation {...nutritionEquation} />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </motion.section>

            {/* Biological Justification */}
            <motion.section
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
            >
                <h2 className="text-3xl font-bold mb-6 font-serif">Biological Justification</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="shadow-lg border-none">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Syringe className="h-5 w-5 mr-2 text-purple-600" />
                                Immunotherapy Rationale
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="font-light">
                                Modern cancer immunotherapies enhance the body&apos;s natural immune response against cancer cells.
                                Checkpoint inhibitors prevent tumor cells from evading immune detection, while CAR-T cell therapy
                                provides engineered T cells that specifically target tumor antigens. Our model captures both the
                                immediate boost to immune function and the gradual clearance of these agents.
                            </p>
                            <div className="mt-4 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                                <h4 className="font-medium mb-2">Key Parameters</h4>
                                <ul className="list-disc pl-6 space-y-1 text-sm font-light">
                                    <li>
                                        <span className="font-medium">τ₁ = 0.5:</span> Checkpoint inhibitor efficacy
                                    </li>
                                    <li>
                                        <span className="font-medium">τ₂ = 0.3:</span> CAR-T cell efficacy
                                    </li>
                                    <li>
                                        <span className="font-medium">γ₁ = 0.1, γ₂ = 0.2:</span> Clearance rates
                                    </li>
                                    <li>
                                        <span className="font-medium">k₁ = 0.4, k₂ = 0.3:</span> Absorption rates
                                    </li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-lg border-none">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Salad className="h-5 w-5 mr-2 text-green-600" />
                                Nutritional Intervention Rationale
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="font-light">
                                Emerging clinical evidence suggests that targeted nutritional interventions can both support normal cell
                                function and create unfavorable conditions for tumor growth. Specific nutrients enhance immune
                                surveillance, reduce inflammation, and improve metabolic conditions that disadvantage cancer cells. Our
                                model incorporates these effects through direct modulation of both normal and tumor cell growth rates.
                            </p>
                            <div className="mt-4 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                                <h4 className="font-medium mb-2">Key Parameters</h4>
                                <ul className="list-disc pl-6 space-y-1 text-sm font-light">
                                    <li>
                                        <span className="font-medium">f = 0.4:</span> Nutritional impact coefficient
                                    </li>
                                    <li>
                                        <span className="font-medium">ε = 0.5:</span> Intervention uptake rate
                                    </li>
                                    <li>
                                        <span className="font-medium">φ = 0.1:</span> Natural decay rate
                                    </li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </motion.section>

            {/* Navigation Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="flex justify-between"
            >
                <Button variant="outline" className="flex items-center gap-2" asChild>
                    <Link href="/differential/results">
                        <ArrowLeft className="h-4 w-4" /> Study Results
                    </Link>
                </Button>

                <Button className="flex items-center gap-2" asChild>
                    <Link href="/differential/theory">
                        Modified Model Results <ArrowRight className="h-4 w-4" />
                    </Link>
                </Button>
            </motion.div>
        </div>
    )
}

// Therapeutic Interaction Diagram Component
function TherapeuticInteractionDiagram() {
    return (
        <div className="relative w-full h-full">
            {/* Normal Cells */}
            <motion.div
                className="absolute w-24 h-24 rounded-full bg-blue-500/20 border border-blue-500/30"
                animate={{
                    scale: [1, 1.05, 1],
                    x: [0, 5, 0],
                    y: [0, -5, 0],
                }}
                transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                }}
                style={{ left: "20%", top: "25%" }}
            >
                <HeartPulse className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-blue-500/70" />
            </motion.div>

            {/* Tumor Cells */}
            <motion.div
                className="absolute w-24 h-24 rounded-full bg-red-500/20 border border-red-500/30"
                animate={{
                    scale: [1, 1.1, 1],
                    x: [0, -5, 0],
                    y: [0, 5, 0],
                }}
                transition={{
                    duration: 6,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                }}
                style={{ right: "20%", bottom: "25%" }}
            >
                <Dna className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-red-500/70" />
            </motion.div>

            {/* Immune Cells */}
            <motion.div
                className="absolute w-20 h-20 rounded-full bg-green-500/20 border border-green-500/30"
                animate={{
                    scale: [1, 1.08, 1],
                    x: [0, 5, 0],
                    y: [0, 5, 0],
                }}
                transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                }}
                style={{ right: "30%", top: "30%" }}
            >
                <Brain className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-green-500/70" />
            </motion.div>

            {/* Immunotherapy */}
            <motion.div
                className="absolute w-16 h-16 rounded-full bg-purple-500/20 border border-purple-500/30"
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.7, 1, 0.7],
                }}
                transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                }}
                style={{ left: "30%", bottom: "30%" }}
            >
                <Syringe className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-5 w-5 text-purple-500/70" />
            </motion.div>

            {/* Nutritional Support */}
            <motion.div
                className="absolute w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30"
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.7, 1, 0.7],
                }}
                transition={{
                    duration: 3.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    delay: 0.5,
                }}
                style={{ right: "15%", top: "15%" }}
            >
                <Salad className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-5 w-5 text-green-500/70" />
            </motion.div>

            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full">
                {/* Immune -> Tumor (attack) */}
                <motion.path
                    d="M140,120 C180,150 200,180 220,200"
                    stroke="hsl(142, 76%, 36%)"
                    strokeWidth="1.5"
                    strokeDasharray="4,2"
                    fill="none"
                    animate={{
                        opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                    }}
                />

                {/* Immunotherapy -> Immune (boost) */}
                <motion.path
                    d="M100,180 C120,160 130,140 140,120"
                    stroke="hsl(280, 87%, 65%)"
                    strokeWidth="1.5"
                    strokeDasharray="4,2"
                    fill="none"
                    animate={{
                        opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: 0.5,
                    }}
                />

                {/* Nutrition -> Normal (boost) */}
                <motion.path
                    d="M240,60 C200,60 180,70 80,80"
                    stroke="hsl(142, 76%, 36%)"
                    strokeWidth="1.5"
                    strokeDasharray="4,2"
                    fill="none"
                    animate={{
                        opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: 1,
                    }}
                />

                {/* Nutrition -> Tumor (inhibit) */}
                <motion.path
                    d="M240,60 C230,100 220,150 220,200"
                    stroke="hsl(142, 76%, 36%)"
                    strokeWidth="1.5"
                    strokeDasharray="4,2"
                    fill="none"
                    animate={{
                        opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: 1.5,
                    }}
                />
            </svg>

            {/* Labels */}
            <div className="absolute text-xs font-medium text-blue-600" style={{ left: "15%", top: "15%" }}>
                Normal Cells
            </div>
            <div className="absolute text-xs font-medium text-red-600" style={{ right: "15%", bottom: "15%" }}>
                Tumor Cells
            </div>
            <div className="absolute text-xs font-medium text-green-600" style={{ right: "25%", top: "20%" }}>
                Immune Cells
            </div>
            <div className="absolute text-xs font-medium text-purple-600" style={{ left: "25%", bottom: "20%" }}>
                Immunotherapy
            </div>
            <div className="absolute text-xs font-medium text-green-600" style={{ right: "10%", top: "5%" }}>
                Nutrition
            </div>
        </div>
    )
}