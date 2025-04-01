"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Brain, Dna, FlaskRoundIcon as Flask, HeartPulse, Pizza, Zap } from "lucide-react"
import { ModelAssumption } from "@/components/model/model-assumption"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VideoPlayer } from "@/components/model/video-player"
import { ModelEquation } from "@/components/model/model-equation"
import { ModelDiagram } from "@/components/model/model-diagram"
import { BiologicalJustification } from "@/components/model/biological-justification"
// import type { MathJaxObject } from "mathjax";

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

        // Add event listener for route changes
        const handleRouteChange = () => {
            // Re-render MathJax when returning to this page
            setTimeout(() => {
                if (typeof window !== "undefined" && window.MathJax && "typeset" in window.MathJax && window.MathJax.typeset) {
                    if ("typeset" in window.MathJax) {
                        window.MathJax.typeset()
                    }
                }
            }, 100)
        }

        if (typeof window !== "undefined") {
            window.addEventListener("popstate", handleRouteChange)
        }

        return () => {
            clearTimeout(timer)
            if (typeof window !== "undefined") {
                window.removeEventListener("popstate", handleRouteChange)
            }
        }
    }, [])

    // Add an additional effect to re-render MathJax when the component updates
    useEffect(() => {
        // Re-render MathJax whenever the component updates
        if (window.MathJax && "typeset" in window.MathJax && window.MathJax.typeset) {
            window.MathJax.typeset()
        }
    })

    // Model equation data
    const normalCellEquation = {
        equation: "\\frac{dN}{dt} = rN(1 - \\beta_1 N) - \\eta NI - \\gamma NT",
        parameters: [
            {symbol: "r", description: "Intrinsic growth rate of normal cells"},
            {
                symbol: "\\beta_1",
                description: "Determines the carrying capacity of normal cells due to resource limitations",
            },
            {
                symbol: "\\eta",
                description: "Quantifies the effect of immune cells attacking normal cells (immune overactivity)",
            },
            {symbol: "\\gamma", description: "Captures the inhibitory effect of tumor cells on normal cell survival"},
        ],
        terms: [
            {
                name: "Logistic Growth",
                term: "rN(1 - \\beta_1 N)",
                description:
                    "Represents the logistic growth of normal cells, where r is the intrinsic growth rate and \\beta_1 determines the carrying capacity",
            },
            {
                name: "Immune System Interaction",
                term: "- \\eta NI",
                description: "Models the potential attack of immune cells on normal cells due to autoimmune effects",
            },
            {
                name: "Tumor Competition Effect",
                term: "- \\gamma NT",
                description: "Captures the inhibitory effect of tumor cells on normal cell growth",
            },
        ],
    }

    const tumorCellEquation = {
        equation: "\\frac{dT}{dt} = \\alpha_1 T(1-\\alpha_2 T) + \\beta_2 NT - \\alpha_3 TI",
        parameters: [
            {symbol: "\\alpha_1", description: "Intrinsic growth rate of tumor cells"},
            {symbol: "\\alpha_2", description: "Controls the tumor carrying capacity"},
            {symbol: "\\beta_2", description: "Represents the stimulatory effect of normal cells on tumor growth"},
            {symbol: "\\alpha_3", description: "Quantifies the killing efficiency of immune cells against tumor cells"},
        ],
        terms: [
            {
                name: "Tumor Logistic Growth",
                term: "\\alpha_1 T(1-\\alpha_2 T)",
                description:
                    "Represents the logistic growth of tumor cells, where \\alpha_1 is the intrinsic growth rate and \\alpha_2 controls the carrying capacity",
            },
            {
                name: "Tumor Promotion by Normal Cells",
                term: "\\beta_2 NT",
                description: "Accounts for conditions where tumor cells benefit from interactions with normal cells",
            },
            {
                name: "Immune System Suppression of Tumors",
                term: "- \\alpha_3 TI",
                description: "Models the effect of immune cells attacking tumor cells",
            },
        ],
    }

    const immuneCellEquation = {
        equation:
            "\\frac{dI}{dt} = \\sigma - \\delta I + \\frac{\\rho NI}{m + N} + \\frac{\\rho_1 TI}{m_1 + T} - \\mu NI - \\mu_1 TI",
        parameters: [
            {symbol: "\\sigma", description: "Baseline immune cell production rate"},
            {symbol: "\\delta", description: "Natural death rate of immune cells"},
            {symbol: "\\rho", description: "Quantifies the stimulation of immune cells by normal cells"},
            {symbol: "\\rho_1", description: "Quantifies the stimulation of immune cells by tumor cells"},
            {symbol: "m", description: "Introduces saturation effects on immune activation by normal cells"},
            {symbol: "m_1", description: "Introduces saturation effects on immune activation by tumor cells"},
            {symbol: "\\mu", description: "Models immune exhaustion due to interactions with normal cells"},
            {symbol: "\\mu_1", description: "Models immune exhaustion due to interactions with tumor cells"},
        ],
        terms: [
            {
                name: "Immune Cell Production",
                term: "\\sigma",
                description: "Represents the baseline production of immune cells from the bone marrow and lymphatic system",
            },
            {
                name: "Immune Cell Natural Decay",
                term: "- \\delta I",
                description: "Accounts for the natural degradation or apoptosis of immune cells over time",
            },
            {
                name: "Immune Activation",
                term: "\\frac{\\rho NI}{m + N} + \\frac{\\rho_1 TI}{m_1 + T}",
                description: "Describes the activation of immune cells by normal and tumor cells, with saturation effects",
            },
            {
                name: "Immune Exhaustion Effects",
                term: "- \\mu NI - \\mu_1 TI",
                description:
                    "Represents immune cell exhaustion, where excessive interactions with normal or tumor cells lead to immune cell fatigue",
            },
        ],
    }

    // Biological justifications data
    const biologicalJustifications = [
        {
            title: "Normal Cell Growth Control",
            icon: <HeartPulse className="h-5 w-5"/>,
            description:
                "The logistic term ensures that normal cells do not grow indefinitely but stabilize due to limited resources. This reflects the biological reality of tissue homeostasis where cell proliferation is balanced by cell death to maintain a stable population.",
        },
        {
            title: "Tumor Competition and Aggressiveness",
            icon: <Dna className="h-5 w-5"/>,
            description:
                "Tumor cells outcompete normal cells, reducing normal cell populations through resource competition and direct inhibition. This represents the hallmark of cancer progression where malignant cells invade and displace healthy tissue through various mechanisms.",
        },
        {
            title: "Immune System Regulation",
            icon: <Brain className="h-5 w-5"/>,
            description:
                "Immune cells are stimulated by both normal and tumor cells, but their response is constrained by saturation and exhaustion effects. This models the complex dynamics of immune surveillance, activation, and the phenomenon of immune exhaustion observed in chronic diseases and cancer.",
        },
        {
            title: "Dietary Influence",
            icon: <Pizza className="h-5 w-5"/>,
            description:
                "An unhealthy diet affects immune function, altering the balance between tumor suppression and immune exhaustion. This reflects emerging research on how nutrition impacts immune competence and cancer progression through metabolic and inflammatory pathways.",
        },
    ]

    return (
        <div className="container max-w-6xl mx-auto py-12 px-4 md:px-6">
            {/* Hero Section */}
            <motion.div
                className="mb-16 text-center"
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8}}
            >
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600">
                    Normal-Tumor-Immune-Unhealthy Diet Model
                    <span className="text-[hsl(var(--primary))] ml-2">(NTIUNHDM)</span>
                </h1>
                <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto">
                    A mathematical framework describing the interactions among normal cells, tumor cells, immune
                    response, and the
                    impact of an unhealthy diet.
                </p>
            </motion.div>

            {/* Model Overview */}
            <motion.section
                className="mb-16"
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8, delay: 0.2}}
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Model Overview</h2>
                        <p className="mb-4">
                            The NTIUNHDM is represented as a system of three differential equations that capture the
                            growth,
                            inhibition, and stimulation effects among biological components.
                        </p>
                        <p className="mb-6">The primary variables of the system are:</p>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <div className="mr-4 bg-[hsl(var(--primary))] bg-opacity-20 p-2 rounded-full">
                                    <HeartPulse className="h-5 w-5 text-[hsl(var(--primary))]"/>
                                </div>
                                <div>
                                    <span className="font-bold">N(t):</span> The population of normal (healthy) cells at
                                    time t.
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="mr-4 bg-[hsl(var(--destructive))] bg-opacity-20 p-2 rounded-full">
                                    <Dna className="h-5 w-5 text-[hsl(var(--destructive))]"/>
                                </div>
                                <div>
                                    <span className="font-bold">T(t):</span> The population of tumor cells at time t.
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="mr-4 bg-[hsl(var(--secondary))] bg-opacity-20 p-2 rounded-full">
                                    <Brain className="h-5 w-5 text-[hsl(var(--secondary))]"/>
                                </div>
                                <div>
                                    <span className="font-bold">I(t):</span> The immune cell concentration at time t.
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-[hsl(var(--card))] p-6 rounded-xl shadow-xl">
                        <ModelDiagram/>
                    </div>
                </div>
            </motion.section>

            {/* Model Assumptions */}
            <motion.section
                className="mb-16"
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8, delay: 0.4}}
            >
                <h2 className="text-3xl font-bold mb-8">Assumptions of the Model</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ModelAssumption
                        number={1}
                        title="Logistic Growth of Normal and Tumor Cells"
                        icon={<Zap className="h-5 w-5"/>}
                        description="Normal cells (N) and tumor cells (T) follow logistic growth, meaning that their populations grow exponentially at low densities but slow down as they reach their respective carrying capacities. The logistic model accounts for resource limitations such as oxygen, nutrients, and space."
                    />

                    <ModelAssumption
                        number={2}
                        title="Competition Between Normal and Tumor Cells"
                        icon={<ArrowRight className="h-5 w-5"/>}
                        description="Tumor cells and normal cells compete for resources, and tumor cells tend to proliferate at the expense of normal cells. This competition introduces an inhibitory effect of tumor cells on normal cell survival."
                    />

                    <ModelAssumption
                        number={3}
                        title="Role of the Immune System"
                        icon={<Brain className="h-5 w-5"/>}
                        description="The immune system plays a dual role: It eliminates tumor cells by detecting and destroying them, and it can also mistakenly attack normal cells in autoimmune-like responses. The activation of immune cells depends on the presence of both normal and tumor cells."
                    />

                    <ModelAssumption
                        number={4}
                        title="Unhealthy Diet Influences the Immune Response"
                        icon={<Pizza className="h-5 w-5"/>}
                        description="An unhealthy diet weakens immune function, reducing the effectiveness of immune cells in targeting tumor cells. Dietary factors indirectly affect normal and tumor cell populations by modulating immune responses."
                    />

                    <ModelAssumption
                        number={5}
                        title="Saturation Effects in Immune Response"
                        icon={<Flask className="h-5 w-5"/>}
                        description="The immune response is not linear; it saturates when a large number of normal or tumor cells are present, meaning that beyond a certain threshold, additional stimulation does not significantly increase immune cell activation. This effect is incorporated using Michaelis-Menten-like saturation terms in the model."
                        className="md:col-span-2"
                    />
                </div>
            </motion.section>

            {/* Model Equations */}
            <motion.section
                className="mb-16"
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8, delay: 0.6}}
            >
                <h2 className="text-3xl font-bold mb-8">Model Equations and Their Derivation</h2>

                <Tabs defaultValue="normal" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-8">
                        <TabsTrigger value="normal" className="cursor-pointer">
                            Normal Cell Dynamics
                        </TabsTrigger>
                        <TabsTrigger value="tumor" className="cursor-pointer">
                            Tumor Cell Dynamics
                        </TabsTrigger>
                        <TabsTrigger value="immune" className="cursor-pointer">
                            Immune Cell Dynamics
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="normal" className="space-y-6 border-none">
                        <Card
                            className="shadow-lg border-none"
                        >
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <HeartPulse className="h-5 w-5 mr-2 text-[hsl(var(--primary))]"/>
                                    Normal Cell Dynamics
                                </CardTitle>
                                <CardDescription>
                                    The equation describing the population change of normal cells over time
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ModelEquation {...normalCellEquation} />
                            </CardContent>
                        </Card>

                        <VideoPlayer
                            src="/videos/normal-cell-simulation.mp4"
                            title="Normal Cell Dynamics Simulation"
                            description="This simulation shows how normal cells grow and interact with tumor cells and immune cells over time."
                        />
                    </TabsContent>

                    <TabsContent value="tumor" className="space-y-6">
                        <Card className="shadow-lg border-none">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Dna className="h-5 w-5 mr-2 text-[hsl(var(--destructive))]"/>
                                    Tumor Cell Dynamics
                                </CardTitle>
                                <CardDescription>The equation describing the growth and regulation of tumor
                                    cells</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ModelEquation {...tumorCellEquation} />
                            </CardContent>
                        </Card>

                        <VideoPlayer
                            src="/videos/normal-cell-simulation.mp4"
                            title="Tumor Cell Dynamics Simulation"
                            description="This simulation shows how tumor cells grow and interact with normal cells and immune cells over time."
                        />
                    </TabsContent>

                    <TabsContent value="immune" className="space-y-6">
                        <Card className="shadow-lg border-none">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Brain className="h-5 w-5 mr-2 text-[hsl(var(--secondary))]"/>
                                    Immune Cell Dynamics
                                </CardTitle>
                                <CardDescription>The equation describing the changes in the immune cell
                                    population</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ModelEquation {...immuneCellEquation} />
                            </CardContent>
                        </Card>

                        <VideoPlayer
                            src="/videos/normal-cell-simulation.mp4"
                            title="Immune Cell Dynamics Simulation"
                            description="This simulation shows how immune cells respond to normal and tumor cells over time."
                        />
                    </TabsContent>
                </Tabs>
            </motion.section>

            {/* Biological Justifications */}
            <motion.section
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8, delay: 0.8}}
            >
                <h2 className="text-3xl font-bold mb-8">Biological Justifications of the Model</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {biologicalJustifications.map((justification, index) => (
                        <BiologicalJustification
                            key={index}
                            title={justification.title}
                            icon={justification.icon}
                            description={justification.description}
                        />
                    ))}
                </div>
            </motion.section>
        </div>
    )
}