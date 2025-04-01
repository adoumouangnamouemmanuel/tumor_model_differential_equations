// "use client"
//
// import type React from "react"
//
// import { useState } from "react"
// import { motion, useScroll, useTransform } from "framer-motion"
// import { Mail, Phone, Send, MessageSquare, ChevronDown, CheckCircle2, AlertCircle } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Label } from "@/components/ui/label"
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { FaqItem } from "@/components/contact/faq-item"
// import { SocialIcon } from "@/components/contact/social-icon"
//
// export default function ContactPage() {
//     const { scrollYProgress } = useScroll()
//     const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])
//     const y = useTransform(scrollYProgress, [0, 0.1], [0, -50])
//
//     const [formState, setFormState] = useState({
//         name: "",
//         email: "",
//         subject: "",
//         message: "",
//     })
//
//     const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
//     const [errors, setErrors] = useState<{ [key: string]: string }>({})
//
//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         const { name, value } = e.target
//         setFormState((prev) => ({ ...prev, [name]: value }))
//
//         // Clear error when user starts typing
//         if (errors[name]) {
//             setErrors((prev) => {
//                 const newErrors = { ...prev }
//                 delete newErrors[name]
//                 return newErrors
//             })
//         }
//     }
//
//     const validateForm = () => {
//         const newErrors: { [key: string]: string } = {}
//
//         if (!formState.name.trim()) {
//             newErrors.name = "Name is required"
//         }
//
//         if (!formState.email.trim()) {
//             newErrors.email = "Email is required"
//         } else if (!/^\S+@\S+\.\S+$/.test(formState.email)) {
//             newErrors.email = "Email is invalid"
//         }
//
//         if (!formState.subject.trim()) {
//             newErrors.subject = "Subject is required"
//         }
//
//         if (!formState.message.trim()) {
//             newErrors.message = "Message is required"
//         }
//
//         setErrors(newErrors)
//         return Object.keys(newErrors).length === 0
//     }
//
//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault()
//
//         if (!validateForm()) {
//             return
//         }
//
//         setFormStatus("submitting")
//
//         // Simulate form submission
//         setTimeout(() => {
//             setFormStatus("success")
//             setFormState({
//                 name: "",
//                 email: "",
//                 subject: "",
//                 message: "",
//             })
//
//             // Reset form status after 5 seconds
//             setTimeout(() => {
//                 setFormStatus("idle")
//             }, 5000)
//         }, 1500)
//     }
//
//     return (
//         <div className="relative">
//             {/* Hero Section */}
//             <motion.div className="relative h-[60vh] flex items-center justify-center overflow-hidden" style={{ opacity, y }}>
//                 <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800 z-0" />
//
//                 {/* Animated background elements */}
//                 <div className="absolute inset-0 z-10 overflow-hidden">
//                     <motion.div
//                         className="absolute top-[10%] left-[15%] w-[300px] h-[300px] rounded-full bg-blue-100 dark:bg-blue-900/20 opacity-30 blur-xl"
//                         animate={{
//                             scale: [1, 1.1, 1],
//                             rotate: [0, 10, 0],
//                         }}
//                         transition={{
//                             duration: 8,
//                             repeat: Number.POSITIVE_INFINITY,
//                             repeatType: "reverse",
//                         }}
//                     />
//                     <motion.div
//                         className="absolute bottom-[20%] right-[10%] w-[250px] h-[250px] rounded-full bg-purple-100 dark:bg-purple-900/20 opacity-30 blur-xl"
//                         animate={{
//                             scale: [1.1, 1, 1.1],
//                             rotate: [0, -10, 0],
//                         }}
//                         transition={{
//                             duration: 7,
//                             repeat: Number.POSITIVE_INFINITY,
//                             repeatType: "reverse",
//                         }}
//                     />
//                 </div>
//
//                 {/* Content */}
//                 <div className="container mx-auto px-4 relative z-20 text-center">
//                     <motion.div
//                         className="flex justify-center mb-6"
//                         initial={{ scale: 0 }}
//                         animate={{ scale: 1 }}
//                         transition={{
//                             type: "spring",
//                             stiffness: 260,
//                             damping: 20,
//                             delay: 0.2,
//                         }}
//                     >
//                         <div className="relative">
//                             <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 dark:from-blue-500 dark:to-purple-500 opacity-30 blur-md"></div>
//                             <div className="relative bg-white dark:bg-slate-800 p-4 rounded-full shadow-lg">
//                                 <Mail className="h-12 w-12 text-blue-600 dark:text-blue-400" />
//                             </div>
//                         </div>
//                     </motion.div>
//
//                     <motion.h1
//                         className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white"
//                         initial={{ opacity: 0, y: -20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.8, delay: 0.4 }}
//                     >
//                         Get in Touch
//                     </motion.h1>
//
//                     <motion.p
//                         className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.8, delay: 0.6 }}
//                     >
//                         We'd love to hear from you
//                     </motion.p>
//
//                     {/* Scroll indicator */}
//                     <motion.div
//                         className="absolute bottom-10 left-0 right-0 flex justify-center"
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ delay: 1, duration: 1 }}
//                     >
//                         <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
//                             <ChevronDown className="h-8 w-8 text-blue-500 dark:text-blue-400" />
//                         </motion.div>
//                     </motion.div>
//                 </div>
//             </motion.div>
//
//             {/* Main Content */}
//             <div className="bg-gradient-to-b from-white to-blue-50 dark:from-slate-800 dark:to-slate-900 pt-16 pb-24">
//                 <div className="container mx-auto px-4">
//                     {/* Contact Form Section */}
//                     <motion.section
//                         className="max-w-6xl mx-auto mb-20"
//                         initial={{ opacity: 0, y: 20 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.8 }}
//                         viewport={{ once: true, margin: "-100px" }}
//                     >
//                         <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
//                             {/* Contact Info */}
//                             <div className="lg:col-span-2">
//                                 <div className="sticky top-24">
//                                     <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Contact Us</h2>
//                                     <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
//                                         Have questions about our research? Want to collaborate with our team? We're here to help and would
//                                         love to hear from you.
//                                     </p>
//
//                                     <div className="space-y-6">
//                                         <div className="flex items-start space-x-4">
//                                             <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full text-blue-600 dark:text-blue-400">
//                                                 <Mail className="h-6 w-6" />
//                                             </div>
//                                             <div>
//                                                 <h3 className="font-medium text-gray-900 dark:text-white">Email</h3>
//                                                 <p className="text-gray-700 dark:text-gray-300">research@example.edu</p>
//                                                 <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//                                                     We'll respond within 24-48 hours
//                                                 </p>
//                                             </div>
//                                         </div>
//
//                                         <div className="flex items-start space-x-4">
//                                             <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full text-purple-600 dark:text-purple-400">
//                                                 <Phone className="h-6 w-6" />
//                                             </div>
//                                             <div>
//                                                 <h3 className="font-medium text-gray-900 dark:text-white">Phone</h3>
//                                                 <p className="text-gray-700 dark:text-gray-300">+1 (555) 123-4567</p>
//                                                 <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//                                                     Mon-Fri, 9:00 AM - 5:00 PM (EST)
//                                                 </p>
//                                             </div>
//                                         </div>
//
//                                         <div className="flex items-start space-x-4">
//                                             <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full text-green-600 dark:text-green-400">
//                                                 <MessageSquare className="h-6 w-6" />
//                                             </div>
//                                             <div>
//                                                 <h3 className="font-medium text-gray-900 dark:text-white">Social Media</h3>
//                                                 <div className="flex space-x-3 mt-2">
//                                                     <SocialIcon platform="twitter" username="mathresearch" />
//                                                     <SocialIcon platform="linkedin" username="math-research-team" />
//                                                     <SocialIcon platform="github" username="math-research" />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//
//                             {/* Contact Form */}
//                             <div className="lg:col-span-3">
//                                 <Card className="overflow-hidden border-0 shadow-lg">
//                                     <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-1">
//                                         <div className="bg-white dark:bg-slate-800 p-6 md:p-8">
//                                             <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Send us a Message</h3>
//
//                                             {formStatus === "success" && (
//                                                 <Alert className="mb-6 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
//                                                     <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
//                                                     <AlertTitle>Success!</AlertTitle>
//                                                     <AlertDescription>
//                                                         Your message has been sent successfully. We'll get back to you soon.
//                                                     </AlertDescription>
//                                                 </Alert>
//                                             )}
//
//                                             {formStatus === "error" && (
//                                                 <Alert className="mb-6 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
//                                                     <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
//                                                     <AlertTitle>Error</AlertTitle>
//                                                     <AlertDescription>
//                                                         There was an error sending your message. Please try again.
//                                                     </AlertDescription>
//                                                 </Alert>
//                                             )}
//
//                                             <form onSubmit={handleSubmit} className="space-y-6">
//                                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                                     <div className="space-y-2">
//                                                         <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
//                                                             Name
//                                                         </Label>
//                                                         <Input
//                                                             id="name"
//                                                             name="name"
//                                                             placeholder="Your name"
//                                                             value={formState.name}
//                                                             onChange={handleChange}
//                                                             className={`bg-gray-50 dark:bg-slate-700/50 border-gray-200 dark:border-slate-600 ${errors.name ? "border-red-500 dark:border-red-500" : ""}`}
//                                                             disabled={formStatus === "submitting"}
//                                                         />
//                                                         {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
//                                                     </div>
//
//                                                     <div className="space-y-2">
//                                                         <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
//                                                             Email
//                                                         </Label>
//                                                         <Input
//                                                             id="email"
//                                                             name="email"
//                                                             type="email"
//                                                             placeholder="Your email address"
//                                                             value={formState.email}
//                                                             onChange={handleChange}
//                                                             className={`bg-gray-50 dark:bg-slate-700/50 border-gray-200 dark:border-slate-600 ${errors.email ? "border-red-500 dark:border-red-500" : ""}`}
//                                                             disabled={formStatus === "submitting"}
//                                                         />
//                                                         {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
//                                                     </div>
//                                                 </div>
//
//                                                 <div className="space-y-2">
//                                                     <Label htmlFor="subject" className="text-gray-700 dark:text-gray-300">
//                                                         Subject
//                                                     </Label>
//                                                     <Input
//                                                         id="subject"
//                                                         name="subject"
//                                                         placeholder="Message subject"
//                                                         value={formState.subject}
//                                                         onChange={handleChange}
//                                                         className={`bg-gray-50 dark:bg-slate-700/50 border-gray-200 dark:border-slate-600 ${errors.subject ? "border-red-500 dark:border-red-500" : ""}`}
//                                                         disabled={formStatus === "submitting"}
//                                                     />
//                                                     {errors.subject && <p className="text-sm text-red-500">{errors.subject}</p>}
//                                                 </div>
//
//                                                 <div className="space-y-2">
//                                                     <Label htmlFor="message" className="text-gray-700 dark:text-gray-300">
//                                                         Message
//                                                     </Label>
//                                                     <Textarea
//                                                         id="message"
//                                                         name="message"
//                                                         placeholder="Your message"
//                                                         rows={6}
//                                                         value={formState.message}
//                                                         onChange={handleChange}
//                                                         className={`bg-gray-50 dark:bg-slate-700/50 border-gray-200 dark:border-slate-600 resize-none ${errors.message ? "border-red-500 dark:border-red-500" : ""}`}
//                                                         disabled={formStatus === "submitting"}
//                                                     />
//                                                     {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
//                                                 </div>
//
//                                                 <div>
//                                                     <Button
//                                                         type="submit"
//                                                         className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-6 text-lg"
//                                                         disabled={formStatus === "submitting"}
//                                                     >
//                                                         {formStatus === "submitting" ? (
//                                                             <span className="flex items-center gap-2">
//                                 <motion.div
//                                     animate={{ rotate: 360 }}
//                                     transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//                                 >
//                                   <Send className="h-5 w-5" />
//                                 </motion.div>
//                                 Sending...
//                               </span>
//                                                         ) : (
//                                                             <span className="flex items-center gap-2">
//                                 <Send className="h-5 w-5" />
//                                 Send Message
//                               </span>
//                                                         )}
//                                                     </Button>
//                                                 </div>
//                                             </form>
//                                         </div>
//                                     </div>
//                                 </Card>
//                             </div>
//                         </div>
//                     </motion.section>
//
//                     {/* FAQ Section */}
//                     <motion.section
//                         className="max-w-4xl mx-auto"
//                         initial={{ opacity: 0, y: 20 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.8 }}
//                         viewport={{ once: true, margin: "-100px" }}
//                     >
//                         <div className="text-center mb-12">
//                             <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Frequently Asked Questions</h2>
//                             <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
//                                 Find answers to common questions about our research and collaboration opportunities
//                             </p>
//                         </div>
//
//                         <Tabs defaultValue="research" className="w-full">
//                             <TabsList className="grid w-full grid-cols-3 mb-8">
//                                 <TabsTrigger value="research" className="cursor-pointer">
//                                     Research
//                                 </TabsTrigger>
//                                 <TabsTrigger value="collaboration" className="cursor-pointer">
//                                     Collaboration
//                                 </TabsTrigger>
//                                 <TabsTrigger value="general" className="cursor-pointer">
//                                     General
//                                 </TabsTrigger>
//                             </TabsList>
//
//                             <TabsContent value="research" className="space-y-4">
//                                 <FaqItem
//                                     question="What is the NTIUNHDM model?"
//                                     answer="The Nonlinear Tumor-Immune Unstable Hybrid Dynamical Model (NTIUNHDM) is a mathematical framework we developed to study the interactions between normal cells, tumor cells, immune response, and dietary factors. It uses differential equations to simulate these complex biological relationships."
//                                 />
//
//                                 <FaqItem
//                                     question="How does your research apply to real-world cancer treatment?"
//                                     answer="Our research provides insights into how the immune system interacts with cancer cells and how dietary factors influence this relationship. These insights can inform preventive strategies, lifestyle recommendations, and potentially complement existing cancer treatments by optimizing immune function."
//                                 />
//
//                                 <FaqItem
//                                     question="What data sources do you use for your models?"
//                                     answer="We use a combination of published experimental data from cell culture studies, animal models, and human clinical trials. We also collaborate with biological research labs to generate specific data needed for model validation and refinement."
//                                 />
//                             </TabsContent>
//
//                             <TabsContent value="collaboration" className="space-y-4">
//                                 <FaqItem
//                                     question="How can I collaborate with your research team?"
//                                     answer="We welcome collaborations with researchers, institutions, and industry partners. Please contact us via email with a brief description of your research interests and potential collaboration opportunities. We're particularly interested in interdisciplinary projects that combine mathematical modeling with experimental biology."
//                                 />
//
//                                 <FaqItem
//                                     question="Are there opportunities for students to join the research team?"
//                                     answer="Yes, we regularly accept undergraduate and graduate students for research projects, internships, and thesis work. Please send your CV and a statement of research interests to our email address. We look for students with backgrounds in mathematics, computational biology, or related fields."
//                                 />
//
//                                 <FaqItem
//                                     question="Do you offer consulting services for industry partners?"
//                                     answer="Yes, our team provides consulting services in mathematical modeling, data analysis, and computational biology. We have experience working with pharmaceutical companies, biotech startups, and healthcare organizations. Please contact us to discuss your specific needs and how we can help."
//                                 />
//                             </TabsContent>
//
//                             <TabsContent value="general" className="space-y-4">
//                                 <FaqItem
//                                     question="Can I access your research data and code?"
//                                     answer="Most of our research data and code are available through our GitHub repository. For specific datasets or code not publicly available, please contact us directly with your request and intended use. We're committed to open science and reproducible research."
//                                 />
//
//                                 <FaqItem
//                                     question="How can I stay updated on your research findings?"
//                                     answer="You can subscribe to our newsletter, follow us on social media, or check our website regularly for updates on publications, presentations, and research developments. We also present our work at major conferences in mathematical biology and cancer research."
//                                 />
//
//                                 <FaqItem
//                                     question="Do you provide educational resources about mathematical modeling?"
//                                     answer="Yes, we offer tutorials, workshops, and educational materials on mathematical modeling in biology. These resources are designed for various levels, from undergraduate students to experienced researchers looking to incorporate mathematical approaches into their work."
//                                 />
//                             </TabsContent>
//                         </Tabs>
//                     </motion.section>
//                 </div>
//             </div>
//         </div>
//     )
// }

'use client';

export default function ContactPage() {
    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-xl mt-10 text-center">
            <h2 className="text-2xl font-bold mb-4">Contact Page</h2>
            <p className="text-gray-500">Nothing is in here yet.</p>
        </div>
    );
}