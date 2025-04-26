"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code, FunctionSquare, Settings, LineChart, FileVideo, BarChart3, Diff } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"
import { ParameterGroup } from "@/components/code-explanation/parameter-group"
import { EquationCard } from "@/components/code-explanation/equation-card"
import { CodeCard } from "@/components/code-explanation/code-card"
import { FeatureCard } from "@/components/code-explanation/feature-card"
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

export default function CodeExplanationPage() {
    // Initialize MathJax
    useEffect(() => {
        const initMathJax = () => {
            if (typeof window === "undefined") return

            if (window.MathJax) {
                if ("typeset" in window.MathJax) {
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
                    NTIUNHDM Implementation
                </h1>
                <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto">
                    Mathematical modeling of tumor-immune dynamics in MATLAB
                </p>
            </motion.div>

            {/* Code Navigation Cards */}
            <motion.section
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <Card className="border-none shadow-lg overflow-hidden mb-8">
                    <CardContent className="p-6">
                        <SectionHeader title="Code Components" icon={Code} />
                        <p className="mb-6">
                            Explore the different components of our MATLAB implementation for the Normal-Tumor-Immune-Unhealthy Diet
                            Model.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <FeatureCard
                                title="Model Setup"
                                description="Core parameters and equations that define the biological system"
                                icon={Settings}
                                href="#model-setup"
                                delay={0.1}
                            />
                            <FeatureCard
                                title="Figure Reproduction"
                                description="Code to generate publication-quality visualizations"
                                icon={LineChart}
                                href="#figure-reproduction"
                                delay={0.2}
                            />
                            <FeatureCard
                                title="Animation Code"
                                description="Dynamic visualizations of cell population changes"
                                icon={FileVideo}
                                href="#animation-code"
                                delay={0.3}
                            />
                            <FeatureCard
                                title="Error Analysis"
                                description="Comparing accuracy between numerical solvers"
                                icon={BarChart3}
                                href="#error-analysis"
                                delay={0.4}
                            />
                        </div>
                    </CardContent>
                </Card>
            </motion.section>

            {/* Model Setup Section */}
            <motion.section
                id="model-setup"
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <CodeCard
                    title="Biological Parameters"
                    icon={Settings}
                    code={`%% Define Parameters 
r = 0.4312; beta1 = 2.99e-6; eta = 0.1379; gamma = 0.9314; 
alpha1 = 0.4426; alpha2 = 0.4; beta2 = 1.1890; alpha3 = 0.1469; 
sigma = 0.7; delta = 0.57; mu = 0.8130; rho = 0.2710; 
m = 0.8130; mu1 = 0.3634; rho1 = 0.7829; m1 = 0.8620;`}
                    description="Key biological rates that govern cell growth, interaction, and immune response"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <ParameterGroup
                            title="Normal Cell Parameters"
                            parameters={[
                                { name: "r", value: "0.4312", description: "Growth rate" },
                                { name: "beta1", value: "2.99e-6", description: "Carrying capacity factor" },
                                { name: "eta", value: "0.1379", description: "Immune sensitivity" },
                                { name: "gamma", value: "0.9314", description: "Tumor vulnerability" },
                            ]}
                        />

                        <ParameterGroup
                            title="Tumor Cell Parameters"
                            parameters={[
                                { name: "alpha1", value: "0.4426", description: "Growth rate" },
                                { name: "alpha2", value: "0.4", description: "Self-inhibition" },
                                { name: "beta2", value: "1.1890", description: "Normal cell conversion" },
                                { name: "alpha3", value: "0.1469", description: "Immune vulnerability" },
                            ]}
                        />

                        <ParameterGroup
                            title="Immune Parameters"
                            parameters={[
                                { name: "sigma", value: "0.7", description: "Base production" },
                                { name: "delta", value: "0.57", description: "Natural decay" },
                                { name: "rho/rho1", value: "0.27/0.78", description: "Cell activation factors" },
                                { name: "mu/mu1", value: "0.81/0.36", description: "Exhaustion rates" },
                            ]}
                        />
                    </div>
                </CodeCard>

                <CodeCard
                    title="System of ODEs"
                    icon={FunctionSquare}
                    code={`% Define the system of ODEs 
f = @(t, y) [ 
    r*y(1)*(1 - beta1*y(1)) - eta*y(1)*y(3) - gamma*y(1)*y(2);  
    alpha1*y(2)*(1 - alpha2*y(2)) + beta2*y(1)*y(2) - alpha3*y(2)*y(3); 
    sigma - delta*y(3) + (rho*y(1)*y(3))/(m + y(1)) + (rho1*y(2)*y(3))/(m1 + y(2)) - mu*y(1)*y(3) - mu1*y(2)*y(3) 
];`}
                    description="Anonymous function defining the coupled differential equations"
                    delay={0.5}
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <EquationCard
                            title="Normal Cells"
                            equation="\frac{dN}{dt} = rN(1 - \beta_1 N) - \eta NI - \gamma NT"
                            delay={0.1}
                        />
                        <EquationCard
                            title="Tumor Cells"
                            equation="\frac{dT}{dt} = \alpha_1 T(1-\alpha_2 T) + \beta_2 NT - \alpha_3 TI"
                            delay={0.2}
                        />
                        <EquationCard
                            title="Immune Cells"
                            equation="\frac{dI}{dt} = \sigma - \delta I + \frac{\rho NI}{m + N} + \frac{\rho_1 TI}{m_1 + T} - \mu NI - \mu_1 TI"
                            delay={0.3}
                        />
                    </div>
                </CodeCard>

                <CodeCard
                    title="Initial Setup"
                    icon={Code}
                    code={`% Initial Conditions 
N0 = 1; T0 = 1; I0 = 1.22; 
Y0 = [N0; T0; I0]; 
 
% Time Span 
tspan = [0 30];

% Solve using different solvers 
[t1, Y1] = ode45(f, tspan, Y0); 
[t2, Y2] = ode23(f, tspan, Y0); 
[t3, Y3] = ode15s(f, tspan, Y0);`}
                    description="Initial conditions and solver configuration"
                    delay={0.6}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-muted p-4 rounded-lg">
                            <h3 className="text-lg font-semibold mb-2">Initial Values</h3>
                            <ul className="space-y-1 text-sm">
                                <li>Normal cells (N₀) = 1</li>
                                <li>Tumor cells (T₀) = 1</li>
                                <li>Immune cells (I₀) = 1.22</li>
                            </ul>
                            <p className="mt-3 text-xs text-muted-foreground">Early-stage tumor with active immune response</p>
                        </div>

                        <div className="bg-muted p-4 rounded-lg">
                            <h3 className="text-lg font-semibold mb-2">Numerical Methods</h3>
                            <ul className="space-y-1 text-sm">
                                <li>
                                    <strong>ode45:</strong> High accuracy, general purpose
                                </li>
                                <li>
                                    <strong>ode23:</strong> Faster, lower accuracy
                                </li>
                                <li>
                                    <strong>ode15s:</strong> For stiff equations
                                </li>
                            </ul>
                        </div>
                    </div>
                </CodeCard>
            </motion.section>

            {/* Figure Reproduction Section */}
            <motion.section
                id="figure-reproduction"
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
            >
                <CodeCard
                    title="Figure Reproduction"
                    icon={LineChart}
                    code={`%% Plot Results to Reproduce Figure 5 
figure; 
plot(t1, Y1(:,1), 'b', 'LineWidth', 2); hold on; 
plot(t1, Y1(:,2), 'r', 'LineWidth', 2); 
plot(t1, Y1(:,3), 'g', 'LineWidth', 2); 
legend({'Normal Cells', 'Tumor Cells', 'Immune Cells'}, 'Location', 'best'); 
xlabel('Time (days)'); ylabel('Cell Population'); 
title('NTIUNHDM Model Simulation (Reproducing Figure 5)'); 
grid on;

%% 3D Visualization 
figure; 
plot3(Y1(:,1), Y1(:,2), Y1(:,3), 'k', 'LineWidth', 2); 
xlabel('Normal Cells'); ylabel('Tumor Cells'); zlabel('Immune Cells'); 
title('3D Phase Space of NTIUNHDM'); 
grid on;`}
                    description="Code to generate publication-quality figures showing time series and phase space"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div className="bg-muted p-4 rounded-lg">
                            <h3 className="text-lg font-semibold mb-2">Time Series Plot</h3>
                            <p className="text-sm">Shows population changes over time with color-coded lines:</p>
                            <ul className="mt-2 space-y-1 text-xs">
                                <li>• Blue: Normal cells</li>
                                <li>• Red: Tumor cells</li>
                                <li>• Green: Immune cells</li>
                            </ul>
                        </div>
                        <div className="bg-muted p-4 rounded-lg">
                            <h3 className="text-lg font-semibold mb-2">3D Phase Space</h3>
                            <p className="text-sm">Visualizes system trajectory through 3D space where:</p>
                            <ul className="mt-2 space-y-1 text-xs">
                                <li>• X-axis: Normal cell population</li>
                                <li>• Y-axis: Tumor cell population</li>
                                <li>• Z-axis: Immune cell population</li>
                            </ul>
                        </div>
                    </div>
                </CodeCard>
            </motion.section>

            {/* Animation Code Section */}
            <motion.section
                id="animation-code"
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
            >
                <CodeCard
                    title="Animation Code"
                    icon={FileVideo}
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
close(vidObjFixed);

%% 3D Animation of Cell Dynamics
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
                    description="Code to create dynamic visualizations of cell population changes over time"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div className="bg-muted p-4 rounded-lg">
                            <h3 className="text-lg font-semibold mb-2">2D Time Series Animation</h3>
                            <p className="text-sm">Creates a video showing the progressive growth of cell populations with:</p>
                            <ul className="mt-2 space-y-1 text-xs">
                                <li>• Fixed axes for consistent scale</li>
                                <li>• Frame-by-frame rendering</li>
                                <li>• 1 frame per second playback</li>
                            </ul>
                        </div>
                        <div className="bg-muted p-4 rounded-lg">
                            <h3 className="text-lg font-semibold mb-2">3D Phase Space Animation</h3>
                            <p className="text-sm">Animates the system trajectory through 3D space showing:</p>
                            <ul className="mt-2 space-y-1 text-xs">
                                <li>• Progressive path development</li>
                                <li>• Spatial relationships between populations</li>
                                <li>• Critical transition points</li>
                            </ul>
                        </div>
                    </div>
                </CodeCard>
            </motion.section>

            {/* Error Analysis Section */}
            <motion.section
                id="error-analysis"
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
            >
                <CodeCard
                    title="Error Analysis"
                    icon={BarChart3}
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
                    description="Code to quantify and visualize differences between numerical solvers"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div className="bg-muted p-4 rounded-lg">
                            <h3 className="text-lg font-semibold mb-2">Error Calculation</h3>
                            <p className="text-sm">Computes absolute differences between solvers using:</p>
                            <ul className="mt-2 space-y-1 text-xs">
                                <li>• Interpolation to align time points</li>
                                <li>• ode45 as reference solution</li>
                                <li>• Component-wise error analysis</li>
                            </ul>
                        </div>
                        <div className="bg-muted p-4 rounded-lg">
                            <h3 className="text-lg font-semibold mb-2">Key Findings</h3>
                            <p className="text-sm">Error analysis reveals:</p>
                            <ul className="mt-2 space-y-1 text-xs">
                                <li>• ode23 shows larger errors during rapid transitions</li>
                                <li>• ode15s closely matches ode45 throughout simulation</li>
                                <li>• Tumor cell equation has highest numerical sensitivity</li>
                            </ul>
                        </div>
                    </div>
                </CodeCard>
            </motion.section>

            {/* Solver Comparison Section */}
            <motion.section
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
            >
                <CodeCard
                    title="Solver Comparison"
                    icon={Diff}
                    code={`%% Compare Different Solvers 
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
                    description="Visual comparison of solutions from different numerical methods"
                >
                    <div className="bg-muted p-4 rounded-lg mt-4">
                        <h3 className="text-lg font-semibold mb-2">Solver Characteristics</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                                <h4 className="font-medium">ode45</h4>
                                <ul className="mt-1 space-y-1 text-xs">
                                    <li>• Runge-Kutta (4th-5th order)</li>
                                    <li>• High accuracy</li>
                                    <li>• Adaptive step size</li>
                                    <li>• Best for non-stiff problems</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-medium">ode23</h4>
                                <ul className="mt-1 space-y-1 text-xs">
                                    <li>• Runge-Kutta (2nd-3rd order)</li>
                                    <li>• Lower accuracy</li>
                                    <li>• Faster computation</li>
                                    <li>• Good for quick approximations</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-medium">ode15s</h4>
                                <ul className="mt-1 space-y-1 text-xs">
                                    <li>• Implicit multistep method</li>
                                    <li>• Variable order</li>
                                    <li>• Designed for stiff equations</li>
                                    <li>• Handles rapid transitions well</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </CodeCard>
            </motion.section>

            {/* Navigation */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="flex justify-between"
            >
                <Button variant="outline" className="flex items-center gap-2" asChild>
                    <Link href="/applied-programming">
                        <ArrowRight className="h-4 w-4 rotate-180" /> Back to Applied Programming
                    </Link>
                </Button>

                <Button className="flex items-center gap-2" asChild>
                    <Link href="/applied-programming/solvers">
                        ODE Solvers <ArrowRight className="h-4 w-4" />
                    </Link>
                </Button>
            </motion.div>
        </div>
    )
}