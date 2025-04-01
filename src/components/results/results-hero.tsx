"use client"

import { motion } from "framer-motion"
import { LineChart, Brain, Dna } from 'lucide-react'

export function ResultsHero() {
    return (
        <>
            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800 z-0" />

            {/* Animated background shapes */}
            <div className="absolute inset-0 z-10 overflow-hidden">
                <motion.div
                    className="absolute top-[10%] left-[15%] w-[300px] h-[300px] rounded-full bg-blue-100 dark:bg-blue-900/20 opacity-30"
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 10, 0],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                />
                <motion.div
                    className="absolute bottom-[20%] right-[10%] w-[250px] h-[250px] rounded-full bg-purple-100 dark:bg-purple-900/20 opacity-30"
                    animate={{
                        scale: [1.1, 1, 1.1],
                        rotate: [0, -10, 0],
                    }}
                    transition={{
                        duration: 7,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                />
                <motion.div
                    className="absolute top-[40%] right-[20%] w-[200px] h-[200px] rounded-full bg-green-100 dark:bg-green-900/20 opacity-20"
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, 20, 0],
                    }}
                    transition={{
                        duration: 9,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                />
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 relative z-20 text-center">
                <motion.div
                    className="flex justify-center mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.2
                    }}
                >
                    <div className="relative">
                        <div className="absolute -inset-4 rounded-full bg-blue-100 dark:bg-blue-900/30 blur-md"></div>
                        <div className="relative bg-white dark:bg-slate-800 p-4 rounded-full shadow-lg">
                            <LineChart className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                        </div>
                    </div>
                </motion.div>

                <motion.h1
                    className="text-4xl md:text-5xl lg:text-6xl py-8 font-bold mb-6 text-transparent dark:text-white bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    Study Results
                </motion.h1>

                <motion.p
                    className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    Exploring the dynamics between immune function, tumor growth, and dietary influence
                </motion.p>

                {/* Animated icons */}
                <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                    >
                        <motion.div
                            animate={{
                                y: [0, -10, 0],
                                rotate: [0, 5, 0]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                            className="bg-white dark:bg-slate-800 p-3 rounded-full shadow-lg"
                        >
                            <Brain className="h-8 w-8 text-blue-500 dark:text-blue-400" />
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.8 }}
                    >
                        <motion.div
                            animate={{
                                y: [0, -10, 0],
                                rotate: [0, -5, 0]
                            }}
                            transition={{
                                duration: 3.5,
                                repeat: Infinity,
                                repeatType: "reverse",
                                delay: 0.5
                            }}
                            className="bg-white dark:bg-slate-800 p-3 rounded-full shadow-lg"
                        >
                            <Dna className="h-8 w-8 text-purple-500 dark:text-purple-400" />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </>
    )
}