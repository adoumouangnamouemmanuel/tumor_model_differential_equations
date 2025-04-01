"use client"
import { motion, useScroll, useTransform } from "framer-motion"
import {
    Activity,
    ArrowRight,
    Brain,
    ChevronDown,
    Dna,
    FlaskRoundIcon as Flask,
    Pizza,
    Microscope,
    Lightbulb,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ResultsHero } from "@/components/results/results-hero"
import { KeyFinding } from "@/components/results/key-finding"
import { RelationshipDiagram } from "@/components/results/relationship-diagram"
import { FutureDirections } from "@/components/results/future-directions"
import { ResearchQuote } from "@/components/results/research-quote"

export default function StudyResultsPage() {
    const { scrollYProgress } = useScroll()
    const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])
    const y = useTransform(scrollYProgress, [0, 0.1], [0, -50])

    return (
        <div className="relative">
            {/* Hero Section */}
            <motion.div className="relative h-[60vh] flex items-center justify-center overflow-hidden" style={{ opacity, y }}>
                <ResultsHero />
            </motion.div>

            {/* Main Content */}
            <div className="bg-gradient-to-b from-white to-blue-50 dark:from-slate-800 dark:to-slate-900 pt-16 pb-24">
                <div className="container mx-auto px-4">
                    {/* Introduction */}
                    <motion.div
                        className="max-w-4xl mx-auto mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Study Overview</h2>
                        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                            The Nonlinear Tumor-Immune Unstable Hybrid Dynamical Model (NTIUNHDM) focuses on the role of the immune
                            system in preventing tumor growth and how a bad diet undermines this body system. Our research
                            demonstrates the critical relationship between immune function, dietary choices, and cancer progression.
                        </p>

                        <div className="flex justify-center mt-12 mb-8">
                            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
                                <ChevronDown className="h-8 w-8 text-blue-500 dark:text-blue-400" />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Key Findings Section */}
                    <motion.section
                        className="max-w-6xl mx-auto mb-20"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <h2 className="text-3xl font-bold mb-10 text-center text-gray-900 dark:text-white">Key Findings</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <KeyFinding
                                icon={<Brain className="h-6 w-6" />}
                                title="Immune System Role"
                                description="When immune cell function is weakened either due to bad diet, heredity, or environmental factors, tumor cells multiply uncontrolled. A healthy immune system can suppress or kill off tumor cells, halting or preventing cancer growth."
                                color="blue"
                            />

                            <KeyFinding
                                icon={<Dna className="h-6 w-6" />}
                                title="Cellular Competition"
                                description="Normal and tumor cells compete for resources. As tumor cells increase, they outcompete normal cells, causing their reduction. The immune system, when in active condition, plays a counter to this by engaging the tumor cells."
                                color="purple"
                            />

                            <KeyFinding
                                icon={<Pizza className="h-6 w-6" />}
                                title="Dietary Influence"
                                description="Immune efficiency is influenced by diet, where malnutrition or excessive consumption of improper foods results in immune depletion that lowers its response to tumor increase."
                                color="green"
                            />

                            <KeyFinding
                                icon={<Activity className="h-6 w-6" />}
                                title="Saturation Effects"
                                description="Immune responses undergo a saturation effect; beyond a limit, increased tumor or normal cell contact does not significantly elevate immune activation. This implies that stimulation of immune function is beneficial, but excess stimulation could lead to inefficacy."
                                color="orange"
                            />
                        </div>
                    </motion.section>

                    {/* Relationship Diagram */}
                    <motion.section
                        className="max-w-5xl mx-auto mb-20"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <h2 className="text-3xl font-bold mb-10 text-center text-gray-900 dark:text-white">System Interactions</h2>

                        <Card className="p-6 border-none">
                            <RelationshipDiagram />
                        </Card>
                    </motion.section>

                    {/* Research Quote */}
                    <motion.section
                        className="max-w-4xl mx-auto mb-20"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <ResearchQuote
                            quote="These findings reaffirm the importance of an equilibrium diet and lifestyle to facilitate immune function as a cancer preventive measure. While medical treatments are essential, lifestyle modifications can amplify the body's natural resistance to cancer."
                            author="Research Team"
                        />
                    </motion.section>

                    {/* Conclusion */}
                    <motion.section
                        className="max-w-4xl mx-auto mb-20"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Conclusion</h2>
                        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                            The study confirms that a compromised immune system, either from external or internal stimuli, offers the
                            environment under which tumors thrive. Our mathematical model dynamically presents the relationships
                            between diet, immunity, and cancer cell growth, providing a foundation for future experimental studies to
                            clinically validate these findings.
                        </p>
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                            Strengthening immune health by making correct lifestyle decisions is a fundamental method of cancer
                            prevention and control. The balance between normal cells, tumor cells, and immune function is delicate,
                            and maintaining this balance through proper diet and lifestyle choices can significantly impact cancer
                            outcomes.
                        </p>
                    </motion.section>

                    {/* Future Directions */}
                    <motion.section
                        className="max-w-5xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <h2 className="text-3xl font-bold mb-10 text-center text-gray-900 dark:text-white">
                            Future Research Directions
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <FutureDirections
                                icon={<Microscope className="h-6 w-6" />}
                                title="Specific Dietary Elements"
                                description="Investigate specific elements of diet that have direct impacts on immune efficiency and cancer suppression."
                            />

                            <FutureDirections
                                icon={<Flask className="h-6 w-6" />}
                                title="Clinical Validation"
                                description="Conduct experimental studies to clinically validate the findings from our mathematical model."
                            />

                            <FutureDirections
                                icon={<Lightbulb className="h-6 w-6" />}
                                title="Preventive Strategies"
                                description="Develop targeted preventive strategies based on optimizing immune function through lifestyle interventions."
                            />
                        </div>

                        <div className="flex justify-center mt-12">
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 flex items-center gap-2">
                                <span>Explore Our Research Methods</span>
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </motion.section>
                </div>
            </div>
        </div>
    )
}