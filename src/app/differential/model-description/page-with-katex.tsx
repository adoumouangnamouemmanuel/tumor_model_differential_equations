// "use client"
//
// import { motion } from "framer-motion"
// import { ArrowRight, Brain, Dna, FlaskRoundIcon as Flask, HeartPulse, Pizza, Zap } from "lucide-react"
// import { ModelDiagramImage } from "@/components/model/model-diagram-image"
// import { VideoPlayer } from "@/components/model/video-player"
// import { ModelAssumption } from "@/components/model/model-assumption"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import "katex/dist/katex.min.css"
// import { InlineMath, BlockMath } from "react-katex"
//
// export default function ModelDescriptionPage() {
//     const fadeIn = {
//         initial: { opacity: 0, y: 20 },
//         animate: { opacity: 1, y: 0 },
//         transition: { duration: 0.6 },
//     }
//
//     return (
//         <div className="container max-w-6xl mx-auto py-12 px-4 md:px-6">
//             {/* Hero Section */}
//             <motion.div
//                 className="mb-16 text-center"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8 }}
//             >
//                 <h1 className="text-4xl md:text-5xl font-bold mb-6">
//                     Normal-Tumor-Immune-Unhealthy Diet Model
//                     <span className="text-[hsl(var(--primary))] ml-2">(NTIUNHDM)</span>
//                 </h1>
//                 <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto">
//                     A mathematical framework describing the interactions among normal cells, tumor cells, immune response, and the
//                     impact of an unhealthy diet.
//                 </p>
//             </motion.div>
//
//             {/* Model Overview */}
//             <motion.section
//                 className="mb-16"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: 0.2 }}
//             >
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
//                     <div>
//                         <h2 className="text-3xl font-bold mb-6">Model Overview</h2>
//                         <p className="mb-4">
//                             The NTIUNHDM is represented as a system of three differential equations that capture the growth,
//                             inhibition, and stimulation effects among biological components.
//                         </p>
//                         <p className="mb-6">The primary variables of the system are:</p>
//                         <ul className="space-y-4">
//                             <li className="flex items-start">
//                                 <div className="mr-4 bg-[hsl(var(--primary))] bg-opacity-20 p-2 rounded-full">
//                                     <HeartPulse className="h-5 w-5 text-[hsl(var(--primary))]" />
//                                 </div>
//                                 <div>
//                                     <span className="font-bold">N(t):</span> The population of normal (healthy) cells at time t.
//                                 </div>
//                             </li>
//                             <li className="flex items-start">
//                                 <div className="mr-4 bg-[hsl(var(--destructive))] bg-opacity-20 p-2 rounded-full">
//                                     <Dna className="h-5 w-5 text-[hsl(var(--destructive))]" />
//                                 </div>
//                                 <div>
//                                     <span className="font-bold">T(t):</span> The population of tumor cells at time t.
//                                 </div>
//                             </li>
//                             <li className="flex items-start">
//                                 <div className="mr-4 bg-[hsl(var(--secondary))] bg-opacity-20 p-2 rounded-full">
//                                     <Brain className="h-5 w-5 text-[hsl(var(--secondary))]" />
//                                 </div>
//                                 <div>
//                                     <span className="font-bold">I(t):</span> The immune cell concentration at time t.
//                                 </div>
//                             </li>
//                         </ul>
//                     </div>
//                     <div className="bg-[hsl(var(--card))] p-6 rounded-xl shadow-lg border border-[hsl(var(--border))]">
//                         <ModelDiagramImage />
//                     </div>
//                 </div>
//             </motion.section>
//
//             {/* Model Assumptions */}
//             <motion.section
//                 className="mb-16"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: 0.4 }}
//             >
//                 <h2 className="text-3xl font-bold mb-8">Assumptions of the Model</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <ModelAssumption
//                         number={1}
//                         title="Logistic Growth of Normal and Tumor Cells"
//                         icon={<Zap className="h-5 w-5" />}
//                         description="Normal cells (N) and tumor cells (T) follow logistic growth, meaning that their populations grow exponentially at low densities but slow down as they reach their respective carrying capacities. The logistic model accounts for resource limitations such as oxygen, nutrients, and space."
//                     />
//
//                     <ModelAssumption
//                         number={2}
//                         title="Competition Between Normal and Tumor Cells"
//                         icon={<ArrowRight className="h-5 w-5" />}
//                         description="Tumor cells and normal cells compete for resources, and tumor cells tend to proliferate at the expense of normal cells. This competition introduces an inhibitory effect of tumor cells on normal cell survival."
//                     />
//
//                     <ModelAssumption
//                         number={3}
//                         title="Role of the Immune System"
//                         icon={<Brain className="h-5 w-5" />}
//                         description="The immune system plays a dual role: It eliminates tumor cells by detecting and destroying them, and it can also mistakenly attack normal cells in autoimmune-like responses. The activation of immune cells depends on the presence of both normal and tumor cells."
//                     />
//
//                     <ModelAssumption
//                         number={4}
//                         title="Unhealthy Diet Influences the Immune Response"
//                         icon={<Pizza className="h-5 w-5" />}
//                         description="An unhealthy diet weakens immune function, reducing the effectiveness of immune cells in targeting tumor cells. Dietary factors indirectly affect normal and tumor cell populations by modulating immune responses."
//                     />
//
//                     <ModelAssumption
//                         number={5}
//                         title="Saturation Effects in Immune Response"
//                         icon={<Flask className="h-5 w-5" />}
//                         description="The immune response is not linear; it saturates when a large number of normal or tumor cells are present, meaning that beyond a certain threshold, additional stimulation does not significantly increase immune cell activation. This effect is incorporated using Michaelis-Menten-like saturation terms in the model."
//                         className="md:col-span-2"
//                     />
//                 </div>
//             </motion.section>
//
//             {/* Model Equations */}
//             <motion.section
//                 className="mb-16"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: 0.6 }}
//             >
//                 <h2 className="text-3xl font-bold mb-8">Model Equations and Their Derivation</h2>
//
//                 <Tabs defaultValue="normal" className="w-full">
//                     <TabsList className="grid w-full grid-cols-3 mb-8">
//                         <TabsTrigger value="normal">Normal Cell Dynamics</TabsTrigger>
//                         <TabsTrigger value="tumor">Tumor Cell Dynamics</TabsTrigger>
//                         <TabsTrigger value="immune">Immune Cell Dynamics</TabsTrigger>
//                     </TabsList>
//
//                     <TabsContent value="normal" className="space-y-6">
//                         <Card>
//                             <CardHeader>
//                                 <CardTitle className="flex items-center">
//                                     <HeartPulse className="h-5 w-5 mr-2 text-[hsl(var(--primary))]" />
//                                     Normal Cell Dynamics
//                                 </CardTitle>
//                                 <CardDescription>
//                                     The equation describing the population change of normal cells over time
//                                 </CardDescription>
//                             </CardHeader>
//                             <CardContent>
//                                 <div className="space-y-6">
//                                     <div className="flex flex-col items-center">
//                                         <div className="text-2xl md:text-3xl py-6 overflow-x-auto w-full text-center">
//                                             <BlockMath math="\frac{dN}{dt} = rN(1 - \beta_1 N) - \eta NI - \gamma NT" />
//                                         </div>
//
//                                         <div className="flex flex-wrap gap-2 justify-center">
//                                             {[
//                                                 {
//                                                     name: "Logistic Growth",
//                                                     term: "rN(1 - \\beta_1 N)",
//                                                     description:
//                                                         "Represents the logistic growth of normal cells, where r is the intrinsic growth rate and \\beta_1 determines the carrying capacity",
//                                                 },
//                                                 {
//                                                     name: "Immune System Interaction",
//                                                     term: "- \\eta NI",
//                                                     description:
//                                                         "Models the potential attack of immune cells on normal cells due to autoimmune effects",
//                                                 },
//                                                 {
//                                                     name: "Tumor Competition Effect",
//                                                     term: "- \\gamma NT",
//                                                     description: "Captures the inhibitory effect of tumor cells on normal cell growth",
//                                                 },
//                                             ].map((term, index) => (
//                                                 <motion.button
//                                                     key={index}
//                                                     className="px-3 py-1 rounded-full text-sm border bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] border-[hsl(var(--border))]"
//                                                     whileHover={{ scale: 1.05 }}
//                                                     whileTap={{ scale: 0.95 }}
//                                                     onClick={() => {}}
//                                                 >
//                                                     {term.name}
//                                                 </motion.button>
//                                             ))}
//                                         </div>
//                                     </div>
//
//                                     <div className="mt-6">
//                                         <h4 className="font-semibold mb-3">Parameters:</h4>
//                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//                                             {[
//                                                 { symbol: "r", description: "Intrinsic growth rate of normal cells" },
//                                                 {
//                                                     symbol: "\\beta_1",
//                                                     description: "Determines the carrying capacity of normal cells due to resource limitations",
//                                                 },
//                                                 {
//                                                     symbol: "\\eta",
//                                                     description:
//                                                         "Quantifies the effect of immune cells attacking normal cells (immune overactivity)",
//                                                 },
//                                                 {
//                                                     symbol: "\\gamma",
//                                                     description: "Captures the inhibitory effect of tumor cells on normal cell survival",
//                                                 },
//                                             ].map((param, index) => (
//                                                 <div
//                                                     key={index}
//                                                     className="flex items-center space-x-2 p-2 rounded-md hover:bg-[hsl(var(--muted))]"
//                                                 >
//                           <span className="text-lg">
//                             <InlineMath math={param.symbol} />
//                           </span>
//                                                     <span>{param.description}</span>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </CardContent>
//                         </Card>
//
//                         <VideoPlayer
//                             src="/videos/normal-cell-simulation.mp4"
//                             title="Normal Cell Dynamics Simulation"
//                             description="This simulation shows how normal cells grow and interact with tumor cells and immune cells over time."
//                         />
//                     </TabsContent>
//
//                     <TabsContent value="tumor" className="space-y-6">
//                         <Card>
//                             <CardHeader>
//                                 <CardTitle className="flex items-center">
//                                     <Dna className="h-5 w-5 mr-2 text-[hsl(var(--destructive))]" />
//                                     Tumor Cell Dynamics
//                                 </CardTitle>
//                                 <CardDescription>The equation describing the growth and regulation of tumor cells</CardDescription>
//                             </CardHeader>
//                             <CardContent>
//                                 <div className="space-y-6">
//                                     <div className="flex flex-col items-center">
//                                         <div className="text-2xl md:text-3xl py-6 overflow-x-auto w-full text-center">
//                                             <BlockMath math="\frac{dT}{dt} = \alpha_1 T(1-\alpha_2 T) + \beta_2 NT - \alpha_3 TI" />
//                                         </div>
//
//                                         <div className="flex flex-wrap gap-2 justify-center">
//                                             {[
//                                                 {
//                                                     name: "Tumor Logistic Growth",
//                                                     term: "\\alpha_1 T(1-\\alpha_2 T)",
//                                                     description:
//                                                         "Represents the logistic growth of tumor cells, where \\alpha_1 is the intrinsic growth rate and \\alpha_2 controls the carrying capacity",
//                                                 },
//                                                 {
//                                                     name: "Tumor Promotion by Normal Cells",
//                                                     term: "\\beta_2 NT",
//                                                     description:
//                                                         "Accounts for conditions where tumor cells benefit from interactions with normal cells",
//                                                 },
//                                                 {
//                                                     name: "Immune System Suppression of Tumors",
//                                                     term: "- \\alpha_3 TI",
//                                                     description: "Models the effect of immune cells attacking tumor cells",
//                                                 },
//                                             ].map((term, index) => (
//                                                 <motion.button
//                                                     key={index}
//                                                     className="px-3 py-1 rounded-full text-sm border bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] border-[hsl(var(--border))]"
//                                                     whileHover={{ scale: 1.05 }}
//                                                     whileTap={{ scale: 0.95 }}
//                                                     onClick={() => {}}
//                                                 >
//                                                     {term.name}
//                                                 </motion.button>
//                                             ))}
//                                         </div>
//                                     </div>
//
//                                     <div className="mt-6">
//                                         <h4 className="font-semibold mb-3">Parameters:</h4>
//                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//                                             {[
//                                                 { symbol: "\\alpha_1", description: "Intrinsic growth rate of tumor cells" },
//                                                 { symbol: "\\alpha_2", description: "Controls the tumor carrying capacity" },
//                                                 {
//                                                     symbol: "\\beta_2",
//                                                     description: "Represents the stimulatory effect of normal cells on tumor growth",
//                                                 },
//                                                 {
//                                                     symbol: "\\alpha_3",
//                                                     description: "Quantifies the killing efficiency of immune cells against tumor cells",
//                                                 },
//                                             ].map((param, index) => (
//                                                 <div
//                                                     key={index}
//                                                     className="flex items-center space-x-2 p-2 rounded-md hover:bg-[hsl(var(--muted))]"
//                                                 >
//                           <span className="text-lg">
//                             <InlineMath math={param.symbol} />
//                           </span>
//                                                     <span>{param.description}</span>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </CardContent>
//                         </Card>
//
//                         <VideoPlayer
//                             src="/videos/tumor-cell-simulation.mp4"
//                             title="Tumor Cell Dynamics Simulation"
//                             description="This simulation shows how tumor cells grow and interact with normal cells and immune cells over time."
//                         />
//                     </TabsContent>
//
//                     <TabsContent value="immune" className="space-y-6">
//                         <Card>
//                             <CardHeader>
//                                 <CardTitle className="flex items-center">
//                                     <Brain className="h-5 w-5 mr-2 text-[hsl(var(--secondary))]" />
//                                     Immune Cell Dynamics
//                                 </CardTitle>
//                                 <CardDescription>The equation describing the changes in the immune cell population</CardDescription>
//                             </CardHeader>
//                             <CardContent>
//                                 <div className="space-y-6">
//                                     <div className="flex flex-col items-center">
//                                         <div className="text-2xl md:text-3xl py-6 overflow-x-auto w-full text-center">
//                                             <BlockMath math="\frac{dI}{dt} = \sigma - \delta I + \frac{\rho NI}{m + N} + \frac{\rho_1 TI}{m_1 + T} - \mu NI - \mu_1 TI" />
//                                         </div>
//
//                                         <div className="flex flex-wrap gap-2 justify-center">
//                                             {[
//                                                 {
//                                                     name: "Immune Cell Production",
//                                                     term: "\\sigma",
//                                                     description:
//                                                         "Represents the baseline production of immune cells from the bone marrow and lymphatic system",
//                                                 },
//                                                 {
//                                                     name: "Immune Cell Natural Decay",
//                                                     term: "- \\delta I",
//                                                     description: "Accounts for the natural degradation or apoptosis of immune cells over time",
//                                                 },
//                                                 {
//                                                     name: "Immune Activation",
//                                                     term: "\\frac{\\rho NI}{m + N} + \\frac{\\rho_1 TI}{m_1 + T}",
//                                                     description:
//                                                         "Describes the activation of immune cells by normal and tumor cells, with saturation effects",
//                                                 },
//                                                 {
//                                                     name: "Immune Exhaustion Effects",
//                                                     term: "- \\mu NI - \\mu_1 TI",
//                                                     description:
//                                                         "Represents immune cell exhaustion, where excessive interactions with normal or tumor cells lead to immune cell fatigue",
//                                                 },
//                                             ].map((term, index) => (
//                                                 <motion.button
//                                                     key={index}
//                                                     className="px-3 py-1 rounded-full text-sm border bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] border-[hsl(var(--border))]"
//                                                     whileHover={{ scale: 1.05 }}
//                                                     whileTap={{ scale: 0.95 }}
//                                                     onClick={() => {}}
//                                                 >
//                                                     {term.name}
//                                                 </motion.button>
//                                             ))}
//                                         </div>
//                                     </div>
//
//                                     <div className="mt-6">
//                                         <h4 className="font-semibold mb-3">Parameters:</h4>
//                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//                                             {[
//                                                 { symbol: "\\sigma", description: "Baseline immune cell production rate" },
//                                                 { symbol: "\\delta", description: "Natural death rate of immune cells" },
//                                                 {
//                                                     symbol: "\\rho, \\rho_1",
//                                                     description: "Quantify the stimulation of immune cells by normal and tumor cells",
//                                                 },
//                                                 { symbol: "m, m_1", description: "Introduce saturation effects on immune activation" },
//                                                 {
//                                                     symbol: "\\mu, \\mu_1",
//                                                     description: "Model immune exhaustion due to interactions with normal and tumor cells",
//                                                 },
//                                             ].map((param, index) => (
//                                                 <div
//                                                     key={index}
//                                                     className="flex items-center space-x-2 p-2 rounded-md hover:bg-[hsl(var(--muted))]"
//                                                 >
//                           <span className="text-lg">
//                             <InlineMath math={param.symbol} />
//                           </span>
//                                                     <span>{param.description}</span>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </CardContent>
//                         </Card>
//
//                         <VideoPlayer
//                             src="/videos/immune-cell-simulation.mp4"
//                             title="Immune Cell Dynamics Simulation"
//                             description="This simulation shows how immune cells respond to normal and tumor cells over time."
//                         />
//                     </TabsContent>
//                 </Tabs>
//             </motion.section>
//
//             {/* Biological Justifications */}
//             <motion.section
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: 0.8 }}
//             >
//                 <h2 className="text-3xl font-bold mb-8">Biological Justifications of the Model</h2>
//
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <Card>
//                         <CardHeader>
//                             <CardTitle className="flex items-center">
//                                 <HeartPulse className="h-5 w-5 mr-2 text-[hsl(var(--primary))]" />
//                                 Normal Cell Growth Control
//                             </CardTitle>
//                         </CardHeader>
//                         <CardContent>
//                             <p>
//                                 The logistic term ensures that normal cells do not grow indefinitely but stabilize due to limited
//                                 resources.
//                             </p>
//                         </CardContent>
//                     </Card>
//
//                     <Card>
//                         <CardHeader>
//                             <CardTitle className="flex items-center">
//                                 <Dna className="h-5 w-5 mr-2 text-[hsl(var(--destructive))]" />
//                                 Tumor Competition and Aggressiveness
//                             </CardTitle>
//                         </CardHeader>
//                         <CardContent>
//                             <p>
//                                 Tumor cells outcompete normal cells, reducing normal cell populations through resource competition and
//                                 direct inhibition.
//                             </p>
//                         </CardContent>
//                     </Card>
//
//                     <Card>
//                         <CardHeader>
//                             <CardTitle className="flex items-center">
//                                 <Brain className="h-5 w-5 mr-2 text-[hsl(var(--secondary))]" />
//                                 Immune System Regulation
//                             </CardTitle>
//                         </CardHeader>
//                         <CardContent>
//                             <p>
//                                 Immune cells are stimulated by both normal and tumor cells, but their response is constrained by
//                                 saturation and exhaustion effects.
//                             </p>
//                         </CardContent>
//                     </Card>
//
//                     <Card>
//                         <CardHeader>
//                             <CardTitle className="flex items-center">
//                                 <Pizza className="h-5 w-5 mr-2 text-[hsl(var(--warning))]" />
//                                 Dietary Influence
//                             </CardTitle>
//                         </CardHeader>
//                         <CardContent>
//                             <p>
//                                 An unhealthy diet affects immune function, altering the balance between tumor suppression and immune
//                                 exhaustion.
//                             </p>
//                         </CardContent>
//                     </Card>
//                 </div>
//             </motion.section>
//         </div>
//     )
// }