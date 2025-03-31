"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Shield, Activity, Microscope, Brain, ChevronDown, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"


// Interactive card component
function InteractiveCard({
                             title,
                             icon: Icon,
                             children,
                         }: {
    title: string
    icon: React.ElementType
    children: React.ReactNode
}) {
    return (
        <motion.div
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg overflow-hidden relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{
                y: -5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
        >
            <motion.div
                className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-blue-100 dark:bg-blue-900/20 opacity-50"
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                }}
                transition={{
                    duration: 10,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                }}
            />

            <div className="flex items-center gap-3 mb-4 relative z-10">
                <motion.div
                    className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    whileHover={{ rotate: 15, scale: 1.1 }}
                >
                    <Icon className="h-6 w-6" />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
            </div>

            <div className="text-gray-700 dark:text-gray-300 relative z-10">{children}</div>
        </motion.div>
    )
}

export default function IntroductionPage() {
    const { scrollYProgress } = useScroll()
    const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])
    const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95])

    return (
        <div className="relative pt-16">
            {/* Hero section with parallax effect */}
            <motion.div
                className="relative h-[60vh] flex items-center justify-center overflow-hidden"
                style={{ opacity, scale }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800 z-0" />

                <div className="absolute inset-0 z-10">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                            className="w-[800px] h-[800px] rounded-full bg-blue-100 dark:bg-blue-900/20 opacity-30"
                            animate={{
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "reverse",
                            }}
                        />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                            className="w-[600px] h-[600px] rounded-full bg-blue-200 dark:bg-blue-800/20 opacity-20"
                            animate={{
                                scale: [1.1, 1, 1.1],
                            }}
                            transition={{
                                duration: 6,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "reverse",
                            }}
                        />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                            className="w-[400px] h-[400px] rounded-full bg-blue-300 dark:bg-blue-700/20 opacity-10"
                            animate={{
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "reverse",
                            }}
                        />
                    </div>
                </div>

                <div className="container mx-auto px-4 relative z-20 text-center">
                    <motion.h1
                        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Understanding the{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Immune-Tumor
            </span>{" "}
                        Relationship
                    </motion.h1>

                    <motion.p
                        className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Exploring how diet, lifestyle, and immune response affect cancer development
                    </motion.p>
                </div>

                <motion.div
                    className="absolute bottom-10 left-0 right-0 flex justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                >
                    <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
                        <ChevronDown className="h-8 w-8 text-blue-500 dark:text-blue-400" />
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Main content */}
            <div className="bg-gradient-to-b from-white to-blue-50 dark:from-slate-800 dark:to-slate-900 py-20">
                <div className="container mx-auto px-4">
                    {/* Introduction section */}
                    <div className="max-w-4xl mx-auto mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="prose prose-lg dark:prose-invert max-w-none"
                        >
                            <p className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed mb-6">
                                Cancer is one of the most challenging diseases in the world today, affecting millions of lives. While
                                many factors contribute to its development, diet, and lifestyle are among the most overlooked yet
                                critical influences. Research has shown that an unhealthy diet can weaken the immune system, making it
                                easier for cancerous cells to grow and spread. However, how exactly does this happen? What role does the
                                immune system play in stopping or failing to stop tumor growth?
                            </p>

                            <p className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed">
                                This study explores these questions using the Nonlinear Tumor-Immune Unstable Hybrid Dynamical Model
                                (NTIUNHDM), a mathematical approach designed to simulate the interactions between tumor cells, immune
                                cells, and normal cells. Through numerical simulations, we analyze how a weakened immune response,
                                potentially due to poor dietary habits, can allow tumors to thrive.
                            </p>
                        </motion.div>
                    </div>

                    {/* Key findings section */}
                    <div className="max-w-4xl mx-auto mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-1 rounded-xl shadow-lg mb-8">
                                <div className="bg-white dark:bg-slate-800 rounded-lg p-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                                            <Zap className="h-6 w-6" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Key Findings</h2>
                                    </div>

                                    <p className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed">
                                        Our findings reveal a critical truth: When the immune system is compromised, whether due to
                                        genetics, environmental factors, or an unhealthy diet, tumor cells take advantage and multiply
                                        rapidly. However, a strong immune response can slow down or even stop tumor progression. This
                                        research highlights how even small changes in immune function can significantly impact cancer
                                        development.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Interactive cards section */}
                    <div className="max-w-4xl mx-auto mb-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <InteractiveCard title="Immune System Response" icon={Shield}>
                                <p>
                                    Our research demonstrates that a strong immune system can effectively identify and eliminate cancer
                                    cells before they form tumors. Dietary factors directly influence this capability.
                                </p>
                            </InteractiveCard>

                            <InteractiveCard title="Tumor Growth Patterns" icon={Activity}>
                                <p>
                                    When immune function is compromised, tumor cells exhibit exponential growth patterns that quickly
                                    overwhelm the body natural defenses.
                                </p>
                            </InteractiveCard>

                            <InteractiveCard title="Research Methodology" icon={Microscope}>
                                <p>
                                    Using advanced mathematical modeling, we can simulate years of cellular interactions in minutes,
                                    providing insights impossible to observe directly.
                                </p>
                            </InteractiveCard>

                            <InteractiveCard title="Future Applications" icon={Brain}>
                                <p>
                                    Understanding these interactions could lead to better cancer prevention strategies and treatments that
                                    enhance the body natural immune response.
                                </p>
                            </InteractiveCard>
                        </div>
                    </div>

                    {/* Conclusion section */}
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="prose prose-lg dark:prose-invert max-w-none"
                        >
                            <p className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed mb-8">
                                By combining mathematics and biology, this study provides valuable insights into the hidden battle
                                inside the human body. It emphasizes the importance of maintaining a healthy immune system through
                                medical treatments and lifestyle choices. Understanding these interactions could be the key to better
                                future cancer prevention and treatment strategies.
                            </p>

                            <div className="flex justify-center">
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">
                                        Explore Detailed Research
                                    </Button>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}