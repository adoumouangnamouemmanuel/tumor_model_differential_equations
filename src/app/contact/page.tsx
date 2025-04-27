"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { AtSign, Mail, Clock, Send, ArrowRight, CheckCircle } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import Link from "next/link"
import { EmailJSProvider, sendEmail } from "@/components/contact/email-js-provider"

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const result = await sendEmail(formData)

            if (result.success) {
                setFormSubmitted(true) // Set form as submitted to show success state
                toast.success("Message sent successfully!", {
                    description: "We'll get back to you as soon as possible.",
                })

                // Reset form after showing success state
                setTimeout(() => {
                    setFormData({
                        name: "",
                        email: "",
                        subject: "",
                        message: "",
                    })
                    setFormSubmitted(false) // Reset to show form again
                    setIsSubmitting(false)
                }, 3000)
            } else {
                // Show specific error message if available
                const errorMessage = typeof result.error === "string" ? result.error : "Failed to send email"
                toast.error("Error sending message", {
                    description: errorMessage,
                })
                setIsSubmitting(false)
            }
        } catch (error) {
            // Handle any unexpected errors
            const errorMessage = error instanceof Error ? error.message : "Please try again later or contact us directly."
            toast.error("Error sending message", {
                description: errorMessage,
            })
            setIsSubmitting(false)
        }
    }

    return (
        <EmailJSProvider publicKey={process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "g5-_hb5q_TnaUc14K"}>
            <div className="container max-w-6xl mx-auto py-12 px-4 md:px-6">
                {/* Hero Section */}
                <motion.div
                    className="mb-16 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600 font-serif">
                        Get In Touch
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto mb-6"></div>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        Have questions about our project ? We would love to hear from you.
                    </p>
                </motion.div>

                {/* Contact Form and Info */}
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <Card className="border-none shadow-lg overflow-hidden">
                        <CardContent className="p-0">
                            <div className="grid grid-cols-1 md:grid-cols-2">
                                {/* Contact Form or Success Message */}
                                <div className="p-8">
                                    <h2 className="text-2xl font-bold mb-6 font-serif">Send a Message</h2>

                                    {!formSubmitted ? (
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div className="space-y-2">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    placeholder="Your Name"
                                                    required
                                                    className="w-full px-4 py-3 rounded-md bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-gray-300 focus:outline-none transition-all shadow-lg"
                                                    style={{ WebkitAppearance: "none" }}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    placeholder="Your Email"
                                                    required
                                                    className="w-full px-4 py-3 rounded-md bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-gray-300 focus:outline-none transition-all shadow-lg"
                                                    style={{ WebkitAppearance: "none" }}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <input
                                                    type="text"
                                                    name="subject"
                                                    value={formData.subject}
                                                    onChange={handleChange}
                                                    placeholder="Subject"
                                                    required
                                                    className="w-full px-4 py-3 rounded-md bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-gray-300 focus:outline-none transition-all shadow-lg"
                                                    style={{ WebkitAppearance: "none" }}
                                                />
                                            </div>

                                            <div className="space-y-2">
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Your Message"
                            rows={5}
                            required
                            className="w-full px-4 py-3 rounded-md bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-gray-300 focus:outline-none transition-all resize-none shadow-lg"
                            style={{ WebkitAppearance: "none" }}
                        />
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700
                                                hover:from-blue-600 hover:to-blue-800 text-white font-medium rounded-md
                                                transition-all transform hover:scale-[1.02] active:scale-[0.98] flex
                                                items-center justify-center gap-2 disabled:opacity-70
                                                disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <svg
                                                            className="animate-spin h-5 w-5 text-white"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <circle
                                                                className="opacity-25"
                                                                cx="12"
                                                                cy="12"
                                                                r="10"
                                                                stroke="currentColor"
                                                                strokeWidth="4"
                                                            ></circle>
                                                            <path
                                                                className="opacity-75"
                                                                fill="currentColor"
                                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                            ></path>
                                                        </svg>
                                                        Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send className="h-5 w-5" /> Send Message
                                                    </>
                                                )}
                                            </button>
                                        </form>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-12">
                                            <div className="p-4 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                                                <CheckCircle className="h-16 w-16 text-green-500" />
                                            </div>
                                            <h3 className="text-xl font-bold mb-2">Message Sent Successfully!</h3>
                                            <p className="text-muted-foreground text-center">
                                                Thank you for reaching out. We will get back to you as soon as possible.
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Contact Information */}
                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-900 p-8 flex flex-col justify-center rounded-3xl mr-10">
                                    <h2 className="text-2xl font-bold mb-8 font-serif">Contact Information</h2>

                                    <div className="space-y-8">
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 rounded-full bg-blue-200/50 dark:bg-blue-900/30">
                                                <AtSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-lg mb-1">Email</h3>
                                                <a
                                                    href="mailto:emmanuel.ouangnamou@gmail.com"
                                                    className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                                >
                                                    buzima@ashesi.edu.gh
                                                </a>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="p-3 rounded-full bg-blue-200/50 dark:bg-blue-900/30">
                                                <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-lg mb-1">Address</h3>
                                                <p className="text-muted-foreground">
                                                    1 University Avenue Berekuso
                                                    <br />
                                                    Ashesi University Campus
                                                    <br />
                                                    PMB CT 3, cantonments
                                                    <br />
                                                    Eastern region
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="p-3 rounded-full bg-blue-200/50 dark:bg-blue-900/30">
                                                <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-lg mb-1">Office Hours</h3>
                                                <p className="text-muted-foreground">
                                                    Monday - Friday
                                                    <br />
                                                    9:00 AM - 5:00 PM
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* FAQ Section */}
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <Card className="border-none shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-900">
                        <CardContent className="p-8 text-center">
                            <h2 className="text-3xl font-bold mb-6 font-serif">Have More Questions?</h2>
                            <p className="text-lg leading-relaxed font-light max-w-3xl mx-auto mb-8">
                                Check out our frequently asked questions or explore our research publications for more information.
                            </p>
                            <Link
                                href="/faq"
                                className="inline-flex items-center px-6 py-3 bg-white dark:bg-slate-700 rounded-md shadow-sm hover:shadow-md transition-all text-blue-600 dark:text-blue-400 font-medium"
                            >
                                View FAQ <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </EmailJSProvider>
    )
}