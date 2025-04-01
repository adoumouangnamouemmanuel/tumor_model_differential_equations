"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Brain, Dna, HeartPulse } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function IntroductionPage() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-background">
            {/* Hero Section */}
            <HeroSection />

            {/* Content Sections */}
            <IntroductionSection />
            <ResearchApproachSection />
            <FindingsSection />
            <ResearchImplicationsSection />
        </div>
    )
}

// Hero Section Component
function HeroSection() {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background/80 z-10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.1),transparent_65%)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-[800px] h-[800px]">
                        <CellAnimation />
                    </div>
                </div>
            </div>

            <div className="container relative z-20 px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                        Cancer, Diet & Immunity
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                        Exploring the hidden battle inside the human body through mathematical modeling
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="rounded-full px-8" asChild>
                            <Link href="/differential/model-description">
                                Explore the Model <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </motion.div>
            </div>

            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
                <ArrowRight className="h-6 w-6 rotate-90 text-muted-foreground" />
            </div>
        </section>
    )
}

// Introduction Section Component
function IntroductionSection() {
    return (
        <section className="py-24 bg-muted/30">
            <div className="container px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">The Challenge</h2>
                    <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
                        <p className="text-lg mb-6">
                            Cancer is one of the most challenging diseases in the world today, affecting millions of lives. While many
                            factors contribute to its development, diet, and lifestyle are among the most overlooked yet critical
                            influences.
                        </p>
                        <p className="text-lg">
                            Research has shown that an unhealthy diet can weaken the immune system, making it easier for cancerous
                            cells to grow and spread. However, how exactly does this happen? What role does the immune system play in
                            stopping or failing to stop tumor growth?
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

// Research Approach Section Component
function ResearchApproachSection() {
    return (
        <section className="py-24">
            <div className="container px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="order-2 lg:order-1"
                    >
                        <div className="aspect-square bg-card rounded-xl shadow-xl border border-border overflow-hidden relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Image
                                    src="/images/tumor-cells.jpg"
                                    alt="Model Diagram"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="order-1 lg:order-2"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Research Approach</h2>
                        <p className="text-lg mb-6">
                            This study explores these questions using the Nonlinear Tumor-Immune Unstable Hybrid Dynamical Model
                            (NTIUNHDM), a mathematical approach designed to simulate the interactions between tumor cells, immune
                            cells, and normal cells.
                        </p>
                        <p className="text-lg">
                            Through numerical simulations, we analyze how a weakened immune response, potentially due to poor dietary
                            habits, can allow tumors to thrive.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

// Findings Section Component
function FindingsSection() {
    return (
        <section className="py-24 bg-muted/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--primary-rgb),0.1),transparent_70%)]" />
            <div className="container px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Our Findings</h2>
                    <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
                        <p className="text-lg mb-6">
                            Our findings reveal a critical truth: When the immune system is compromised, whether due to genetics,
                            environmental factors, or an unhealthy diet, tumor cells take advantage and multiply rapidly. However, a
                            strong immune response can slow down or even stop tumor progression.
                        </p>
                        <p className="text-lg">
                            This research highlights how even small changes in immune function can significantly impact cancer
                            development.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

// Research Implications Section Component
function ResearchImplicationsSection() {
    return (
        <section className="py-24">
            <div className="container px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-8">Research Implications</h2>
                    <p className="text-xl mb-8 max-w-3xl mx-auto">
                        By combining mathematics and biology, this study provides valuable insights into the hidden battle inside
                        the human body. It emphasizes the importance of maintaining a healthy immune system through medical
                        treatments and lifestyle choices. Understanding these interactions could be the key to better future cancer
                        prevention and treatment strategies.
                    </p>
                    <Button size="lg" className="rounded-full px-8" asChild>
                        <Link href="/differential/model-description">
                            Explore the Model <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    )
}

// Cell Animation Component
function CellAnimation() {
    return (
        <div className="relative w-full h-full">
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-[600px] h-[600px]">
                    {/* Normal Cells */}
                    <motion.div
                        className="absolute w-32 h-32 rounded-full bg-primary/20 border border-primary/30"
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
                        <HeartPulse className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-10 w-10 text-primary/70" />
                    </motion.div>

                    {/* Tumor Cells */}
                    <motion.div
                        className="absolute w-40 h-40 rounded-full bg-destructive/20 border border-destructive/30"
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
                        <Dna className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-12 w-12 text-destructive/70" />
                    </motion.div>

                    {/* Immune Cells */}
                    <motion.div
                        className="absolute w-24 h-24 rounded-full bg-secondary/20 border border-secondary/30"
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
                        <Brain className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-secondary/70" />
                    </motion.div>

                    {/* Connection Lines */}
                    <svg className="absolute inset-0 w-full h-full">
                        <motion.path
                            d="M240,180 C300,250 350,300 400,320"
                            stroke="hsl(var(--primary))"
                            strokeWidth="1"
                            strokeDasharray="5,5"
                            fill="none"
                            animate={{
                                opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Number.POSITIVE_INFINITY,
                            }}
                        />
                        <motion.path
                            d="M400,320 C350,350 300,380 250,400"
                            stroke="hsl(var(--destructive))"
                            strokeWidth="1"
                            strokeDasharray="5,5"
                            fill="none"
                            animate={{
                                opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Number.POSITIVE_INFINITY,
                                delay: 1,
                            }}
                        />
                        <motion.path
                            d="M250,400 C300,350 350,300 400,200"
                            stroke="hsl(var(--secondary))"
                            strokeWidth="1"
                            strokeDasharray="5,5"
                            fill="none"
                            animate={{
                                opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Number.POSITIVE_INFINITY,
                                delay: 2,
                            }}
                        />
                    </svg>
                </div>
            </div>
        </div>
    )
}