"use client"

import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart, CuboidIcon as Cube, FileVideo, LineChart, Play, Presentation } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { CodeBlock } from "@/components/code-block"
import {VideoPlayer} from "@/components/model/video-player";

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

export default function VisualizationsPage() {
    const [activeVideo, setActiveVideo] = useState<string | null>(null)

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
                    Visualizing the <span className="text-[hsl(var(--primary))]">NTIUNHDM</span> Dynamics
                </h1>
                <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto">
                    Advanced visualization techniques for understanding tumor-immune system interactions
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
                        <h2 className="text-3xl font-bold mb-6">Visualization Approaches</h2>
                        <p className="mb-4">
                            Visualizing the complex dynamics of the NTIUNHDM system is essential for understanding the interactions
                            between normal cells, tumor cells, and immune cells. Through various visualization techniques, we can gain
                            insights that might be missed when examining numerical data alone.
                        </p>
                        <p className="mb-6">Our visualization strategy includes:</p>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <div className="mr-4 bg-[hsl(var(--primary))] bg-opacity-20 p-2 rounded-full">
                                    <LineChart className="h-5 w-5 text-[hsl(var(--primary))]" />
                                </div>
                                <div>
                                    <span className="font-bold">2D Time Series Plots:</span> Tracking cell populations over time to
                                    observe growth patterns and interactions.
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="mr-4 bg-[hsl(var(--primary))] bg-opacity-20 p-2 rounded-full">
                                    <Cube className="h-5 w-5 text-[hsl(var(--primary))]" />
                                </div>
                                <div>
                                    <span className="font-bold">3D Phase Space Visualization:</span> Representing the system state as a
                                    trajectory in 3D space.
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="mr-4 bg-[hsl(var(--primary))] bg-opacity-20 p-2 rounded-full">
                                    <FileVideo className="h-5 w-5 text-[hsl(var(--primary))]" />
                                </div>
                                <div>
                                    <span className="font-bold">Animated Visualizations:</span> Dynamic representations showing how the
                                    system evolves over time.
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-[hsl(var(--card))] p-6 rounded-xl shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Visualization Goals</h3>
                        <div className="space-y-4">
                            <p>Our visualizations are designed to address key questions about the NTIUNHDM system:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>How do normal, tumor, and immune cell populations change over time?</li>
                                <li>What are the critical transition points in the system behavior?</li>
                                <li>How do the three cell populations interact with each other?</li>
                                <li>Does the system reach an equilibrium state or exhibit oscillatory behavior?</li>
                                <li>What is the long-term fate of the system under different initial conditions?</li>
                            </ul>
                            <p>
                                By addressing these questions visually, we can develop a more intuitive understanding of the complex
                                dynamics governing tumor growth and immune response.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Visualization Types Section */}
            <motion.section
                className="mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <h2 className="text-3xl font-bold mb-8">Visualization Techniques</h2>

                <Tabs defaultValue="2d" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-8">
                        <TabsTrigger value="2d" className="cursor-pointer">
                            2D Time Series
                        </TabsTrigger>
                        <TabsTrigger value="3d" className="cursor-pointer">
                            3D Phase Space
                        </TabsTrigger>
                        <TabsTrigger value="animations" className="cursor-pointer">
                            Animations
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="2d" className="space-y-6">
                        <Card className="border-none shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <LineChart className="h-5 w-5 mr-2 text-[hsl(var(--primary))]" />
                                    2D Time Series Visualization
                                </CardTitle>
                                <CardDescription>Tracking cell populations over time</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
                                    <Image
                                        src="/images/fig5_reproduction.png"
                                        alt="2D time series plot"
                                        width={1200}
                                        height={600}
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <p className="text-lg font-medium">NTIUNHDM Time Series Plot</p>
                                    </div>
                                </div>
                                <div className="mt-6 space-y-4">
                                    <p>
                                        The 2D time series plot shows how the three cell populations (Normal, Tumor, and Immune) change over
                                        the 30-day simulation period. This is the most direct visualization of the model behavior and
                                        reproduces Figure 5 from the original research paper.
                                    </p>
                                    <p>Key observations from the time series:</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>
                                            <strong>Normal Cells (Blue):</strong> Initially stable but begin to decline around day 5 as tumor
                                            cells proliferate.
                                        </li>
                                        <li>
                                            <strong>Tumor Cells (Red):</strong> Show exponential growth starting around day 5, eventually
                                            reaching a plateau due to carrying capacity limitations.
                                        </li>
                                        <li>
                                            <strong>Immune Cells (Green):</strong> Initially decrease but show a slight recovery response
                                            around day 15 as tumor cells reach high levels, before declining again due to exhaustion.
                                        </li>
                                    </ul>
                                    <CodeBlock
                                        code={`%% Plot Results to Reproduce Figure 5 
figure; 
plot(t1, Y1(:,1), 'b', 'LineWidth', 2); hold on; 
plot(t1, Y1(:,2), 'r', 'LineWidth', 2); 
plot(t1, Y1(:,3), 'g', 'LineWidth', 2); 
legend({'Normal Cells', 'Tumor Cells', 'Immune Cells'}, 'Location', 'best'); 
xlabel('Time (days)'); ylabel('Cell Population'); 
title('NTIUNHDM Model Simulation (Reproducing Figure 5)'); 
grid on;`}
                                        language="matlab"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="3d" className="space-y-6">
                        <Card className="border-none shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Cube className="h-5 w-5 mr-2 text-[hsl(var(--primary))]" />
                                    3D Phase Space Visualization
                                </CardTitle>
                                <CardDescription>Representing system dynamics in three-dimensional space</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
                                    <Image
                                        src="/images/3d_phase_space.png"
                                        alt="3D phase space visualization"
                                        width={1200}
                                        height={600}
                                        className="w-full h-full object-contain"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <p className="text-lg font-medium">3D Phase Space Trajectory</p>
                                    </div>
                                </div>
                                <div className="mt-6 space-y-4">
                                    <p>
                                        The 3D phase space visualization represents the system state as a point in a three-dimensional
                                        space, where:
                                    </p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>
                                            <strong>X-axis:</strong> Normal cell population (N)
                                        </li>
                                        <li>
                                            <strong>Y-axis:</strong> Tumor cell population (T)
                                        </li>
                                        <li>
                                            <strong>Z-axis:</strong> Immune cell population (I)
                                        </li>
                                    </ul>
                                    <p>
                                        As time progresses, this point traces a trajectory through the phase space, providing insights into
                                        the system behavior that might not be apparent from time series plots alone.
                                    </p>
                                    <p>Key insights from the phase space visualization:</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>
                                            <strong>System Trajectory:</strong> The path shows how the three populations evolve together,
                                            revealing their interdependencies.
                                        </li>
                                        <li>
                                            <strong>Attractors and Stability:</strong> The trajectory endpoint indicates whether the system
                                            reaches a stable state or continues to evolve.
                                        </li>
                                        <li>
                                            <strong>Critical Transitions:</strong> Sharp turns in the trajectory highlight points where the
                                            system behavior changes dramatically.
                                        </li>
                                    </ul>
                                    <CodeBlock
                                        code={`%% 3D Visualization 
figure; 
plot3(Y1(:,1), Y1(:,2), Y1(:,3), 'k', 'LineWidth', 2); 
xlabel('Normal Cells'); ylabel('Tumor Cells'); zlabel('Immune Cells'); 
title('3D Phase Space of NTIUNHDM'); 
grid on;`}
                                        language="matlab"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="animations" className="space-y-6">
                        <Card className="border-none shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <FileVideo className="h-5 w-5 mr-2 text-[hsl(var(--primary))]" />
                                    Animated Visualizations
                                </CardTitle>
                                <CardDescription>Dynamic representations of system evolution</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold">2D Fixed-Axis Animation</h3>
                                        <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <p className="text-lg font-medium mb-4">2D Fixed-Axis Animation</p>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="flex items-center gap-2"
                                                    onClick={() => setActiveVideo("2d")}
                                                >
                                                    <Play className="h-4 w-4" /> Play Animation
                                                </Button>
                                            </div>
                                        </div>
                                        <p>
                                            This animation shows the time evolution of cell populations with fixed axes, making it easier to
                                            track changes over time without visual distortions from axis rescaling.
                                        </p>
                                        <CodeBlock
                                            code={`%% Fixed Axis 2D Animation
figure;
vidObjFixed = VideoWriter('NTIUNHDM_Fixed_Axis_Animation.mp4');
vidObjFixed.FrameRate = 1; % 1 frame per second
open(vidObjFixed);
xlim_fixed = [0, max(t1)];
ylim_fixed = [0, max(max(Y1))];
for i = 1:5:length(t1)
  clf;
  hold on;
  plot(t1(1:i), Y1(1:i,1), 'b', 'LineWidth', 2);
  plot(t1(1:i), Y1(1:i,2), 'r', 'LineWidth', 2);
  plot(t1(1:i), Y1(1:i,3), 'g', 'LineWidth', 2);
  legend({'Normal Cells', 'Tumor Cells', 'Immune Cells'}, 'Location', 'best');
  xlabel('Time (days)'); ylabel('Cell Population');
  title('NTIUNHDM Model Animation (Fixed Axis)');
  xlim(xlim_fixed); ylim(ylim_fixed);
  grid on;
  pause(1);
  frame = getframe(gcf);
  writeVideo(vidObjFixed, frame);
end
close(vidObjFixed);`}
                                            language="matlab"
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold">3D Phase Space Animation</h3>
                                        <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <p className="text-lg font-medium mb-4">3D Phase Space Animation</p>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="flex items-center gap-2"
                                                    onClick={() => setActiveVideo("3d")}
                                                >
                                                    <Play className="h-4 w-4" /> Play Animation
                                                </Button>
                                            </div>
                                        </div>
                                        <p>
                                            This animation shows the system trajectory through 3D phase space, providing a dynamic view of
                                            how the three cell populations interact and evolve together over time.
                                        </p>
                                        <CodeBlock
                                            code={`%% 3D Animation of Cell Dynamics
figure;
vidObj3D = VideoWriter('NTIUNHDM_3D_Animation.mp4');
vidObj3D.FrameRate = 1;
open(vidObj3D);
for i = 1:5:length(t1)
  clf;
  plot3(Y1(1:i,1), Y1(1:i,2), Y1(1:i,3), 'k', 'LineWidth', 2);
  xlabel('Normal Cells'); ylabel('Tumor Cells'); zlabel('Immune Cells');
  title('3D Phase Space of NTIUNHDM (Extended Duration)');
  grid on;
  xlim([0 max(Y1(:,1))]); ylim([0 max(Y1(:,2))]); zlim([0 max(Y1(:,3))]);
  pause(1);
  frame = getframe(gcf);
  writeVideo(vidObj3D, frame);
end
close(vidObj3D);`}
                                            language="matlab"
                                        />
                                    </div>
                                </div>

                                {activeVideo && (
                                    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
                                        <div className="relative w-full max-w-4xl">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="absolute top-2 right-2 text-white z-10 cursor-pointer"
                                                onClick={() => setActiveVideo(null)}
                                            >
                                                Close
                                            </Button>
                                            <div className="aspect-video bg-black rounded-lg overflow-hidden">
                                                <div className="flex items-center justify-center h-full">
                                                    <VideoPlayer
                                                        src="/videos/normal-cell-simulation.mp4"
                                                        title="Tumor Cell Dynamics Simulation"
                                                        description="This simulation shows how tumor cells grow and interact with normal cells and immune cells over time."
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </motion.section>

            {/* Insights Section */}
            <motion.section
                className="mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
            >
                <h2 className="text-3xl font-bold mb-8">Biological Insights from Visualizations</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="border-none shadow-lg">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <BarChart className="h-5 w-5 mr-2 text-[hsl(var(--primary))]" />
                                Key Biological Insights
                            </CardTitle>
                            <CardDescription>What our visualizations reveal about tumor-immune dynamics</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <p>Our visualizations of the NTIUNHDM system reveal several important biological insights:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>
                                        <strong>Immune System Failure:</strong> The visualizations clearly show how a weakened immune system
                                        fails to control tumor growth, with immune cell populations declining despite the increasing tumor
                                        burden.
                                    </li>
                                    <li>
                                        <strong>Critical Transition Points:</strong> Around day 5-10, the system undergoes a critical
                                        transition where tumor cells begin rapid proliferation and normal cells start to decline, marking a
                                        potential point of no return in disease progression.
                                    </li>
                                    <li>
                                        <strong>Delayed Immune Response:</strong> The immune system shows a delayed response to tumor
                                        growth, with a small increase in immune cells around day 15, but this response is insufficient to
                                        control the tumor.
                                    </li>
                                    <li>
                                        <strong>Competitive Exclusion:</strong> The phase space trajectory shows how tumor cells eventually
                                        dominate the system, pushing it toward a state where normal cells are greatly reduced.
                                    </li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-lg">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Presentation className="h-5 w-5 mr-2 text-[hsl(var(--primary))]" />
                                Clinical Implications
                            </CardTitle>
                            <CardDescription>Translating visual insights into potential clinical applications</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <p>The visualizations of our model suggest several potential clinical implications:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>
                                        <strong>Early Intervention Window:</strong> The visualizations identify a critical early period
                                        (days 5-10) where intervention might be most effective, before tumor cells reach exponential growth.
                                    </li>
                                    <li>
                                        <strong>Immune Boosting Strategies:</strong> The model suggests that strategies to boost immune
                                        function early in disease progression could potentially prevent tumor establishment.
                                    </li>
                                    <li>
                                        <strong>Dietary Interventions:</strong> Since the model incorporates the effects of unhealthy diet
                                        on immune function, the visualizations support the importance of dietary interventions as part of
                                        cancer prevention.
                                    </li>
                                    <li>
                                        <strong>Combination Therapies:</strong> The 3D phase space trajectory suggests that effective
                                        therapies might need to target both tumor cells directly and support immune function simultaneously.
                                    </li>
                                </ul>
                                <p className="mt-4">
                                    These insights demonstrate how mathematical modeling and visualization can contribute to our
                                    understanding of cancer progression and potentially inform therapeutic strategies.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </motion.section>

            {/* Advanced Visualization Techniques Section */}
            <motion.section
                className="mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
            >
                <h2 className="text-3xl font-bold mb-8">Advanced Visualization Techniques</h2>

                <Card className="border-none shadow-lg">
                    <CardHeader>
                        <CardTitle>Future Visualization Directions</CardTitle>
                        <CardDescription>
                            Exploring more sophisticated approaches to visualizing the NTIUNHDM system
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Interactive Visualizations</h3>
                                <p>Future work could develop interactive visualizations that allow users to:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Adjust model parameters in real-time and observe effects</li>
                                    <li>Zoom and rotate 3D phase space visualizations</li>
                                    <li>Select specific time periods for detailed analysis</li>
                                    <li>Compare multiple simulation runs side-by-side</li>
                                </ul>
                                <p>
                                    These interactive tools would enhance understanding of the model behavior and make it more
                                    accessible to researchers and clinicians without mathematical expertise.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Parameter Space Exploration</h3>
                                <p>Advanced visualization techniques could help explore the model parameter space:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Heat maps showing system outcomes across parameter ranges</li>
                                    <li>Bifurcation diagrams identifying critical parameter values</li>
                                    <li>Sensitivity analysis visualizations showing which parameters most strongly influence outcomes</li>
                                    <li>Uncertainty quantification to visualize confidence in model predictions</li>
                                </ul>
                                <p>
                                    These approaches would help identify the most important biological factors influencing tumor-immune
                                    dynamics.
                                </p>
                            </div>
                        </div>

                        <div className="p-4 bg-muted rounded-lg">
                            <h3 className="text-lg font-semibold mb-2">Implementation Strategy</h3>
                            <p>To implement these advanced visualization techniques, we recommend:</p>
                            <ol className="list-decimal pl-6 space-y-2">
                                <li>Developing a MATLAB GUI for interactive parameter adjustment and visualization</li>
                                <li>Utilizing parallel computing for parameter space exploration</li>
                                <li>Creating a web-based interface using tools like Plotly or D3.js for broader accessibility</li>
                                <li>Incorporating machine learning techniques to identify patterns in simulation results</li>
                            </ol>
                            <p className="mt-4">
                                These enhancements would transform the NTIUNHDM from a mathematical model into an intuitive visual tool
                                for understanding cancer dynamics and potentially guiding research directions.
                            </p>
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
                            <Link href="/applied-programming/error-analysis">
                                Error Analysis <ArrowRight className="h-4 w-4" />
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