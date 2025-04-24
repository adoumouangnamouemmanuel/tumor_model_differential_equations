"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft, GitCompare } from "lucide-react"
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

export default function FigureReplicationPage() {
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
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600 font-serif">
                    Figure Replication of <span className="text-[hsl(var(--primary))]">NTIUNHDM</span>
                </h1>
                <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto font-light tracking-wide">
                    Comparing original figures from the research paper with our MATLAB replications
                </p>
            </motion.div>

            {/* Introduction Section */}
            <motion.section
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <div>
                    <h2 className="text-3xl font-bold mb-4 font-serif">Figure Comparisons</h2>
                    <p className="text-lg leading-relaxed font-light">
                        This section presents side-by-side comparisons of original figures from the research paper with our MATLAB
                        replications.
                    </p>
                </div>
            </motion.section>

            {/* Figure Comparisons */}
            <motion.section
                className="mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <Tabs defaultValue="figure1" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-8">
                        <TabsTrigger value="figure1" className="cursor-pointer">
                            Figure 1: Cell Dynamics
                        </TabsTrigger>
                        <TabsTrigger value="figure2" className="cursor-pointer">
                            Figure 2: Phase Space
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="figure1" className="space-y-6">
                        <Card className="border-none shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center font-serif">
                                    <GitCompare className="h-5 w-5 mr-2 text-[hsl(var(--primary))]" />
                                    Figure 1: Cell Population Dynamics
                                </CardTitle>
                                <CardDescription className="font-light">
                                    Time evolution of normal cells, tumor cells, and immune cells
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold font-serif">Original Figure</h3>
                                        <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
                                            <Image
                                                src="/images/original_figure1.png"
                                                alt="Original Figure 1"
                                                width={600}
                                                height={400}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        <p className="text-sm text-muted-foreground font-light">
                                            Figure 1 from the original paper showing the time evolution of cell populations.
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold font-serif">Our Replication</h3>
                                        <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
                                            <Image
                                                src="/images/fig5_reproduction.png"
                                                alt="Our Replication of Figure 1"
                                                width={600}
                                                height={400}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        <p className="text-sm text-muted-foreground font-light">
                                            Our MATLAB replication of Figure 1 using the NTIUNHDM model implementation.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8 p-4 bg-muted rounded-lg">
                                    <h3 className="text-lg font-semibold mb-2 font-serif">Analysis</h3>
                                    <p className="font-light">
                                        Our replication closely matches the original figure, confirming the accuracy of our model
                                        implementation. The growth patterns of tumor cells, normal cells, and immune cells follow similar
                                        trajectories.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="figure2" className="space-y-6">
                        <Card className="border-none shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center font-serif">
                                    <GitCompare className="h-5 w-5 mr-2 text-[hsl(var(--primary))]" />
                                    Figure 2: 3D Phase Space Trajectory
                                </CardTitle>
                                <CardDescription className="font-light">
                                    Three-dimensional representation of system dynamics
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold font-serif">Original Figure</h3>
                                        <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
                                            <Image
                                                src="/images/original_figure2.png"
                                                alt="Original Figure 2"
                                                width={600}
                                                height={400}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        <p className="text-sm text-muted-foreground font-light">
                                            Figure 2 from the original paper showing the 3D phase space trajectory.
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold font-serif">Our Replication</h3>
                                        <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
                                            <Image
                                                src="/images/3d_phase_space.png"
                                                alt="Our Replication of Figure 2"
                                                width={600}
                                                height={400}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        <p className="text-sm text-muted-foreground font-light">
                                            Our MATLAB replication of the 3D phase space trajectory.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8 p-4 bg-muted rounded-lg">
                                    <h3 className="text-lg font-semibold mb-2 font-serif">Analysis</h3>
                                    <p className="font-light">
                                        Our 3D phase space trajectory replication captures the same overall trajectory shape as the original
                                        figure, showing the relationships between all three cell populations simultaneously.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </motion.section>

            {/* MATLAB Code Section */}
            <motion.section
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
            >
                <h2 className="text-3xl font-bold mb-4 font-serif">Replication Methodology</h2>
                <Card className="border-none shadow-lg">
                    <CardContent className="pt-6">
                        <p className="font-light leading-relaxed">
                            We implemented the NTIUNHDM system in MATLAB using the ode45 solver and carefully matched the parameters
                            from the original paper to ensure accurate replication of the figures.
                        </p>
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
                    <Link href="/differential/model-description">
                        <ArrowLeft className="h-4 w-4" /> Model Description
                    </Link>
                </Button>

                <Button className="flex items-center gap-2" asChild>
                    <Link href="/differential/results">
                        Study Results <ArrowRight className="h-4 w-4" />
                    </Link>
                </Button>
            </motion.div>
        </div>
    )
}