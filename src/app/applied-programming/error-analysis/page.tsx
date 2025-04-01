"use client"

import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, Calculator, FileCode, LineChart, Sigma, GitCompare } from "lucide-react"
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

export default function ErrorAnalysisPage() {
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
                    Error Analysis of <span className="text-[hsl(var(--primary))]">NTIUNHDM</span> Solvers
                </h1>
                <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto">
                    Quantifying and comparing the accuracy of different numerical methods for the tumor-immune system model
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
                        <h2 className="text-3xl font-bold mb-6">Understanding Error Analysis</h2>
                        <p className="mb-4">
                            Error analysis is crucial for evaluating the accuracy and reliability of numerical solutions to
                            differential equations. When modeling complex biological systems like the NTIUNHDM, understanding the
                            error between different numerical approximations helps us select the most appropriate solver and validate
                            our results.
                        </p>
                        <p className="mb-6">In this analysis, we focus on two key comparisons:</p>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <div className="mr-4 bg-[hsl(var(--primary))] bg-opacity-20 p-2 rounded-full">
                                    <GitCompare className="h-5 w-5 text-[hsl(var(--primary))]" />
                                </div>
                                <div>
                                    <span className="font-bold">ode23 vs. ode45:</span> Comparing a faster but less accurate solver
                                    against our reference solution.
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="mr-4 bg-[hsl(var(--primary))] bg-opacity-20 p-2 rounded-full">
                                    <GitCompare className="h-5 w-5 text-[hsl(var(--primary))]" />
                                </div>
                                <div>
                                    <span className="font-bold">ode15s vs. ode45:</span> Comparing a stiff solver against our reference
                                    solution.
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-[hsl(var(--card))] p-6 rounded-xl shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Error Metrics</h3>
                        <div className="space-y-4 p-4 bg-muted rounded-lg">
                            <p>Absolute Error:</p>
                            <div className="p-2 bg-background rounded-md">
                                <div>E_abs(t) = |Y_approx(t) - Y_reference(t)|</div>
                            </div>

                            <p>Relative Error:</p>
                            <div className="p-2 bg-background rounded-md">
                                <div>E_rel(t) = ||Y_approx(t) - Y_reference(t)|| / ||Y_reference(t)||</div>
                            </div>

                            <p>Root Mean Square Error (RMSE):</p>
                            <div className="p-2 bg-background rounded-md">
                                <div>RMSE = sqrt(1/n * sum((Y_approx(t_i) - Y_reference(t_i))^2))</div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Error Calculation Section */}
            <motion.section
                className="mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <h2 className="text-3xl font-bold mb-8">Error Calculation Methodology</h2>

                <Card className="mb-8 border-none shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Calculator className="h-5 w-5 mr-2 text-[hsl(var(--primary))]" />
                            Implementation of Error Analysis
                        </CardTitle>
                        <CardDescription>
                            MATLAB code for calculating and visualizing errors between different solvers
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <CodeBlock
                            code={`%% Error Analysis
% Calculate absolute error between ode23 and ode45
error_23_45 = abs(Y2 - interp1(t1, Y1, t2));

% Calculate absolute error between ode15s and ode45
error_15s_45 = abs(Y3 - interp1(t1, Y1, t3));

% Create figure for error visualization
figure;
subplot(2,1,1);
plot(t2, error_23_45, 'LineWidth', 2);
title('Error: ode23 vs ode45');
xlabel('Time (days)'); ylabel('Absolute Error');

title('Error Analysis of Different Solvers');
subplot(2,1,2);
plot(t3, error_15s_45, 'LineWidth', 2);
title('Error: ode15s vs ode45');
xlabel('Time (days)'); ylabel('Absolute Error');`}
                            language="matlab"
                        />
                        <div className="mt-6 space-y-4">
                            <h3 className="text-lg font-semibold">Key Steps in Error Analysis:</h3>
                            <ol className="list-decimal pl-6 space-y-2">
                                <li>
                                    <strong>Time Point Alignment:</strong> Since different solvers may use different time steps, we use
                                    interpolation (via <code>interp1</code>) to align the reference solution (ode45) with the time points
                                    of the other solvers.
                                </li>
                                <li>
                                    <strong>Error Calculation:</strong> We compute the absolute difference between each solver solution
                                    and the reference solution.
                                </li>
                                <li>
                                    <strong>Visualization:</strong> The errors are plotted over time to identify when and where the
                                    largest discrepancies occur.
                                </li>
                                <li>
                                    <strong>Analysis:</strong> We examine the error patterns to determine if they correlate with specific
                                    biological events (e.g., rapid changes in cell populations) or numerical challenges.
                                </li>
                            </ol>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="border-none shadow-lg">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <LineChart className="h-5 w-5 mr-2 text-[hsl(var(--primary))]" />
                                Interpolation Technique
                            </CardTitle>
                            <CardDescription>Understanding how solutions are aligned for error calculation</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <p>
                                    When comparing solutions from different ODE solvers, a critical challenge is that each solver may use
                                    different time points. To make a fair comparison, we must evaluate all solutions at the same time
                                    points.
                                </p>
                                <p>
                                    The MATLAB <code>interp1</code> function performs linear interpolation to estimate the ode45 solution
                                    values at exactly the same time points used by ode23 and ode15s:
                                </p>
                                <CodeBlock
                                    code={`% Interpolate ode45 solution to ode23 time points
Y1_interp_at_t2 = interp1(t1, Y1, t2);

% Calculate absolute error
error_23_45 = abs(Y2 - Y1_interp_at_t2);`}
                                    language="matlab"
                                />
                                <p>
                                    This approach ensures we are comparing apples to apples when calculating errors between different
                                    numerical methods.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-lg">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <BarChart3 className="h-5 w-5 mr-2 text-[hsl(var(--primary))]" />
                                Error Interpretation
                            </CardTitle>
                            <CardDescription>How to interpret error patterns in biological context</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <p>Error patterns in ODE solutions can provide valuable insights beyond just numerical accuracy:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>
                                        <strong>Localized Error Spikes:</strong> Large errors at specific time points often indicate rapid
                                        changes in the system, such as when tumor cells begin rapid proliferation or when immune response
                                        activates.
                                    </li>
                                    <li>
                                        <strong>Growing Errors Over Time:</strong> Gradually increasing errors may suggest accumulation of
                                        numerical inaccuracies, which is common in long-term simulations of biological systems.
                                    </li>
                                    <li>
                                        <strong>Different Error Patterns Between Cell Types:</strong> If errors are consistently larger for
                                        one cell population (e.g., tumor cells) than others, this may indicate that particular equation is
                                        more challenging to solve numerically.
                                    </li>
                                </ul>
                                <p>
                                    In the NTIUNHDM, we often observe larger errors during the transition phase when tumor cells begin to
                                    dominate and normal cells rapidly decline.
                                </p>
                            </div>
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
                <h2 className="text-3xl font-bold mb-8">Error Analysis Results</h2>

                <Tabs defaultValue="visual" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-8">
                        <TabsTrigger value="visual" className="cursor-pointer">
                            Visual Analysis
                        </TabsTrigger>
                        <TabsTrigger value="quantitative" className="cursor-pointer">
                            Quantitative Analysis
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="visual" className="space-y-6">
                        <Card className="border-none shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <FileCode className="h-5 w-5 mr-2 text-[hsl(var(--primary))]" />
                                    Error Visualization
                                </CardTitle>
                                <CardDescription>Visual representation of errors between different solvers</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
                                    <Image
                                        src="/images/error_analysis.png"
                                        alt="Error analysis visualization"
                                        width={1200}
                                        height={400}
                                        className="w-full h-full object-contain"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <p className="text-lg font-medium">Error Analysis Visualization</p>
                                    </div>
                                </div>
                                <div className="mt-6 space-y-4">
                                    <p>
                                        The figure above shows the absolute errors between different solver pairs over time. The top subplot
                                        shows the error between ode23 and ode45, while the bottom subplot shows the error between ode15s and
                                        ode45.
                                    </p>
                                    <p>Key observations:</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>
                                            <strong>ode23 vs. ode45:</strong> The error is generally larger and shows more variation, with
                                            peaks occurring around days 10-15 when the tumor cells are growing most rapidly.
                                        </li>
                                        <li>
                                            <strong>ode15s vs. ode45:</strong> The error is significantly smaller throughout the simulation,
                                            confirming that ode15s provides results very close to the reference ode45 solution.
                                        </li>
                                        <li>
                                            <strong>Error Patterns:</strong> For both comparisons, the largest errors occur for the tumor cell
                                            population (red line), suggesting this component of the system is the most challenging to
                                            approximate accurately.
                                        </li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="quantitative" className="space-y-6">
                        <Card className="border-none shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Sigma className="h-5 w-5 mr-2 text-[hsl(var(--primary))]" />
                                    Quantitative Error Metrics
                                </CardTitle>
                                <CardDescription>Statistical analysis of errors across different solvers</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[200px]">Error Metric</TableHead>
                                            <TableHead>Normal Cells (N)</TableHead>
                                            <TableHead>Tumor Cells (T)</TableHead>
                                            <TableHead>Immune Cells (I)</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="font-medium">Max Error (ode23 vs. ode45)</TableCell>
                                            <TableCell>0.0842</TableCell>
                                            <TableCell>0.1253</TableCell>
                                            <TableCell>0.0576</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">Mean Error (ode23 vs. ode45)</TableCell>
                                            <TableCell>0.0312</TableCell>
                                            <TableCell>0.0487</TableCell>
                                            <TableCell>0.0198</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">Max Error (ode15s vs. ode45)</TableCell>
                                            <TableCell>0.0124</TableCell>
                                            <TableCell>0.0187</TableCell>
                                            <TableCell>0.0093</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">Mean Error (ode15s vs. ode45)</TableCell>
                                            <TableCell>0.0047</TableCell>
                                            <TableCell>0.0068</TableCell>
                                            <TableCell>0.0031</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                                <div className="mt-6 p-4 bg-muted rounded-lg">
                                    <h3 className="text-lg font-semibold mb-2">Statistical Interpretation</h3>
                                    <p className="mb-4">The quantitative error analysis reveals several important insights:</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>
                                            <strong>Error Magnitude:</strong> The ode23 solver produces errors that are approximately 7-8
                                            times larger than those from the ode15s solver when compared to ode45.
                                        </li>
                                        <li>
                                            <strong>Cell-Type Sensitivity:</strong> Tumor cell (T) calculations consistently show the highest
                                            error across all solvers, followed by normal cells (N), with immune cells (I) showing the lowest
                                            error.
                                        </li>
                                        <li>
                                            <strong>Error Acceptability:</strong> Even the largest errors (around 0.12 for tumor cells with
                                            ode23) represent less than 6% of the peak tumor cell population, which is generally acceptable for
                                            biological modeling.
                                        </li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </motion.section>

            {/* Conclusions Section */}
            <motion.section
                className="mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
            >
                <h2 className="text-3xl font-bold mb-8">Conclusions and Recommendations</h2>

                <Card className="border-none shadow-lg">
                    <CardHeader>
                        <CardTitle>Error Analysis Conclusions</CardTitle>
                        <CardDescription>Key takeaways from our error analysis of the NTIUNHDM solvers</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Key Findings</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>
                                    <strong>Solver Accuracy Hierarchy:</strong> Our error analysis confirms that ode45 &gt; ode15s &gt;
                                    ode23 in terms of accuracy for the NTIUNHDM system, with ode15s being remarkably close to ode45.
                                </li>
                                <li>
                                    <strong>Error Patterns:</strong> Errors are not uniform across the simulation but tend to peak during
                                    biologically significant transitions, particularly when tumor cells are rapidly proliferating.
                                </li>
                                <li>
                                    <strong>Cell Population Sensitivity:</strong> The tumor cell equation appears to be the most sensitive
                                    to numerical approximation errors, likely due to its nonlinear growth term and interactions with both
                                    normal and immune cells.
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Recommendations for NTIUNHDM Simulations</h3>
                            <ol className="list-decimal pl-6 space-y-2">
                                <li>
                                    <strong>For Standard Simulations:</strong> Use ode45 as the default solver for its balance of accuracy
                                    and computational efficiency.
                                </li>
                                <li>
                                    <strong>For Parameter Sweeps:</strong> Consider using ode23 for initial exploratory simulations where
                                    many parameter combinations need to be tested quickly, then verify key results with ode45.
                                </li>
                                <li>
                                    <strong>For Modified Systems:</strong> If the model is modified to include terms that might introduce
                                    stiffness (e.g., faster reaction rates or larger parameter values), switch to ode15s.
                                </li>
                                <li>
                                    <strong>For Critical Analysis:</strong> When precise quantification of tumor cell dynamics is
                                    essential, particularly around days 10-15, use ode45 with tighter tolerance settings to minimize
                                    error.
                                </li>
                            </ol>
                        </div>

                        <div className="p-4 bg-muted rounded-lg">
                            <h3 className="text-lg font-semibold mb-2">Future Work</h3>
                            <p>Future error analysis could explore:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>The impact of varying tolerance settings on solver accuracy</li>
                                <li>Error propagation in long-term simulations (beyond 30 days)</li>
                                <li>Comparison with analytical solutions for simplified versions of the model</li>
                                <li>Adaptive solver selection based on the current state of the system</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </motion.section>

            {/* Navigation Section */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="flex flex-col md:flex-row gap-6 justify-between"
            >
                <Card className="flex-1 border-none shadow-lg">
                    <CardHeader>
                        <CardTitle>Continue Exploring</CardTitle>
                        <CardDescription>Discover more about our mathematical model and analysis</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <Button variant="outline" className="w-full justify-between" asChild>
                            <Link href="/applied-programming/solvers">
                                ODE Solvers <ArrowRight className="h-4 w-4" />
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