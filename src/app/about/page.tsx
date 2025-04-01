"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Award, BookOpen, Calendar, ChevronDown, ExternalLink, FileText, GraduationCap, Heart, Mail, MapPin, School, Users } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TeamMember } from "@/components/about/team-member"
import { ResearchMilestone } from "@/components/about/research-milestone"
import { InstitutionCard } from "@/components/about/institution-card"
import { PublicationCard } from "@/components/about/publication-card"
import Link from "next/link"

export default function AboutPage() {
    const { scrollYProgress } = useScroll()
    const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])
    const y = useTransform(scrollYProgress, [0, 0.1], [0, -50])

    return (
        <div className="relative">
            {/* Hero Section */}
            <motion.div
                className="relative h-[60vh] flex items-center justify-center overflow-hidden"
                style={{ opacity, y }}
            >
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
                            repeat: Number.POSITIVE_INFINITY,
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
                            repeat: Number.POSITIVE_INFINITY,
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
                                <Users className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                    </motion.div>

                    <motion.h1
                        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        About Our Research
                    </motion.h1>

                    <motion.p
                        className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        Meet the team behind the mathematical models and discover our journey
                    </motion.p>

                    {/* Scroll indicator */}
                    <motion.div
                        className="absolute bottom-10 left-0 right-0 flex justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                    >
                        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
                            <ChevronDown className="h-8 w-8 text-blue-500 dark:text-blue-400" />
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Main Content */}
            <div className="bg-gradient-to-b from-white to-blue-50 dark:from-slate-800 dark:to-slate-900 pt-16 pb-24">
                <div className="container mx-auto px-4">
                    {/* Our Mission */}
                    <motion.section
                        className="max-w-4xl mx-auto mb-20"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Our Mission</h2>
                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                Our research team is dedicated to understanding the complex interactions between the immune system,
                                tumor cells, and dietary factors through advanced mathematical modeling. We believe that by developing
                                sophisticated differential equation models, we can gain insights into cancer progression and prevention
                                that would be difficult to observe through traditional experimental methods alone.
                            </p>
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                The Nonlinear Tumor-Immune Unstable Hybrid Dynamical Model (NTIUNHDM) represents our effort to bridge
                                the gap between mathematical theory and biological reality. By combining expertise from mathematics,
                                biology, and computational science, we aim to develop predictive models that can inform both clinical
                                practice and personal health decisions.
                            </p>
                        </div>
                    </motion.section>

                    {/* Meet the Team */}
                    <motion.section
                        className="max-w-6xl mx-auto mb-20"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <h2 className="text-3xl font-bold mb-10 text-center text-gray-900 dark:text-white">Meet the Team</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <TeamMember
                                name="Dr. Sarah Chen"
                                role="Principal Investigator"
                                bio="Dr. Chen specializes in mathematical biology with a focus on differential equations modeling biological systems. She leads the research team and oversees the development of the NTIUNHDM model."
                                image="/placeholder.svg?height=400&width=400"
                                socialLinks={{
                                    email: "sarah.chen@example.edu",
                                    twitter: "sarahchen",
                                    linkedin: "sarahchen"
                                }}
                            />

                            <TeamMember
                                name="Dr. Michael Rodriguez"
                                role="Computational Biologist"
                                bio="Dr. Rodriguez brings expertise in computational biology and numerical methods. He develops the algorithms used to simulate and analyze the differential equation models."
                                image="/placeholder.svg?height=400&width=400"
                                socialLinks={{
                                    email: "michael.rodriguez@example.edu",
                                    twitter: "mrodriguez",
                                    linkedin: "michaelrodriguez"
                                }}
                            />

                            <TeamMember
                                name="Dr. Aisha Patel"
                                role="Cancer Immunologist"
                                bio="Dr. Patel's background in cancer immunology provides the biological foundation for our mathematical models. She ensures our equations accurately reflect current understanding of immune-tumor interactions."
                                image="/placeholder.svg?height=400&width=400"
                                socialLinks={{
                                    email: "aisha.patel@example.edu",
                                    twitter: "aishapatel",
                                    linkedin: "aishapatel"
                                }}
                            />

                            <TeamMember
                                name="Dr. James Wilson"
                                role="Nutritional Scientist"
                                bio="Dr. Wilson specializes in the impact of nutrition on immune function. His research informs the dietary components of our mathematical models."
                                image="/placeholder.svg?height=400&width=400"
                                socialLinks={{
                                    email: "james.wilson@example.edu",
                                    twitter: "jameswilson",
                                    linkedin: "jameswilson"
                                }}
                            />

                            <TeamMember
                                name="Emma Thompson"
                                role="PhD Candidate"
                                bio="Emma is researching novel numerical methods for solving the complex differential equations in our models. Her work focuses on improving computational efficiency."
                                image="/placeholder.svg?height=400&width=400"
                                socialLinks={{
                                    email: "emma.thompson@example.edu",
                                    twitter: "emmathompson",
                                    linkedin: "emmathompson"
                                }}
                            />

                            <TeamMember
                                name="David Kim"
                                role="PhD Candidate"
                                bio="David is investigating the relationship between specific dietary components and immune cell function through mathematical modeling and data analysis."
                                image="/placeholder.svg?height=400&width=400"
                                socialLinks={{
                                    email: "david.kim@example.edu",
                                    twitter: "davidkim",
                                    linkedin: "davidkim"
                                }}
                            />
                        </div>
                    </motion.section>

                    {/* Research Timeline */}
                    <motion.section
                        className="max-w-5xl mx-auto mb-20"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <h2 className="text-3xl font-bold mb-10 text-center text-gray-900 dark:text-white">Research Timeline</h2>

                        <div className="space-y-12">
                            <ResearchMilestone
                                year="2018"
                                title="Project Inception"
                                description="Initial conceptualization of the mathematical model to study immune-tumor interactions. Formation of the interdisciplinary research team."
                                icon={<Calendar className="h-6 w-6" />}
                            />

                            <ResearchMilestone
                                year="2019"
                                title="Model Development"
                                description="Development of the first version of the Nonlinear Tumor-Immune Unstable Hybrid Dynamical Model (NTIUNHDM). Initial simulations and parameter estimation."
                                icon={<FileText className="h-6 w-6" />}
                            />

                            <ResearchMilestone
                                year="2020"
                                title="Integration of Dietary Factors"
                                description="Expansion of the model to include the impact of dietary factors on immune function and tumor growth. Collaboration with nutritional scientists."
                                icon={<Heart className="h-6 w-6" />}
                            />

                            <ResearchMilestone
                                year="2021"
                                title="Computational Optimization"
                                description="Development of advanced numerical methods to improve simulation efficiency. Implementation of parallel computing techniques."
                                icon={<BookOpen className="h-6 w-6" />}
                            />

                            <ResearchMilestone
                                year="2022"
                                title="Model Validation"
                                description="Validation of model predictions against experimental data. Refinement of parameters based on biological measurements."
                                icon={<Award className="h-6 w-6" />}
                            />

                            <ResearchMilestone
                                year="2023"
                                title="Current Research"
                                description="Ongoing investigation of specific dietary components and their impact on immune function. Development of personalized model variants."
                                icon={<GraduationCap className="h-6 w-6" />}
                            />
                        </div>
                    </motion.section>

                    {/* Publications & Resources */}
                    <motion.section
                        className="max-w-5xl mx-auto mb-20"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <h2 className="text-3xl font-bold mb-10 text-center text-gray-900 dark:text-white">Publications & Resources</h2>

                        <Tabs defaultValue="publications" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 mb-8">
                                <TabsTrigger value="publications" className="cursor-pointer">Publications</TabsTrigger>
                                <TabsTrigger value="resources" className="cursor-pointer">Resources</TabsTrigger>
                            </TabsList>

                            <TabsContent value="publications" className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <PublicationCard
                                        title="Mathematical Modeling of Tumor-Immune Interactions: A Comprehensive Review"
                                        authors="Chen S, Rodriguez M, Patel A"
                                        journal="Journal of Mathematical Biology"
                                        year="2023"
                                        doi="10.1000/xyz123"
                                    />

                                    <PublicationCard
                                        title="Dietary Influences on Immune Function: Implications for Cancer Prevention"
                                        authors="Wilson J, Patel A, Chen S"
                                        journal="Nutrition and Cancer"
                                        year="2022"
                                        doi="10.1000/abc456"
                                    />

                                    <PublicationCard
                                        title="Numerical Methods for Solving Complex Differential Equations in Cancer Modeling"
                                        authors="Thompson E, Rodriguez M, Chen S"
                                        journal="Journal of Computational Biology"
                                        year="2022"
                                        doi="10.1000/def789"
                                    />

                                    <PublicationCard
                                        title="The NTIUNHDM Model: A Novel Approach to Understanding Cancer Progression"
                                        authors="Chen S, Patel A, Rodriguez M, Wilson J"
                                        journal="Mathematical Oncology"
                                        year="2021"
                                        doi="10.1000/ghi012"
                                    />
                                </div>
                            </TabsContent>

                            <TabsContent value="resources" className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Card className="p-6 hover:shadow-lg transition-shadow">
                                        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                                            <FileText className="h-5 w-5 text-blue-500" />
                                            Model Documentation
                                        </h3>
                                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                                            Comprehensive documentation of the NTIUNHDM model, including equations, parameters, and implementation details.
                                        </p>
                                        <Button className="flex items-center gap-2">
                                            <span>Download PDF</span>
                                            <ExternalLink className="h-4 w-4" />
                                        </Button>
                                    </Card>

                                    <Card className="p-6 hover:shadow-lg transition-shadow">
                                        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                                            <BookOpen className="h-5 w-5 text-blue-500" />
                                            Tutorial Series
                                        </h3>
                                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                                            Step-by-step tutorials on implementing and analyzing the NTIUNHDM model using various programming languages.
                                        </p>
                                        <Button className="flex items-center gap-2">
                                            <span>Access Tutorials</span>
                                            <ExternalLink className="h-4 w-4" />
                                        </Button>
                                    </Card>

                                    <Card className="p-6 hover:shadow-lg transition-shadow">
                                        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                                            <GraduationCap className="h-5 w-5 text-blue-500" />
                                            Educational Materials
                                        </h3>
                                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                                            Educational resources for students and researchers interested in mathematical modeling of biological systems.
                                        </p>
                                        <Button className="flex items-center gap-2">
                                            <span>Browse Materials</span>
                                            <ExternalLink className="h-4 w-4" />
                                        </Button>
                                    </Card>

                                    <Card className="p-6 hover:shadow-lg transition-shadow">
                                        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                                            <FileText className="h-5 w-5 text-blue-500" />
                                            Code Repository
                                        </h3>
                                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                                            Open-source implementation of the NTIUNHDM model, including simulation code and analysis tools.
                                        </p>
                                        <Button className="flex items-center gap-2">
                                            <span>View on GitHub</span>
                                            <ExternalLink className="h-4 w-4" />
                                        </Button>
                                    </Card>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </motion.section>

                    {/* Institutional Affiliations */}
                    <motion.section
                        className="max-w-5xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <h2 className="text-3xl font-bold mb-10 text-center text-gray-900 dark:text-white">Institutional Affiliations</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <InstitutionCard
                                name="University of Example"
                                department="Department of Applied Mathematics"
                                description="Our primary research institution, providing computational resources and academic support."
                                image="/placeholder.svg?height=200&width=400"
                            />

                            <InstitutionCard
                                name="Medical Research Institute"
                                department="Cancer Biology Division"
                                description="Collaborating institution providing biological expertise and experimental validation."
                                image="/placeholder.svg?height=200&width=400"
                            />

                            <InstitutionCard
                                name="National Science Foundation"
                                department="Mathematical Biology Program"
                                description="Major funding source supporting our interdisciplinary research initiatives."
                                image="/placeholder.svg?height=200&width=400"
                            />

                            <InstitutionCard
                                name="International Cancer Research Consortium"
                                department="Computational Oncology Working Group"
                                description="International collaboration network for sharing research findings and methodologies."
                                image="/placeholder.svg?height=200&width=400"
                            />
                        </div>

                        <div className="flex justify-center mt-16">
                            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 flex items-center gap-2">
                                <Link href="/contact">
                                    <span>Contact Our Team</span>
                                    <Mail className="h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </motion.section>
                </div>
            </div>
        </div>
    )
}