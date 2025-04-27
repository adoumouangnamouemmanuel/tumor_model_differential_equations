"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, Calculator, FileSpreadsheet, LineChart } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { SectionHeader } from "@/components/code-explanation/section-header"

// Define types for MathJax
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

declare global {
    interface Window {
        MathJax: MathJaxObject | MathJaxConfig
    }
}

export default function ErrorAnalysisPage() {
    // Initialize MathJax
    useEffect(() => {
        const initMathJax = () => {
            if (typeof window === "undefined") return

            if (window.MathJax) {
                if ("typeset" in window.MathJax) {
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    window.MathJax.typeset && window.MathJax.typeset()
                }
            } else {
                const script = document.createElement("script")
                script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
                script.async = true
                script.onload = () => {
                    window.MathJax = {
                        tex: {
                            inlineMath: [["$$", "$$"]],
                            displayMath: [["\\[", "\\]"]],
                        },
                        svg: {
                            fontCache: "global",
                        },
                    }
                    if ("typeset" in window.MathJax) {
                        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                        window.MathJax.typeset && window.MathJax.typeset()
                    }
                }
                document.head.appendChild(script)
            }
        }

        setTimeout(initMathJax, 100)
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
                    Error Analysis
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto mb-6"></div>
                <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto">
                    Quantitative assessment of numerical solver accuracy
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Side Navigation */}
                <div className="hidden md:block">
                    <ErrorAnalysisSideNav />
                </div>

                {/* Main Content */}
                <div className="md:col-span-3 space-y-12">
                    {/* Error Metrics Section */}
                    <section id="error-metrics">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Card className="border-none shadow-lg overflow-hidden">
                                <CardContent className="p-6">
                                    <SectionHeader title="Error Metrics" icon={Calculator} />

                                    <div className="mb-6 rounded-xl overflow-hidden shadow-lg">
                                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-900 p-6">
                                            <img
                                                src="/images/error_analysis.png"
                                                alt="Error Metrics Visualization"
                                                className="w-full h-auto rounded-lg shadow-md"
                                            />
                                        </div>
                                        <div className="bg-muted p-3 text-sm text-center">
                                            Figure 1: Comparison of different error metrics across numerical solvers
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-900 p-6 rounded-lg shadow-md">
                                            <h3 className="text-lg font-semibold mb-4 font-serif">Absolute vs. Relative Error</h3>
                                            {/*<div className="mt-2 text-center py-2 text-sm">*/}
                                            {/*    $E_{abs} = |y_{exact} - y_{approx}|$\*/}
                                            {/*    $E_{rel} = \frac{|y_{exact} - y_{approx}|}{|y_{exact}|}$*/}
                                            {/*</div>*/}
                                        </div>
                                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-900 p-6 rounded-lg shadow-md">
                                            <h3 className="text-lg font-semibold mb-4 font-serif">Aggregate Metrics</h3>
                                            {/*<div className="mt-2 text-center py-2 text-sm">*/}
                                            {/*    $RMSE = \sqrt{\frac{1}{n}\sum_{i=1}^{n}(y_{exact,i} - y_{approx,i})^2}$*/}
                                            {/*    $MAE = \frac{1}{n}\sum_{i=1}^{n}|y_{exact,i} - y_{approx,i}|$*/}
                                            {/*</div>*/}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </section>

                    {/* Solver Comparison Section */}
                    <section id="solver-comparison">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Card className="border-none shadow-lg overflow-hidden">
                                <CardContent className="p-6">
                                    <SectionHeader title="Solver Comparison" icon={BarChart3} />

                                    <div className="mb-6 rounded-xl overflow-hidden shadow-lg">
                                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-900 p-6">
                                            <img
                                                src="/placeholder.svg?height=300&width=800"
                                                alt="Solver Comparison Chart"
                                                className="w-full h-auto rounded-lg shadow-md"
                                            />
                                        </div>
                                        <div className="bg-muted p-3 text-sm text-center">
                                            Figure 2: Comparative analysis of different ODE solvers
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-900 p-6 rounded-lg shadow-md">
                                            <h3 className="text-lg font-semibold mb-4 font-serif">Reference Solution</h3>
                                            <ul className="mt-2 space-y-2 text-sm">
                                                <li className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                                    <span>ode45 (standard)</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                                    <span>RelTol = 1e-10</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                                    <span>AbsTol = 1e-12</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-900 p-6 rounded-lg shadow-md">
                                            <h3 className="text-lg font-semibold mb-4 font-serif">Interpolation</h3>
                                            <ul className="mt-2 space-y-2 text-sm">
                                                <li className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                                    <span>1000 evenly spaced points</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                                    <span>Linear interpolation</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-900 p-6 rounded-lg shadow-md">
                                            <h3 className="text-lg font-semibold mb-4 font-serif">Key Findings</h3>
                                            <ul className="mt-2 space-y-2 text-sm">
                                                <li className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                                    <span>ode113: Highest accuracy</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                                    <span>ode23: Largest errors</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                                    <span>ode15s: Best for stiff regions</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </section>

                    {/* Error Visualization Section */}
                    <section id="error-visualization">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Card className="border-none shadow-lg overflow-hidden">
                                <CardContent className="p-6">
                                    <SectionHeader title="Error Visualization" icon={LineChart} />

                                    <div className="mb-6 rounded-xl overflow-hidden shadow-lg">
                                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-900 p-6">
                                            <img
                                                src="/placeholder.svg?height=300&width=800"
                                                alt="Error Magnitude Plot"
                                                className="w-full h-auto rounded-lg shadow-md"
                                            />
                                        </div>
                                        <div className="bg-muted p-3 text-sm text-center">
                                            Figure 3: Error magnitude plot (log scale) for different solvers
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-900 p-6 rounded-lg shadow-md">
                                            <h3 className="text-lg font-semibold mb-4 font-serif">Log Scale Visualization</h3>
                                            <p className="text-sm">
                                                Logarithmic scale reveals patterns across multiple orders of magnitude, showing error spikes at critical transition points.
                                            </p>
                                        </div>
                                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-900 p-6 rounded-lg shadow-md">
                                            <h3 className="text-lg font-semibold mb-4 font-serif">Visual Patterns</h3>
                                            <p className="text-sm">
                                                Error peaks correspond to rapid state changes. The ode15s solver performs better in stiff regions.
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </section>

                    {/* Performance Analysis Section */}
                    <section id="performance-analysis">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Card className="border-none shadow-lg overflow-hidden">
                                <CardContent className="p-6">
                                    <SectionHeader title="Performance Analysis" icon={FileSpreadsheet} />

                                    <div className="mb-6 rounded-xl overflow-hidden shadow-lg">
                                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-900 p-6">
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-sm bg-white dark:bg-slate-700 rounded-lg shadow-md">
                                                    <thead>
                                                    <tr className="border-b border-slate-200 dark:border-slate-600">
                                                        <th className="text-left p-4 font-semibold">Solver</th>
                                                        <th className="text-left p-4 font-semibold">Time (s)</th>
                                                        <th className="text-left p-4 font-semibold">Steps</th>
                                                        <th className="text-left p-4 font-semibold">Failed Steps</th>
                                                        <th className="text-left p-4 font-semibold">RMSE</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr className="border-b border-slate-200 dark:border-slate-600 bg-blue-50/30 dark:bg-blue-900/10">
                                                        <td className="p-4">ode45</td>
                                                        <td className="p-4">0.0324</td>
                                                        <td className="p-4">154</td>
                                                        <td className="p-4">12</td>
                                                        <td className="p-4">Reference</td>
                                                    </tr>
                                                    <tr className="border-b border-slate-200 dark:border-slate-600">
                                                        <td className="p-4">ode23</td>
                                                        <td className="p-4">0.0218</td>
                                                        <td className="p-4">287</td>
                                                        <td className="p-4">43</td>
                                                        <td className="p-4">5.67e-4</td>
                                                    </tr>
                                                    <tr className="border-b border-slate-200 dark:border-slate-600">
                                                        <td className="p-4">ode113</td>
                                                        <td className="p-4">0.0290</td>
                                                        <td className="p-4">73</td>
                                                        <td className="p-4">5</td>
                                                        <td className="p-4">1.23e-6</td>
                                                    </tr>
                                                    <tr className="border-b border-slate-200 dark:border-slate-600">
                                                        <td className="p-4">ode15s</td>
                                                        <td className="p-4">0.0412</td>
                                                        <td className="p-4">98</td>
                                                        <td className="p-4">8</td>
                                                        <td className="p-4">3.45e-6</td>
                                                    </tr>
                                                    <tr className="border-b border-slate-200 dark:border-slate-600">
                                                        <td className="p-4">ode23s</td>
                                                        <td className="p-4">0.0440</td>
                                                        <td className="p-4">112</td>
                                                        <td className="p-4">15</td>
                                                        <td className="p-4">7.82e-5</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="p-4">ode23t</td>
                                                        <td className="p-4">0.0380</td>
                                                        <td className="p-4">105</td>
                                                        <td className="p-4">11</td>
                                                        <td className="p-4">6.91e-5</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="bg-muted p-3 text-sm text-center">
                                            Table 1: Performance metrics comparison across solvers
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </section>

                    {/* Navigation */}
                    <div className="flex justify-between">
                        <Button variant="outline" className="flex items-center gap-2" asChild>
                            <Link href="/applied-programming/code-explanation">
                                <ArrowRight className="h-4 w-4 rotate-180" /> Code Explanation
                            </Link>
                        </Button>

                        <Button className="flex items-center gap-2" asChild>
                            <Link href="/applied-programming/visualizations">
                                Visualizations <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ErrorAnalysisSideNav() {
    const [activeSection, setActiveSection] = useState("error-metrics")

    const navItems = [
        { id: "error-metrics", title: "Error Metrics", icon: <Calculator className="h-4 w-4" /> },
        { id: "solver-comparison", title: "Solver Comparison", icon: <BarChart3 className="h-4 w-4" /> },
        { id: "error-visualization", title: "Error Visualization", icon: <LineChart className="h-4 w-4" /> },
        { id: "performance-analysis", title: "Performance Analysis", icon: <FileSpreadsheet className="h-4 w-4" /> },
    ]

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id)
                    }
                })
            },
            { threshold: 0.2 },
        )

        navItems.forEach((item) => {
            const element = document.getElementById(item.id)
            if (element) observer.observe(element)
        })

        return () => {
            navItems.forEach((item) => {
                const element = document.getElementById(item.id)
                if (element) observer.unobserve(element)
            })
        }
    }, [])

    return (
        <motion.div
            className="fixed top-24 h-fit"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <nav className="space-y-1">
                {navItems.map((item) => (
                    <Link
                        key={item.id}
                        href={`#${item.id}`}
                        className={cn(
                            "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                            activeSection === item.id
                                ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                                : "hover:bg-muted",
                        )}
                        onClick={(e) => {
                            e.preventDefault()
                            document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })
                        }}
                    >
                        {item.icon}
                        {item.title}
                    </Link>
                ))}
            </nav>
        </motion.div>
    )
}