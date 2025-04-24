"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Github, Linkedin, Code, Cpu, Lightbulb, Rocket } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
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
                    Meet Our Team
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto mb-6"></div>
            </motion.div>

            {/* Team Introduction */}
            <motion.div
                className="mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <Card className="border-none shadow-lg overflow-hidden">
                    <CardContent className="p-0">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className="p-8 flex items-center">
                                <div>
                                    <h2 className="text-3xl font-bold mb-4 font-serif">Passionate Innovators</h2>
                                    <p className="text-lg leading-relaxed font-light">
                                        We&apos;re a team of 3 computer engineers and 1 mechatronics engineer united by our passion for applying
                                        mathematical models to solve complex biological problems.
                                    </p>
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-900 p-8 flex items-center justify-center">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center gap-2">
                                        <Code className="h-8 w-8 text-blue-500" />
                                        <span className="font-medium">Computer Engineering</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Cpu className="h-8 w-8 text-blue-500" />
                                        <span className="font-medium">Mechatronics</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Lightbulb className="h-8 w-8 text-blue-500" />
                                        <span className="font-medium">Innovation</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Rocket className="h-8 w-8 text-blue-500" />
                                        <span className="font-medium">Research</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Team Members */}
            <motion.div
                className="mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {teamMembers.map((member, index) => (
                        <TeamMemberCard key={index} member={member} index={index} />
                    ))}
                </div>
            </motion.div>

            {/* Our Mission */}
            <motion.div
                className="mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
            >
                <Card className="border-none shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-900">
                    <CardContent className="p-8 text-center">
                        <h2 className="text-3xl font-bold mb-6 font-serif">Our Mission</h2>
                        <p className="text-lg leading-relaxed font-light max-w-3xl mx-auto">
                            Bridging the gap between mathematical modeling and biological systems to develop innovative solutions for
                            cancer research.
                        </p>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}

interface TeamMember {
    name: string
    role: string
    specialty: string
    image: string
    social: {
        github?: string
        linkedin?: string
    }
}

const teamMembers: TeamMember[] = [
    {
        name: "Emmanuel Adoum",
        role: "Computer Engineer",
        specialty: "ML & AI engineer",
        image: "/images/emma1.jpg",
        social: {
            github: "https://github.com/adoumouangnamouemmanuel",
            linkedin: "https://www.linkedin.com/in/ouang-namou-emmanuel-adoum",
        },
    },
    {
        name: "Chioma Divyan",
        role: "Computer Engineer",
        specialty: "Hardware",
        image: "/images/chioma.jpg",
        social: {
            github: "https://github.com",
            linkedin: "https://www.linkedin.com/in/gift-chioma-chukwuemeka-013848317/",
        },
    },
    {
        name: "Ayishatu Mohammed",
        role: "Computer Engineer",
        specialty: "IOT and Data Science",
        image: "/images/isha.jpeg",
        social: {
            github: "https://github.com",
            linkedin: "https://www.linkedin.com/in/ayishatu-mohammed-5381992ba/",
        },
    },
    {
        name: "Fatchima Mamadou",
        role: "Mechatronics Engineer",
        specialty: "System Integration",
        image: "/images/fatchima1.jpeg",
        social: {
            github: "https://github.com",
            linkedin: "https://www.linkedin.com/in/fatchima-mamadou-9b0225282/",
        },
    },
]

function TeamMemberCard({ member, index }: { member: TeamMember; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            className="group"
        >
            <Card className="border-none shadow-lg overflow-hidden h-full transition-all duration-300 group-hover:shadow-xl">
                <CardContent className="p-0">
                    <div className="relative">
                        <div className="aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
                            <Image
                                src={member.image || "/placeholder.svg"}
                                alt={member.name}
                                width={300}
                                height={300}
                                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                            <div className="p-4 w-full">
                                <div className="flex justify-center space-x-4">
                                    {member.social.github && (
                                        <Link href={member.social.github} target="_blank" rel="noopener noreferrer">
                                            <Github className="h-5 w-5 text-white hover:text-blue-400 transition-colors" />
                                        </Link>
                                    )}
                                    {member.social.linkedin && (
                                        <Link href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                                            <Linkedin className="h-5 w-5 text-white hover:text-blue-400 transition-colors" />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 text-center">
                        <h3 className="font-bold text-lg">{member.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{member.role}</p>
                        <div className="mt-2 inline-block bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full text-xs text-blue-800 dark:text-blue-300">
                            {member.specialty}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}