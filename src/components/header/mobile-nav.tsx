"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Menu, Home, BookOpen, Code, Video, Mail, Info, FileText, LineChart, PenTool, BarChart3, Diff, BarChart, ChevronRight, Brain, FlaskRoundIcon as Flask, ImageIcon } from 'lucide-react'

export function MobileNav() {
    const [open, setOpen] = React.useState(false)

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="cursor-pointer">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] overflow-y-auto bg-white dark:bg-slate-900">
                <motion.nav
                    className="flex flex-col gap-4 py-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Link
                        href="/"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer text-gray-800 dark:text-gray-200"
                    >
                        <Home className="h-5 w-5 text-blue-500" />
                        <span className="font-medium">Home</span>
                    </Link>

                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="differential" className="border-b border-gray-200 dark:border-slate-700">
                            <AccordionTrigger className="py-2 hover:no-underline text-gray-800 dark:text-gray-200">
                                <div className="flex items-center gap-2">
                                    <BookOpen className="h-5 w-5 text-blue-500" />
                                    <span className="font-medium">Differential</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <motion.div
                                    className="flex flex-col gap-2 pl-7 pt-2"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <MobileNavLink
                                        href="/differential/introduction"
                                        icon={<BookOpen className="h-4 w-4 text-blue-500" />}
                                        onClick={() => setOpen(false)}
                                    >
                                        Introduction
                                    </MobileNavLink>
                                    <MobileNavLink
                                        href="/differential/model-description"
                                        icon={<FileText className="h-4 w-4 text-blue-500" />}
                                        onClick={() => setOpen(false)}
                                    >
                                        Model Description
                                    </MobileNavLink>
                                    <MobileNavLink
                                        href="/differential/figure-replication"
                                        icon={<ImageIcon className="h-4 w-4 text-blue-500" />}
                                        onClick={() => setOpen(false)}
                                    >
                                        Figure Replication
                                    </MobileNavLink>
                                    <MobileNavLink
                                        href="/differential/results"
                                        icon={<LineChart className="h-4 w-4 text-blue-500" />}
                                        onClick={() => setOpen(false)}
                                    >
                                        Study Results
                                    </MobileNavLink>
                                    <MobileNavLink
                                        href="/differential/modifications"
                                        icon={<PenTool className="h-4 w-4 text-blue-500" />}
                                        onClick={() => setOpen(false)}
                                    >
                                        Model Modifications
                                    </MobileNavLink>
                                    <MobileNavLink
                                        href="/differential/theory"
                                        icon={<Brain className="h-4 w-4 text-blue-500" />}
                                        onClick={() => setOpen(false)}
                                    >
                                        Theoretical Background
                                    </MobileNavLink>
                                    <MobileNavLink
                                        href="/differential/applications"
                                        icon={<Flask className="h-4 w-4 text-blue-500" />}
                                        onClick={() => setOpen(false)}
                                    >
                                        Applications
                                    </MobileNavLink>
                                </motion.div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="applied-programming" className="border-b border-gray-200 dark:border-slate-700">
                            <AccordionTrigger className="py-2 hover:no-underline text-gray-800 dark:text-gray-200">
                                <div className="flex items-center gap-2">
                                    <Code className="h-5 w-5 text-blue-500" />
                                    <span className="font-medium">Applied Programming</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <motion.div
                                    className="flex flex-col gap-2 pl-7 pt-2"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <MobileNavLink
                                        href="/applied-programming/code-explanation"
                                        icon={<Code className="h-4 w-4 text-blue-500" />}
                                        onClick={() => setOpen(false)}
                                    >
                                        Code Explanation
                                    </MobileNavLink>
                                    <MobileNavLink
                                        href="/applied-programming/solvers"
                                        icon={<Diff className="h-4 w-4 text-blue-500" />}
                                        onClick={() => setOpen(false)}
                                    >
                                        ODE Solvers
                                    </MobileNavLink>
                                    <MobileNavLink
                                        href="/applied-programming/error-analysis"
                                        icon={<BarChart3 className="h-4 w-4 text-blue-500" />}
                                        onClick={() => setOpen(false)}
                                    >
                                        Error Analysis
                                    </MobileNavLink>
                                    <MobileNavLink
                                        href="/applied-programming/visualizations"
                                        icon={<BarChart className="h-4 w-4 text-blue-500" />}
                                        onClick={() => setOpen(false)}
                                    >
                                        Visualizations
                                    </MobileNavLink>
                                </motion.div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <Link
                        href="/promo-video"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer text-gray-800 dark:text-gray-200"
                    >
                        <Video className="h-5 w-5 text-blue-500" />
                        <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600">
              Promo Video
            </span>
                    </Link>

                    <Link
                        href="/contact"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer text-gray-800 dark:text-gray-200"
                    >
                        <Mail className="h-5 w-5 text-blue-500" />
                        <span className="font-medium">Contact</span>
                    </Link>

                    <Link
                        href="/about"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer text-gray-800 dark:text-gray-200"
                    >
                        <Info className="h-5 w-5 text-blue-500" />
                        <span className="font-medium">About</span>
                    </Link>
                </motion.nav>
            </SheetContent>
        </Sheet>
    )
}

function MobileNavLink({
                           href,
                           children,
                           icon,
                           onClick,
                       }: {
    href: string
    children: React.ReactNode
    icon?: React.ReactNode
    onClick?: () => void
}) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="group flex items-center gap-2 rounded-md px-2 py-1 hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer text-gray-800 dark:text-gray-200"
        >
            <div className="flex items-center">
                {icon || <ChevronRight className="h-3 w-3 text-gray-500 dark:text-gray-400" />}
            </div>
            <span className="text-sm">{children}</span>
        </Link>
    )
}