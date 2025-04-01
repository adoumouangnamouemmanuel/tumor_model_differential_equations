"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code, FileCode, FunctionSquare, Settings } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"
import { CodeBlock } from "@/components/code-block"
import { MathEquation } from "@/components/math-equation"

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

export default function CodeExplanationPage() {
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
                    Detailed Explanation of the <span className="text-[hsl(var(--primary))]">MATLAB Code</span>
                </h1>
                <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto">
                    Understanding the implementation of the Normal-Tumor-Immune-Unhealthy Diet Model (NTIUNHDM)
                </p>
            </motion.div>

            {/* Introduction Section */}
            <motion.section
                className="mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <Card className="border-none shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl">1. Introduction</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p>
                            This MATLAB script implements and visualizes the Normal-Tumor-Immune-Unhealthy Diet Model (NTIUNHDM),
                            which describes the interactions between normal cells, tumor cells, and immune cells in a biological
                            system. The system is represented by a set of three coupled Ordinary Differential Equations (ODEs), which
                            govern the growth, suppression, and interaction dynamics of the three cell types over time.
                        </p>
                        <p className="font-medium">The primary objectives of this script are:</p>
                        <ol className="list-decimal pl-6 space-y-2">
                            <li>To numerically solve the system of ODEs using MATLAB built-in solvers.</li>
                            <li>To generate static and animated visualizations of cell population dynamics.</li>
                            <li>
                                To compare different numerical solvers (ode45, ode23, ode15s) in terms of accuracy and computational
                                efficiency.
                            </li>
                            <li>To conduct error analysis to quantify differences between the approximations.</li>
                            <li>
                                To implement enhanced visualization techniques, including 3D plots and fixed-axis animations, to
                                facilitate a better understanding of the system dynamics.
                            </li>
                        </ol>
                    </CardContent>
                </Card>
            </motion.section>

            {/* Parameters Section */}
            <motion.section
                className="mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <h2 className="text-3xl font-bold mb-8">2.1 Defining Model Parameters</h2>

                <Card className="border-none shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Settings className="h-5 w-5 mr-2 text-[hsl(var(--primary))]" />
                            Biological Parameters
                        </CardTitle>
                        <CardDescription>
                            Parameters that characterize the rates of growth, inhibition, and interactions
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <p>
                                The script begins by defining biological parameters that characterize the rates of growth, inhibition,
                                and interactions among the different cell types. These parameters are based on previous research studies
                                and are carefully chosen to ensure biologically realistic behavior.
                            </p>
                            <CodeBlock
                                code={`%% Define Parameters 
r = 0.4312; beta1 = 2.99e-6; eta = 0.1379; gamma = 0.9314; 
alpha1 = 0.4426; alpha2 = 0.4; beta2 = 1.1890; alpha3 = 0.1469; 
sigma = 0.7; delta = 0.57; mu = 0.8130; rho = 0.2710; 
m = 0.8130; mu1 = 0.3634; rho1 = 0.7829; m1 = 0.8620;`}
                                language="matlab"
                            />
                            <p className="font-medium">The parameters include:</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Normal Cell Parameters</h3>
                                    <ul className="list-disc pl-6 space-y-1">
                                        <li>
                                            <span className="font-mono">r = 0.4312</span>: Growth rate of normal cells
                                        </li>
                                        <li>
                                            <span className="font-mono">beta1 = 2.99e-6</span>: Rate of transformation to abnormal cells
                                        </li>
                                        <li>
                                            <span className="font-mono">eta = 0.1379</span>: Rate at which immune cells inhibit normal cells
                                        </li>
                                        <li>
                                            <span className="font-mono">gamma = 0.9314</span>: Rate at which tumor cells attack normal cells
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Tumor Cell Parameters</h3>
                                    <ul className="list-disc pl-6 space-y-1">
                                        <li>
                                            <span className="font-mono">alpha1 = 0.4426</span>: Intrinsic growth rate of tumor cells
                                        </li>
                                        <li>
                                            <span className="font-mono">alpha2 = 0.4</span>: Self-limitation factor of tumor cells
                                        </li>
                                        <li>
                                            <span className="font-mono">beta2 = 1.1890</span>: Rate of tumor cell generation from normal cells
                                        </li>
                                        <li>
                                            <span className="font-mono">alpha3 = 0.1469</span>: Rate at which immune cells inhibit tumor cells
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Immune Cell Parameters</h3>
                                    <ul className="list-disc pl-6 space-y-1">
                                        <li>
                                            <span className="font-mono">sigma = 0.7</span>: Basal production rate of immune cells
                                        </li>
                                        <li>
                                            <span className="font-mono">delta = 0.57</span>: Natural death rate of immune cells
                                        </li>
                                        <li>
                                            <span className="font-mono">rho = 0.2710</span>: Effect of normal cells on immune response
                                            activation
                                        </li>
                                        <li>
                                            <span className="font-mono">rho1 = 0.7829</span>: Effect of tumor cells on immune response
                                            activation
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Threshold Parameters</h3>
                                    <ul className="list-disc pl-6 space-y-1">
                                        <li>
                                            <span className="font-mono">m = 0.8130</span>: Threshold for immune response activation by normal
                                            cells
                                        </li>
                                        <li>
                                            <span className="font-mono">m1 = 0.8620</span>: Threshold for immune response activation by tumor
                                            cells
                                        </li>
                                        <li>
                                            <span className="font-mono">mu = 0.8130</span>: Rate of immune cell suppression by normal cells
                                        </li>
                                        <li>
                                            <span className="font-mono">mu1 = 0.3634</span>: Rate of immune cell suppression by tumor cells
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <p>
                                These parameters are assigned numerical values based on empirical data to ensure meaningful results when
                                the system is simulated.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </motion.section>

            {/* ODE System Section */}
            <motion.section
                className="mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
            >
                <h2 className="text-3xl font-bold mb-8">2.2 Defining the System of ODEs</h2>

                <Card className="border-none shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <FunctionSquare className="h-5 w-5 mr-2 text-[hsl(var(--primary))]" />
                            Mathematical Formulation
                        </CardTitle>
                        <CardDescription>
                            The coupled nonlinear ODEs that describe the evolution of cell populations
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <p>
                                The NTIUNHDM is mathematically formulated using three coupled nonlinear ODEs that describe the evolution
                                of normal cells, tumor cells, and immune cells:
                            </p>

                            <div className="space-y-6">
                                <MathEquation
                                    title="1. Normal cell population (N):"
                                    equation="\frac{dN}{dt} = rN(1 - \beta_1 N) - \eta NI - \gamma NT"
                                />

                                <MathEquation
                                    title="2. Tumor cell population (T):"
                                    equation="\frac{dT}{dt} = \alpha_1 T(1-\alpha_2 T) + \beta_2 NT - \alpha_3 TI"
                                />

                                <MathEquation
                                    title="3. Immune cell population (I):"
                                    equation="\frac{dI}{dt} = \sigma - \delta I + \frac{\rho NI}{m + N} + \frac{\rho_1 TI}{m_1 + T} - \mu NI - \mu_1 TI"
                                />
                            </div>

                            <p>
                                Each equation accounts for the growth, inhibition, and stimulation effects exerted by the other
                                populations. The equations incorporate logistic growth terms, Michaelis-Menten kinetics, and inhibitory
                                interactions to reflect biological realism. The equations in this script are adapted from previous
                                modeling approaches used in mathematical immunology.
                            </p>

                            <CodeBlock
                                code={`% Define the system of ODEs 
f = @(t, y) [ 
    r*y(1)*(1 - beta1*y(1)) - eta*y(1)*y(3) - gamma*y(1)*y(2);  
    alpha1*y(2)*(1 - alpha2*y(2)) + beta2*y(1)*y(2) - alpha3*y(2)*y(3); 
    sigma - delta*y(3) + (rho*y(1)*y(3))/(m + y(1)) + (rho1*y(2)*y(3))/(m1 + y(2)) - mu*y(1)*y(3) - mu1*y(2)*y(3) 
];`}
                                language="matlab"
                            />

                            <p>
                                In the MATLAB implementation, the system is defined as an anonymous function{" "}
                                <span className="font-mono">f</span> that takes time <span className="font-mono">t</span> and a state
                                vector <span className="font-mono">y</span> as inputs. The state vector components represent:
                            </p>
                            <ul className="list-disc pl-6">
                                <li>
                                    <span className="font-mono">y(1)</span>: Normal cell population (N)
                                </li>
                                <li>
                                    <span className="font-mono">y(2)</span>: Tumor cell population (T)
                                </li>
                                <li>
                                    <span className="font-mono">y(3)</span>: Immune cell population (I)
                                </li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </motion.section>

            {/* Initial Conditions Section */}
            <motion.section
                className="mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
            >
                <h2 className="text-3xl font-bold mb-8">2.3 Setting Initial Conditions and Simulation Timeframe</h2>

                <Card className="border-none shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Code className="h-5 w-5 mr-2 text-[hsl(var(--primary))]" />
                            Initial Setup
                        </CardTitle>
                        <CardDescription>Specifying starting populations and simulation duration</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <p>
                                The initial conditions specify the starting populations of normal, tumor, and immune cells. The
                                simulation is run over 30 days, which is chosen to capture meaningful changes in the cell populations
                                over time.
                            </p>

                            <CodeBlock
                                code={`% Initial Conditions 
N0 = 1; T0 = 1; I0 = 1.22; 
Y0 = [N0; T0; I0]; 
 
% Time Span 
tspan = [0 30];`}
                                language="matlab"
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-muted p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold mb-2">Initial Values</h3>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>Normal cell population (N0) = 1</li>
                                        <li>Tumor cell population (T0) = 1</li>
                                        <li>Immune cell population (I0) = 1.22</li>
                                    </ul>
                                    <p className="mt-4 text-sm">
                                        These values represent a scenario where tumor cells have just begun to establish themselves in the
                                        tissue, and the immune system is starting to respond to their presence.
                                    </p>
                                </div>

                                <div className="bg-muted p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold mb-2">Simulation Duration</h3>
                                    <p>The simulation runs from time t = 0 to t = 30 days.</p>
                                    <p className="mt-4 text-sm">
                                        This timeframe is sufficient to observe the key dynamics of the system, including the growth of
                                        tumor cells, the response of the immune system, and the decline of normal cells.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.section>

            {/* Solver Implementation Section */}
            <motion.section
                className="mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
            >
                <h2 className="text-3xl font-bold mb-8">2.4 Solving the ODEs Using Different Numerical Solvers</h2>

                <Card className="border-none shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <FileCode className="h-5 w-5 mr-2 text-[hsl(var(--primary))]" />
                            Numerical Solution
                        </CardTitle>
                        <CardDescription>Applying three different numerical methods to approximate solutions</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <p>To approximate the solution of the system of ODEs, three different numerical solvers are employed:</p>

                            <CodeBlock
                                code={`%% Solve using different solvers 
[t1, Y1] = ode45(f, tspan, Y0); 
[t2, Y2] = ode23(f, tspan, Y0); 
[t3, Y3] = ode15s(f, tspan, Y0);`}
                                language="matlab"
                            />

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-muted p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold mb-2">ode45</h3>
                                    <p className="text-sm">
                                        <strong>Method:</strong> Runge-Kutta (4th-5th order)
                                    </p>
                                    <p className="text-sm mt-2">
                                        <strong>Best for:</strong> Smooth, non-stiff problems
                                    </p>
                                    <p className="text-sm mt-2">This is MATLAB go-to solver and serves as our reference solution.</p>
                                </div>

                                <div className="bg-muted p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold mb-2">ode23</h3>
                                    <p className="text-sm">
                                        <strong>Method:</strong> Runge-Kutta (2nd-3rd order)
                                    </p>
                                    <p className="text-sm mt-2">
                                        <strong>Best for:</strong> Quick approximations
                                    </p>
                                    <p className="text-sm mt-2">Provides faster but less accurate solutions than ode45.</p>
                                </div>

                                <div className="bg-muted p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold mb-2">ode15s</h3>
                                    <p className="text-sm">
                                        <strong>Method:</strong> Implicit multistep
                                    </p>
                                    <p className="text-sm mt-2">
                                        <strong>Best for:</strong> Stiff equations
                                    </p>
                                    <p className="text-sm mt-2">Designed for systems where rapid changes occur.</p>
                                </div>
                            </div>

                            <p className="mt-4">Each solver returns two outputs:</p>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>
                                    <span className="font-mono">t1, t2, t3</span>: Time points at which the solution was computed
                                </li>
                                <li>
                                    <span className="font-mono">Y1, Y2, Y3</span>: Solution values at those time points
                                </li>
                            </ul>
                            <p className="mt-2">
                                These different solvers are used to ensure the robustness of the results and to identify any potential
                                numerical issues that might arise from the specific characteristics of the system.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </motion.section>

            {/* Full Code Section */}
            <motion.section
                className="mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
            >
                <h2 className="text-3xl font-bold mb-8">Complete MATLAB Script Structure</h2>

                <Card className="border-none shadow-lg">
                    <CardHeader>
                        <CardTitle>Script Organization</CardTitle>
                        <CardDescription>Overview of the complete MATLAB implementation</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <p>
                                The complete MATLAB script is organized into logical sections that handle different aspects of the
                                simulation and visualization process:
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <div className="p-3 bg-muted rounded-md">
                                        <div className="font-semibold text-sm">1. Setup and Initialization</div>
                                        <div className="text-xs text-muted-foreground">Clearing workspace and defining parameters</div>
                                    </div>
                                    <div className="p-3 bg-muted rounded-md">
                                        <div className="font-semibold text-sm">2. ODE System Definition</div>
                                        <div className="text-xs text-muted-foreground">Formulating the differential equations</div>
                                    </div>
                                    <div className="p-3 bg-muted rounded-md">
                                        <div className="font-semibold text-sm">3. Initial Conditions & Time Span</div>
                                        <div className="text-xs text-muted-foreground">Setting starting values and simulation duration</div>
                                    </div>
                                    <div className="p-3 bg-muted rounded-md">
                                        <div className="font-semibold text-sm">4. Numerical Solution</div>
                                        <div className="text-xs text-muted-foreground">Solving with ode45, ode23, and ode15s</div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="p-3 bg-muted rounded-md">
                                        <div className="font-semibold text-sm">5. Static Visualization</div>
                                        <div className="text-xs text-muted-foreground">Plotting time series and 3D phase space</div>
                                    </div>
                                    <div className="p-3 bg-muted rounded-md">
                                        <div className="font-semibold text-sm">6. Error Analysis</div>
                                        <div className="text-xs text-muted-foreground">Comparing solutions from different solvers</div>
                                    </div>
                                    <div className="p-3 bg-muted rounded-md">
                                        <div className="font-semibold text-sm">7. 2D Animation</div>
                                        <div className="text-xs text-muted-foreground">Creating time-series animations</div>
                                    </div>
                                    <div className="p-3 bg-muted rounded-md">
                                        <div className="font-semibold text-sm">8. 3D Animation</div>
                                        <div className="text-xs text-muted-foreground">Animating the phase space trajectory</div>
                                    </div>
                                </div>
                            </div>

                            <p className="mt-4">
                                This modular organization makes the code easier to understand and modify. Each section builds on the
                                previous ones, with the numerical solutions being used for both static visualizations and animations.
                            </p>

                            <div className="bg-muted p-4 rounded-lg mt-4">
                                <h3 className="text-lg font-semibold mb-2">Code Structure Best Practices</h3>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>Clear section organization with descriptive comments</li>
                                    <li>Consistent variable naming conventions</li>
                                    <li>Modular approach separating different aspects of the simulation</li>
                                    <li>Comprehensive comments explaining the purpose of each section</li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.section>

            {/* Navigation Section */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
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
                            <Link href="/applied-programming/error-analysis">
                                Error Analysis <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                        <Button variant="outline" className="w-full justify-between" asChild>
                            <Link href="/applied-programming/visualizations">
                                Visualizations <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </motion.section>
        </div>
    )
}