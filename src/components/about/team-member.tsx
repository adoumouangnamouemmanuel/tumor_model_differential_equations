"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TeamMemberProps {
    name: string
    role: string
    bio: string
    image: string
    socialLinks: {
        email?: string
        twitter?: string
        linkedin?: string
    }
}

export function TeamMember({ name, role, bio, image, socialLinks }: TeamMemberProps) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <motion.div
            className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            <div className="relative overflow-hidden">
                <motion.img
                    src={image}
                    alt={name}
                    className="w-full h-64 object-cover"
                    animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                <motion.div
                    className="absolute bottom-0 left-0 right-0 p-4 text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <h3 className="text-xl font-bold">{name}</h3>
                    <p className="text-sm text-white/80">{role}</p>
                </motion.div>
            </div>

            <div className="p-6">
                <p className="text-gray-700 dark:text-gray-300 mb-4">{bio}</p>

                <div className="flex space-x-2">
                    {socialLinks.email && (
                        <Button
                            size="icon"
                            variant="outline"
                            className="rounded-full hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400"
                            asChild
                        >
                            <a href={`mailto:${socialLinks.email}`} aria-label={`Email ${name}`}>
                                <Mail className="h-4 w-4" />
                            </a>
                        </Button>
                    )}

                    {socialLinks.twitter && (
                        <Button
                            size="icon"
                            variant="outline"
                            className="rounded-full hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400"
                            asChild
                        >
                            <a
                                href={`https://twitter.com/${socialLinks.twitter}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${name}'s Twitter`}
                            >
                                <Twitter className="h-4 w-4" />
                            </a>
                        </Button>
                    )}

                    {socialLinks.linkedin && (
                        <Button
                            size="icon"
                            variant="outline"
                            className="rounded-full hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400"
                            asChild
                        >
                            <a
                                href={`https://linkedin.com/in/${socialLinks.linkedin}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${name}'s LinkedIn`}
                            >
                                <Linkedin className="h-4 w-4" />
                            </a>
                        </Button>
                    )}
                </div>
            </div>
        </motion.div>
    )
}