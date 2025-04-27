"use client"

import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code2, GitCompare } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect } from "react"
import { CodeBlock } from "@/components/code-block"

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

export default function ODESolversPage() {
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
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600">
                    ODE Solvers
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto mb-6"></div>
                <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto">
                    Comparing numerical methods for the NTIUNHDM model
                </p>
            </motion.div>

            {/* Solver Comparison Section */}
            <motion.section
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <Card className="mb-8 border-none shadow-lg">
                    <CardHeader className="pb-2">
                        <CardTitle>Solver Characteristics</CardTitle>
                        <CardDescription>Key differences between numerical solvers</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[150px]">Solver</TableHead>
                                    <TableHead>Method Type</TableHead>
                                    <TableHead>Order</TableHead>
                                    <TableHead>Best For</TableHead>
                                    <TableHead>Key Feature</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow className="bg-blue-50/30 dark:bg-blue-900/10">
                                    <TableCell className="font-medium">ode45</TableCell>
                                    <TableCell>Runge-Kutta</TableCell>
                                    <TableCell>4-5</TableCell>
                                    <TableCell>General purpose</TableCell>
                                    <TableCell>Standard choice, good balance of accuracy and speed</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">ode23</TableCell>
                                    <TableCell>Runge-Kutta</TableCell>
                                    <TableCell>2-3</TableCell>
                                    <TableCell>Quick approximations</TableCell>
                                    <TableCell>Faster but less accurate than ode45</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">ode113</TableCell>
                                    <TableCell>Adams</TableCell>
                                    <TableCell>1-13</TableCell>
                                    <TableCell>High accuracy</TableCell>
                                    <TableCell>Variable order, efficient for tight tolerances</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">ode15s</TableCell>
                                    <TableCell>BDF/NDF</TableCell>
                                    <TableCell>1-5</TableCell>
                                    <TableCell>Stiff problems</TableCell>
                                    <TableCell>Handles rapid transitions well</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">ode23s</TableCell>
                                    <TableCell>Rosenbrock</TableCell>
                                    <TableCell>2-3</TableCell>
                                    <TableCell>Stiff problems</TableCell>
                                    <TableCell>Modified Rosenbrock formula, one-step solver</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">ode23t</TableCell>
                                    <TableCell>Trapezoidal</TableCell>
                                    <TableCell>2-3</TableCell>
                                    <TableCell>Moderately stiff</TableCell>
                                    <TableCell>Trapezoidal rule with free interpolant</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="border-none shadow-lg">
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center">
                                <Code2 className="h-5 w-5 mr-2 text-[hsl(var(--primary))]" />
                                Implementation
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CodeBlock
                                code={`% Define the system of ODEs
f = @(t, y) [ 
  r*y(1)*(1 - beta1*y(1)) - eta*y(1)*y(3) - gamma*y(1)*y(2);  
  alpha1*y(2)*(1 - alpha2*y(2)) + beta2*y(1)*y(2) - alpha3*y(2)*y(3); 
  sigma - delta*y(3) + (rho*y(1)*y(3))/(m + y(1)) + (rho1*y(2)*y(3))/(m1 + y(2)) - mu*y(1)*y(3) - mu1*y(2)*y(3) 
]; 

% Initial Conditions & Time Span
Y0 = [N0; T0; I0]; 
tspan = [0 30]; 

% Solve using different solvers 
[t1, Y1] = ode45(f, tspan, Y0);   % Standard choice
[t2, Y2] = ode23(f, tspan, Y0);   % Faster, less accurate
[t3, Y3] = ode113(f, tspan, Y0);  % High accuracy
[t4, Y4] = ode15s(f, tspan, Y0);  % For stiff problems
[t5, Y5] = ode23s(f, tspan, Y0);  % Alternative stiff solver
[t6, Y6] = ode23t(f, tspan, Y0);  % Trapezoidal rule`}
                                language="matlab"
                            />
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-lg">
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center">
                                <GitCompare className="h-5 w-5 mr-2 text-[hsl(var(--primary))]" />
                                Visualization
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
                                <Image
                                    src="/placeholder.svg?height=300&width=600"
                                    alt="Solver comparison results"
                                    width={600}
                                    height={300}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                                <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
                                    <span className="font-bold">ode45:</span> Standard reference
                                </div>
                                <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
                                    <span className="font-bold">ode15s:</span> Best for stiff regions
                                </div>
                                <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
                                    <span className="font-bold">ode113:</span> Highest accuracy
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </motion.section>

            {/* Results Section */}
            <motion.section
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <Tabs defaultValue="performance" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger value="performance" className="cursor-pointer">
                            Performance
                        </TabsTrigger>
                        <TabsTrigger value="accuracy" className="cursor-pointer">
                            Accuracy
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="performance" className="space-y-4">
                        <Card className="border-none shadow-lg">
                            <CardContent className="pt-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-900 p-4 rounded-lg shadow-md">
                                        <h3 className="text-lg font-semibold mb-2">Execution Time</h3>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span>ode23:</span>
                                                <span className="font-medium">0.021s</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>ode45:</span>
                                                <span className="font-medium">0.032s</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>ode15s:</span>
                                                <span className="font-medium">0.041s</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>ode113:</span>
                                                <span className="font-medium">0.029s</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>ode23s:</span>
                                                <span className="font-medium">0.044s</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>ode23t:</span>
                                                <span className="font-medium">0.038s</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-900 p-4 rounded-lg shadow-md">
                                        <h3 className="text-lg font-semibold mb-2">Function Evaluations</h3>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span>ode23:</span>
                                                <span className="font-medium">287</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>ode45:</span>
                                                <span className="font-medium">154</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>ode15s:</span>
                                                <span className="font-medium">98</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>ode113:</span>
                                                <span className="font-medium">73</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>ode23s:</span>
                                                <span className="font-medium">112</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>ode23t:</span>
                                                <span className="font-medium">105</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-900 p-4 rounded-lg shadow-md">
                                        <h3 className="text-lg font-semibold mb-2">Failed Steps</h3>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span>ode23:</span>
                                                <span className="font-medium">43</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>ode45:</span>
                                                <span className="font-medium">12</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>ode15s:</span>
                                                <span className="font-medium">8</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>ode113:</span>
                                                <span className="font-medium">5</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>ode23s:</span>
                                                <span className="font-medium">15</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>ode23t:</span>
                                                <span className="font-medium">11</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="accuracy" className="space-y-4">
                        <Card className="border-none shadow-lg">
                            <CardContent className="pt-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold">Relative Error (vs ode45)</h3>
                                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-900 p-4 rounded-lg shadow-md">
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span>ode23:</span>
                                                    <span className="font-medium">5.67e-4</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>ode113:</span>
                                                    <span className="font-medium">1.23e-6</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>ode15s:</span>
                                                    <span className="font-medium">3.45e-6</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>ode23s:</span>
                                                    <span className="font-medium">7.82e-5</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>ode23t:</span>
                                                    <span className="font-medium">6.91e-5</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold">Key Findings</h3>
                                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-900 p-4 rounded-lg shadow-md">
                                            <ul className="space-y-2 text-sm list-disc pl-5">
                                                <li>
                                                    <span className="font-medium">ode45</span>: Best general-purpose solver
                                                </li>
                                                <li>
                                                    <span className="font-medium">ode113</span>: Highest accuracy for smooth problems
                                                </li>
                                                <li>
                                                    <span className="font-medium">ode15s</span>: Most efficient for stiff regions
                                                </li>
                                                <li>
                                                    <span className="font-medium">ode23</span>: Fastest but least accurate
                                                </li>
                                                <li>
                                                    <span className="font-medium">ode23s/ode23t</span>: Good alternatives for specific stiff
                                                    problems
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </motion.section>

            {/* Navigation */}
            <div className="flex justify-between">
                <Button variant="outline" className="flex items-center gap-2" asChild>
                    <Link href="/differential/introduction">
                        <ArrowRight className="h-4 w-4 rotate-180" /> differential
                    </Link>
                </Button>

                <Button className="flex items-center gap-2" asChild>
                    <Link href="/applied-programming/error-analysis">
                        Visualizations <ArrowRight className="h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}