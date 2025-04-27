"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { MessageCircleQuestionIcon as QuestionMarkCircle, ArrowRight } from 'lucide-react'
import Link from "next/link"

export default function FAQPage() {
    return (
        <div className="container max-w-6xl mx-auto py-12 px-4 md:px-6">
            {/* Hero Section */}
            <motion.div
                className="mb-16 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600 font-serif">
                    Frequently Asked Questions
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto mb-6"></div>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    Find answers to common questions about our research and mathematical modeling approach
                </p>
            </motion.div>

            {/* FAQ Categories */}
            <motion.div
                className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                {faqCategories.map((category, index) => (
                    <Card
                        key={index}
                        className="border-none shadow-lg overflow-hidden transition-all hover:shadow-xl"
                    >
                        <CardContent className="p-6 flex flex-col h-full">
                            <div className="p-3 rounded-full bg-blue-50 dark:bg-blue-900/20 w-fit mb-4">
                                <category.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>

                            <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                            <p className="text-muted-foreground text-sm flex-grow">{category.description}</p>

                            <Link
                                href={`#${category.id}`}
                                className="mt-4 text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center"
                                onClick={(e) => {
                                    e.preventDefault()
                                    document.getElementById(category.id)?.scrollIntoView({ behavior: "smooth" })
                                }}
                            >
                                View questions <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </motion.div>

            {/* Research Questions */}
            <motion.section
                id="research"
                className="mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <Card className="border-none shadow-lg overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 rounded-full bg-blue-50 dark:bg-blue-900/20">
                                <QuestionMarkCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h2 className="text-2xl font-bold font-serif">Research Questions</h2>
                        </div>

                        <Accordion type="single" collapsible className="w-full">
                            {researchQuestions.map((item, index) => (
                                <AccordionItem key={index} value={`research-${index}`}>
                                    <AccordionTrigger className="text-left font-medium">{item.question}</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>
            </motion.section>

            {/* Model Questions */}
            <motion.section
                id="model"
                className="mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
            >
                <Card className="border-none shadow-lg overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 rounded-full bg-blue-50 dark:bg-blue-900/20">
                                <QuestionMarkCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h2 className="text-2xl font-bold font-serif">Model Questions</h2>
                        </div>

                        <Accordion type="single" collapsible className="w-full">
                            {modelQuestions.map((item, index) => (
                                <AccordionItem key={index} value={`model-${index}`}>
                                    <AccordionTrigger className="text-left font-medium">{item.question}</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>
            </motion.section>

            {/* Technical Questions */}
            <motion.section
                id="technical"
                className="mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
            >
                <Card className="border-none shadow-lg overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 rounded-full bg-blue-50 dark:bg-blue-900/20">
                                <QuestionMarkCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h2 className="text-2xl font-bold font-serif">Technical Questions</h2>
                        </div>

                        <Accordion type="single" collapsible className="w-full">
                            {technicalQuestions.map((item, index) => (
                                <AccordionItem key={index} value={`technical-${index}`}>
                                    <AccordionTrigger className="text-left font-medium">{item.question}</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>
            </motion.section>

            {/* Contact Section */}
            <motion.div
                className="mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
            >
                <Card className="border-none shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-900">
                    <CardContent className="p-8 text-center">
                        <h2 className="text-3xl font-bold mb-6 font-serif">Still Have Questions?</h2>
                        <p className="text-lg leading-relaxed font-light max-w-3xl mx-auto mb-8">
                            If you could not find the answer you were looking for, feel free to reach out to our team directly.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center px-6 py-3 bg-white dark:bg-slate-700 rounded-md shadow-sm hover:shadow-md transition-all text-blue-600 dark:text-blue-400 font-medium"
                        >
                            Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}

// FAQ Categories
import { BookOpen, Code, FileQuestion } from 'lucide-react'

const faqCategories = [
    {
        id: "research",
        title: "Research Questions",
        description: "Questions about our research goals, methodology, and findings",
        icon: BookOpen,
    },
    {
        id: "model",
        title: "Model Questions",
        description: "Questions about the mathematical model and its biological implications",
        icon: FileQuestion,
    },
    {
        id: "technical",
        title: "Technical Questions",
        description: "Questions about the implementation, code, and numerical methods",
        icon: Code,
    },
]

// Research Questions
const researchQuestions = [
    {
        question: "What is the main goal of your research?",
        answer: "Our main goal is to develop and analyze mathematical models that accurately represent tumor-immune dynamics, with a specific focus on how unhealthy diet affects these interactions. We aim to provide insights that could inform therapeutic strategies and dietary interventions for cancer patients."
    },
    {
        question: "How does your research contribute to cancer treatment?",
        answer: "Our research provides a computational framework for understanding how different factors, particularly diet, influence tumor growth and immune response. These insights can help in developing personalized treatment plans, optimizing immunotherapy protocols, and designing supportive dietary interventions that enhance conventional cancer treatments."
    },
    {
        question: "What data sources did you use to validate your model?",
        answer: "We validated our model using a combination of published experimental data from in vitro and in vivo studies, clinical observations from literature, and publicly available datasets on tumor growth patterns. The model parameters were calibrated to match observed biological behaviors in controlled experimental settings."
    },
    {
        question: "Are you collaborating with medical professionals?",
        answer: "Yes, our research team collaborates with oncologists, immunologists, and nutritionists to ensure our mathematical models accurately represent biological processes and have clinical relevance. These collaborations help us refine our models and interpret results in ways that can translate to clinical applications."
    },
    {
        question: "What are the limitations of your current research?",
        answer: "Current limitations include simplified representations of complex biological processes, challenges in parameter estimation due to limited data, and the difficulty of capturing individual patient variability. We're actively working to address these limitations through more sophisticated modeling approaches and additional data integration."
    }
]

// Model Questions
const modelQuestions = [
    {
        question: "What is the NTIUNHDM model?",
        answer: "The NTIUNHDM (Normal-Tumor-Immune-Unhealthy Diet Model) is a system of ordinary differential equations that describes the interactions between normal cells, tumor cells, and immune cells, with specific consideration of how unhealthy dietary factors influence these dynamics."
    },
    {
        question: "How does the model represent unhealthy diet?",
        answer: "Unhealthy diet is represented through parameters that modify the growth rates of tumor cells, reduce immune system effectiveness, and increase the vulnerability of normal cells to malignant transformation. These parameters are based on empirical studies linking poor nutrition to cancer progression."
    },
    {
        question: "What are the key assumptions in your model?",
        answer: "Key assumptions include: (1) cell populations can be modeled as continuous variables, (2) spatial effects are negligible (well-mixed system), (3) immune response follows established dose-response relationships, and (4) dietary effects can be approximated through modification of core biological parameters."
    },
    {
        question: "How do you determine the parameter values?",
        answer: "Parameter values are determined through a combination of literature-derived estimates, sensitivity analysis, and calibration against experimental data. For parameters with high uncertainty, we perform extensive sensitivity analyses to understand how their variation affects model outcomes."
    },
    {
        question: "Can your model predict individual patient outcomes?",
        answer: "The current model is designed to capture general principles rather than individual patient outcomes. However, with patient-specific parameterization and additional clinical data integration, future versions could potentially be adapted for personalized predictions as part of a decision support system."
    }
]

// Technical Questions
const technicalQuestions = [
    {
        question: "Which numerical methods do you use to solve the model?",
        answer: "We primarily use Runge-Kutta methods (ode45 and ode23) and implicit solvers (ode15s) from MATLAB's ODE suite. The choice of solver depends on the specific analysis being performed, with ode45 serving as our reference method for high-accuracy solutions."
    },
    {
        question: "How do you handle stiffness in your differential equations?",
        answer: "When stiffness is detected (typically in scenarios with rapid immune response or aggressive tumor growth), we switch to the ode15s solver, which is specifically designed for stiff systems. We also implement adaptive time-stepping to efficiently handle regions of rapid change."
    },
    {
        question: "What programming languages and tools do you use?",
        answer: "Our primary implementation is in MATLAB due to its robust ODE solvers and visualization capabilities. We also use Python with SciPy for some analyses and R for statistical evaluation of results. Version control is maintained through Git, and we use Docker for ensuring reproducibility."
    },
    {
        question: "How do you validate the numerical accuracy of your solutions?",
        answer: "We validate numerical accuracy through multiple approaches: comparing results from different solvers, performing convergence tests with decreasing error tolerances, conservation law verification where applicable, and benchmarking against analytical solutions for simplified versions of the model."
    },
    {
        question: "Is your code available for other researchers?",
        answer: "Yes, we're committed to open science principles. Our code is available in a GitHub repository with comprehensive documentation. We provide both the core model implementation and analysis scripts to ensure reproducibility and encourage collaboration and extension of our work."
    }
]