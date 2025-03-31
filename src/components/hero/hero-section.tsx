"use client"
import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { CellSimulation } from "./cell-simulation"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen } from "lucide-react"
import Link from "next/link"
import { FloatingParticles } from "./floating-particles"
import { FeatureCard } from "./feature-card"
import { ThemeToggle } from "./theme-toggle"

export function HeroSection() {
    const { scrollYProgress } = useScroll()
    const [mounted, setMounted] = useState(false)

    // Spring-based scroll progress for smoother animations
    const springScrollY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })

    // Parallax effects based on scroll
    const headerY = useTransform(springScrollY, [0, 0.5], [0, -100])
    const headerOpacity = useTransform(springScrollY, [0, 0.5], [1, 0])
    const featureCardsY = useTransform(springScrollY, [0.3, 0.8], [100, 0])

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <>
            {/* Main hero section */}
            <section className="relative w-full min-h-screen overflow-visible">
                {/* Cell simulation as background */}
                <div className="absolute inset-0 z-0">
                    <CellSimulation />
                </div>

                {/* Content overlay */}
                <motion.div
                    className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center dark:text-white"
                    style={{ y: headerY, opacity: headerOpacity }}
                >
                    <div className="container mx-auto px-4 text-center">
                        {/* Theme toggle in hero */}
                        {mounted && <ThemeToggle />}

                        {/* Decorative vertical line with dot */}
                        <motion.div
                            className="flex flex-col items-center mb-6"
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 100,
                                damping: 20,
                                delay: 0.2,
                            }}
                        >
                            <motion.div
                                className="w-5 h-5 rounded-full bg-blue-500 dark:bg-blue-500"
                                animate={{
                                    boxShadow: [
                                        "0 0 0px rgba(59, 130, 246, 0)",
                                        "0 0 20px rgba(59, 130, 246, 0.8)",
                                        "0 0 0px rgba(59, 130, 246, 0)",
                                    ],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Number.POSITIVE_INFINITY,
                                    repeatType: "reverse",
                                }}
                            />
                            <motion.div
                                className="w-1 h-40 bg-gradient-to-b from-blue-500 to-transparent"
                                animate={{
                                    height: [40, 60, 40],
                                    opacity: [0.7, 1, 0.7],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Number.POSITIVE_INFINITY,
                                    repeatType: "reverse",
                                }}
                            />
                        </motion.div>

                        {/* Text content with advanced animations */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 100,
                                damping: 20,
                                delay: 0.4,
                            }}
                            className="text-black dark:text-white"
                        >
                            <motion.h1
                                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 !text-black dark:!text-white"
                                animate={{
                                    textShadow: [
                                        "0 0 10px rgba(59, 130, 246, 0)",
                                        "0 0 20px rgba(59, 130, 246, 0.5)",
                                        "0 0 10px rgba(59, 130, 246, 0)",
                                    ],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Number.POSITIVE_INFINITY,
                                    repeatType: "reverse",
                                }}
                            >
                                Differential Equations &{" "}
                                <motion.span
                                    className="text-blue-600 dark:text-blue-400"
                                    animate={{
                                        color: ["#2563eb", "#3b82f6", "#2563eb"],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Number.POSITIVE_INFINITY,
                                        repeatType: "reverse",
                                    }}
                                >
                                    Cell Dynamics
                                </motion.span>
                            </motion.h1>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 100,
                                damping: 20,
                                delay: 0.6,
                            }}
                            className="text-black dark:text-white"
                        >
                            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto !text-black dark:!text-white">
                                Explore the mathematical models and numerical methods used in our research on
                                <br className="hidden md:block" /> tumor cells and immune system competition.
                            </p>
                        </motion.div>

                        {/* Buttons with enhanced animations */}
                        <motion.div
                            className="flex flex-col sm:flex-row gap-6 justify-center"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 100,
                                damping: 20,
                                delay: 0.8,
                            }}
                        >
                            <motion.div
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: "0 0 25px rgba(59, 130, 246, 0.5)",
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    asChild
                                    size="lg"
                                    className="bg-blue-500 hover:bg-blue-600 text-white group px-8 py-6 text-lg relative overflow-hidden"
                                >
                                    <Link href="/differential/introduction" className="flex items-center gap-2">
                                        <motion.div
                                            animate={{ rotate: [0, 360] }}
                                            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                            className="flex items-center justify-center"
                                        >
                                            <BookOpen className="h-5 w-5 mt-0.5" />
                                        </motion.div>
                                        <span>Explore Our Research</span>
                                        <motion.div
                                            animate={{ x: [0, 5, 0] }}
                                            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                                        >
                                            <ArrowRight className="h-4 w-4" />
                                        </motion.div>
                                        <motion.div
                                            className="absolute inset-0 bg-blue-400 opacity-20"
                                            initial={{ x: "-100%" }}
                                            whileHover={{ x: "100%" }}
                                            transition={{ duration: 1 }}
                                        />
                                    </Link>
                                </Button>
                            </motion.div>

                            <motion.div
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: "0 0 25px rgba(96, 165, 250, 0.3)",
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    asChild
                                    variant="outline"
                                    size="lg"
                                    className="border-blue-400 text-blue-700 dark:text-blue-100 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-800 dark:hover:text-white px-8 py-6 text-lg relative overflow-hidden"
                                >
                                    <Link href="/promo-video" className="flex items-center gap-2">
                                        <span>Watch Promo Video</span>
                                        <motion.div
                                            className="absolute inset-0 bg-blue-400 opacity-10"
                                            initial={{ x: "-100%" }}
                                            whileHover={{ x: "100%" }}
                                            transition={{ duration: 1 }}
                                        />
                                    </Link>
                                </Button>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Animated scroll indicator */}
                    <motion.div
                        className="absolute bottom-10 w-full flex justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.6 }}
                    >
                        <motion.div
                            className="w-[35px] h-[64px] rounded-3xl border-4 border-blue-400 dark:border-blue-400 flex justify-center items-start p-2"
                            animate={{
                                boxShadow: [
                                    "0 0 0px rgba(96, 165, 250, 0)",
                                    "0 0 15px rgba(96, 165, 250, 0.7)",
                                    "0 0 0px rgba(96, 165, 250, 0)",
                                ],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "reverse",
                            }}
                        >
                            <motion.div
                                animate={{
                                    y: [0, 24, 0],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Number.POSITIVE_INFINITY,
                                    repeatType: "loop",
                                }}
                                className="w-3 h-3 rounded-full bg-blue-400 dark:bg-blue-400 mb-1"
                            />
                        </motion.div>
                    </motion.div>

                    {/* Floating particles */}
                    <FloatingParticles />
                </motion.div>
            </section>

            {/* Feature highlights section with scroll-based animations */}
            <section id="features" className="relative z-10 bg-gray-50 dark:bg-slate-900 py-20 overflow-hidden">
                <div className="absolute inset-0 w-full h-full bg-gray-50 dark:bg-slate-900"></div>
                <motion.div className="container relative z-10 mx-auto px-4" style={{ y: featureCardsY }}>
                    <motion.h2
                        className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 20,
                        }}
                        viewport={{ once: true }}
                    >
                        Research Highlights
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            title="Mathematical Models"
                            description="Explore the differential equations that model tumor growth and immune system response."
                            delay={0.2}
                            color="blue"
                        />
                        <FeatureCard
                            title="Numerical Methods"
                            description="Learn about the computational techniques used to solve and analyze our ODE models."
                            delay={0.4}
                            color="purple"
                        />
                        <FeatureCard
                            title="Interactive Visualizations"
                            description="Visualize cell behaviors, model outputs, and simulation results through interactive tools."
                            delay={0.6}
                            color="cyan"
                        />
                    </div>
                </motion.div>
            </section>
        </>
    )
}