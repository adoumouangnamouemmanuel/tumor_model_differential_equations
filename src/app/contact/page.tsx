"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone, Send, CheckCircle } from "lucide-react"

export default function ContactPage() {
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Simulate form submission
        setIsSubmitted(true)
        setTimeout(() => setIsSubmitted(false), 3000)
    }

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
                    Get In Touch
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto mb-6"></div>
            </motion.div>

            {/* Contact Form and Info */}
            <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <Card className="border-none shadow-lg">
                        <CardContent className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Input placeholder="Your Name" required />
                                </div>
                                <div className="space-y-2">
                                    <Input type="email" placeholder="Your Email" required />
                                </div>
                                <div className="space-y-2">
                                    <Input placeholder="Subject" required />
                                </div>
                                <div className="space-y-2">
                                    <Textarea placeholder="Your Message" className="min-h-[150px]" required />
                                </div>
                                <Button type="submit" className="w-full" disabled={isSubmitted}>
                                    {isSubmitted ? (
                                        <span className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4" /> Message Sent
                    </span>
                                    ) : (
                                        <span className="flex items-center">
                      <Send className="mr-2 h-4 w-4" /> Send Message
                    </span>
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <Card className="border-none shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-900">
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-blue-500 p-3 rounded-full">
                                        <Mail className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">Email Us</h3>
                                        <p className="text-gray-600 dark:text-gray-400">team@ntiunhdm.research</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-900">
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-blue-500 p-3 rounded-full">
                                        <Phone className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">Call Us</h3>
                                        <p className="text-gray-600 dark:text-gray-400">+1 (555) 123-4567</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-900">
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-blue-500 p-3 rounded-full">
                                        <MapPin className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">Visit Us</h3>
                                        <p className="text-gray-600 dark:text-gray-400">University Research Center, Building 4, Room 301</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </motion.div>

            {/* Map */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <Card className="border-none shadow-lg overflow-hidden">
                    <CardContent className="p-0">
                        <div className="aspect-[21/9] bg-gray-200 dark:bg-gray-800 relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <MapPin className="h-12 w-12 text-blue-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}