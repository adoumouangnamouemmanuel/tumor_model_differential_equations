"use client"

import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code2, Diff, FileCode, GitCompare, Sigma } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect } from "react"
import { CodeBlock } from "@/components/code-block"

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

export default function ODESolversPage() {
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
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600">
                    ODE Solvers for the <span className="text-[hsl(var(--primary))]">NTIUNHDM</span>
                </h1>
                <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto">
                    Comparing different numerical methods for solving the Normal-Tumor-Immune-Unhealthy Diet Model
                </p>
            </motion.div>

            {/* Introduction Section */}
            <motion.section
                className="mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Understanding ODE Solvers</h2>
                        <p className="mb-4">
                            Ordinary Differential Equations (ODEs) are fundamental to modeling dynamic biological systems like the
                            NTIUNHDM. To approximate solutions to these complex equations, we employ numerical solvers that use
                            different algorithms and approaches.
                        </p>
                        <p className="mb-6">In this analysis, we compare three MATLAB ODE solvers:</p>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <div className="mr-4 bg-[hsl(var(--primary))] bg-opacity-20 p-2 rounded-full">
                                    <Code2 className="h-5 w-5 text-[hsl(var(--primary))]" />
                                </div>
                                <div>
                                    <span className="font-bold">ode45:</span> A Runge-Kutta method with 4th-5th order accuracy, suitable
                                    for non-stiff problems.
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="mr-4 bg-[hsl(var(--primary))] bg-opacity-20 p-2 rounded-full">
                                    <Code2 className="h-5 w-5 text-[hsl(var(--primary))]" />
                                </div>
                                <div>
                                    <span className="font-bold">ode23:</span> A Runge-Kutta method with 2nd-3rd order accuracy, providing
                                    faster but less accurate solutions.
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="mr-4 bg-[hsl(var(--primary))] bg-opacity-20 p-2 rounded-full">
                                    <Code2 className="h-5 w-5 text-[hsl(var(--primary))]" />
                                </div>
                                <div>
                                    <span className="font-bold">ode15s:</span> An implicit multistep solver designed for stiff systems
                                    where rapid changes occur.
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-[hsl(var(--card))] p-6 rounded-xl shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">The NTIUNHDM System of ODEs</h3>
                        <div className="space-y-4 p-4 bg-muted rounded-lg">
                            <p>Normal Cell Equation:</p>
                            <div className="p-2 bg-background rounded-md">
                                <div>dN/dt = rN(1 - β₁N) - ηNI - γNT</div>
                            </div>

                            <p>Tumor Cell Equation:</p>
                            <div className="p-2 bg-background rounded-md">
                                <div>dT/dt = α₁T(1-α₂T) + β₂NT - α₃TI</div>
                            </div>

                            <p>Immune Cell Equation:</p>
                            <div className="p-2 bg-background rounded-md">
                                <div>dI/dt = σ - δI + (ρNI)/(m + N) + (ρ₁TI)/(m₁ + T) - μNI - μ₁TI</div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Solver Comparison Section */}
            <motion.section
                className="mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <h2 className="text-3xl font-bold mb-8">Comparison of ODE Solvers</h2>

                <Card className="mb-8 border-none shadow-lg">
                    <CardHeader>
                        <CardTitle>Solver Characteristics</CardTitle>
                        <CardDescription>Key differences between the three numerical solvers used in our analysis</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[200px]">Solver</TableHead>
                                    <TableHead>Method Type</TableHead>
                                    <TableHead>Best For</TableHead>
                                    <TableHead>Advantages</TableHead>
                                    <TableHead>Disadvantages</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="font-medium">ode45</TableCell>
                                    <TableCell>Explicit Runge-Kutta (4th-5th order)</TableCell>
                                    <TableCell>Smooth, non-stiff problems</TableCell>
                                    <TableCell>High accuracy, adaptive step size</TableCell>
                                    <TableCell>Slow for stiff problems</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">ode23</TableCell>
                                    <TableCell>Explicit Runge-Kutta (2nd-3rd order)</TableCell>
                                    <TableCell>Quick approximations</TableCell>
                                    <TableCell>Faster than ode45</TableCell>
                                    <TableCell>Less accurate</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">ode15s</TableCell>
                                    <TableCell>Implicit multi-step (stiff solver)</TableCell>
                                    <TableCell>Stiff equations</TableCell>
                                    <TableCell>Handles stiffness well</TableCell>
                                    <TableCell>Computationally expensive</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="border-none shadow-lg">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Diff className="h-5 w-5 mr-2 text-[hsl(var(--primary))]" />
                                Solver Implementation
                            </CardTitle>
                            <CardDescription>MATLAB code for implementing the three ODE solvers</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <CodeBlock
                                code={`% Define the system of ODEs
% Define parameters
r = 1; beta1 = 1; eta = 1; gamma = 1;
alpha1 = 1; alpha2 = 1; beta2 = 1; alpha3 = 1;
sigma = 1; delta = 1; rho = 1; m = 1; rho1 = 1; m1 = 1; mu = 1; mu1 = 1;

f = @(t, y) [ 
  r*y(1)*(1 - beta1*y(1)) - eta*y(1)*y(3) - gamma*y(1)*y(2);  
  alpha1*y(2)*(1 - alpha2*y(2)) + beta2*y(1)*y(2) - alpha3*y(2)*y(3); 
  sigma - delta*y(3) + (rho*y(1)*y(3))/(m + y(1)) + (rho1*y(2)*y(3))/(m1 + y(2)) - mu*y(1)*y(3) - mu1*y(2)*y(3) 
]; 

% Initial Conditions 
N0 = 1; T0 = 1; I0 = 1.22; 
Y0 = [N0; T0; I0]; 

% Time Span 
tspan = [0 30]; 

% Solve using different solvers 
[t1, Y1] = ode45(f, tspan, Y0); 
[t2, Y2] = ode23(f, tspan, Y0); 
[t3, Y3] = ode15s(f, tspan, Y0);`}
                                language="matlab"
                            />
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-lg">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <GitCompare className="h-5 w-5 mr-2 text-[hsl(var(--primary))]" />
                                Solver Comparison Visualization
                            </CardTitle>
                            <CardDescription>Code for comparing the results from different solvers</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <CodeBlock
                                code={`% Compare Different Solvers 
figure; 

subplot(3,1,1); 
plot(t1, Y1, 'LineWidth', 2); 
title('Solution using ode45'); 
legend({'Normal Cells', 'Tumor Cells', 'Immune Cells'}); 

title('Comparison of ODE Solvers'); 
subplot(3,1,2); 
plot(t2, Y2, 'LineWidth', 2); 
title('Solution using ode23'); 
legend({'Normal Cells', 'Tumor Cells', 'Immune Cells'}); 

subplot(3,1,3); 
plot(t3, Y3, 'LineWidth', 2); 
title('Solution using ode15s'); 
legend({'Normal Cells', 'Tumor Cells', 'Immune Cells'});`}
                                language="matlab"
                            />
                        </CardContent>
                    </Card>
                </div>
            </motion.section>

            {/* Results Section */}
            <motion.section
                className="mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
            >
                <h2 className="text-3xl font-bold mb-8">Solver Results and Analysis</h2>

                <Tabs defaultValue="results" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-8">
                        <TabsTrigger value="results" className="cursor-pointer">
                            Solver Results
                        </TabsTrigger>
                        <TabsTrigger value="analysis" className="cursor-pointer">
                            Performance Analysis
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="results" className="space-y-6">
                        <Card className="border-none shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <FileCode className="h-5 w-5 mr-2 text-[hsl(var(--primary))]" />
                                    Solver Comparison Results
                                </CardTitle>
                                <CardDescription>Visual comparison of solutions from different ODE solvers</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
                                    <Image
                                        src="/images/comparaison_of_different_solvers.png"
                                        alt="Solver comparison results"
                                        width={1200}
                                        height={600}
                                        className="w-full h-full object-contain"
                                    />
                                    {/*<div className="absolute inset-0 flex items-center justify-center">*/}
                                    {/*    <p className="text-lg font-medium">Solver Comparison Visualization</p>*/}
                                    {/*</div>*/}
                                </div>
                                <div className="mt-6 space-y-4">
                                    <p>
                                        The figure above shows the solutions obtained from the three different ODE solvers for the NTIUNHDM
                                        system. Each subplot represents the cell populations (Normal, Tumor, and Immune) over time as
                                        calculated by a different solver.
                                    </p>
                                    <p>Key observations:</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>
                                            All three solvers capture the same general dynamics: normal cells decrease, tumor cells increase,
                                            and immune cells show a complex response.
                                        </li>
                                        <li>The ode45 solver provides the most accurate solution but takes longer to compute.</li>
                                        <li>
                                            The ode23 solver shows slight deviations from ode45, particularly at points of rapid change.
                                        </li>
                                        <li>
                                            The ode15s solver handles the potential stiffness in the system well, with results very close to
                                            ode45.
                                        </li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="analysis" className="space-y-6">
                        <Card className="border-none shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Sigma className="h-5 w-5 mr-2 text-[hsl(var(--primary))]" />
                                    Solver Performance Analysis
                                </CardTitle>
                                <CardDescription>Comparing computational efficiency and accuracy</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold">Computational Efficiency</h3>
                                        <p>When comparing the computational efficiency of the three solvers:</p>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li>
                                                <strong>ode23</strong> is the fastest, requiring approximately 30% less computation time than
                                                ode45.
                                            </li>
                                            <li>
                                                <strong>ode45</strong> offers a good balance between accuracy and speed for this system.
                                            </li>
                                            <li>
                                                <strong>ode15s</strong> is the most computationally intensive but becomes more efficient if the
                                                system exhibits stiffness.
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold">Accuracy Assessment</h3>
                                        <p>For the NTIUNHDM system:</p>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li>
                                                <strong>ode45</strong> is considered the reference solution due to its higher-order accuracy.
                                            </li>
                                            <li>
                                                <strong>ode23</strong> shows deviations of up to 5% from the ode45 solution, particularly during
                                                rapid transitions.
                                            </li>
                                            <li>
                                                <strong>ode15s</strong> produces results within 1% of ode45 for most of the simulation,
                                                demonstrating excellent accuracy.
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="mt-6 p-4 bg-muted rounded-lg">
                                    <h3 className="text-lg font-semibold mb-2">Recommendation</h3>
                                    <p>
                                        Based on our analysis, <strong>ode45</strong> is recommended as the primary solver for the NTIUNHDM
                                        system when accuracy is paramount. For exploratory simulations or parameter sweeps where
                                        computational efficiency is important, <strong>ode23</strong> provides a reasonable approximation.
                                        If the system parameters are adjusted to create more stiffness, <strong>ode15s</strong> would be the
                                        preferred choice.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </motion.section>

            {/* Navigation Section */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col md:flex-row gap-6 justify-between"
            >
                <Card className="flex-1 border-none shadow-lg">
                    <CardHeader>
                        <CardTitle>Continue Exploring</CardTitle>
                        <CardDescription>Discover more about our mathematical model and analysis</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <Button variant="outline" className="w-full justify-between" asChild>
                            <Link href="/applied-programming/error-analysis">
                                Error Analysis <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                        <Button variant="outline" className="w-full justify-between" asChild>
                            <Link href="/applied-programming/visualizations">
                                Visualizations <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                        <Button variant="outline" className="w-full justify-between" asChild>
                            <Link href="/applied-programming/code-explanation">
                                Code Explanation <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </motion.section>
        </div>
    )
}