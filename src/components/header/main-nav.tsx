"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { Home, BookOpen, Code, Video, Mail, Info, FileText, LineChart, PenTool, BarChart3, Diff, BarChart, Brain, ImageIcon } from 'lucide-react'

export function MainNav() {
    return (
        <NavigationMenu className="border-none">
            <NavigationMenuList className="border-none">
                <NavigationMenuItem className="border-none shadow-sm rounded-full">
                    <Link href="/" legacyBehavior passHref>
                        <NavigationMenuLink
                            className={cn(
                                navigationMenuTriggerStyle(),
                                "cursor-pointer font-medium text-gray-800 dark:text-gray-200",
                            )}
                        >
                            <div className="flex items-center gap-2">
                                <motion.div
                                    whileHover={{ rotate: 360, scale: 1.2 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <Home className="h-4 w-4" />
                                </motion.div>
                                <span>Home</span>
                            </div>
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>

                <NavigationMenuItem className="border-none shadow-sm rounded-full">
                    <NavigationMenuTrigger className="cursor-pointer font-medium">
                        <div className="flex items-center gap-2">
                            <motion.div
                                whileHover={{ rotate: 360, scale: 1.2 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <BookOpen className="h-4 w-4" />
                            </motion.div>
                            <span>Differential</span>
                        </div>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <motion.div
                            className="w-[550px] p-4 bg-white dark:bg-slate-900 rounded-md shadow-lg"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ type: "spring", stiffness: 400, damping: 40 }}
                        >
                            <div className="grid grid-cols-2 gap-4">
                                {/* Row 1 */}
                                <div className="col-span-2">
                                    <NavigationMenuLink asChild>
                                        <motion.a
                                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-500 to-blue-700 p-6 no-underline outline-none cursor-pointer overflow-hidden relative"
                                            href="/differential/introduction"
                                            whileHover={{ scale: 1.02 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                        >
                                            <motion.div
                                                className="absolute inset-0 bg-blue-400 opacity-20"
                                                initial={{ x: "-100%" }}
                                                whileHover={{ x: "100%" }}
                                                transition={{ duration: 1.5 }}
                                            />
                                            <div className="mt-4 mb-2 text-lg font-medium text-white">Differential Equations</div>
                                            <p className="text-sm leading-tight text-white/90">
                                                Explore the mathematical models and equations used in our research on tumor cells and immune
                                                system competition.
                                            </p>
                                        </motion.a>
                                    </NavigationMenuLink>
                                </div>

                                {/* Matrix Layout - 2x3 grid */}
                                <div className="col-span-2 grid grid-cols-3 grid-rows-2 gap-2 border-none">
                                    <MatrixItem
                                        href="/differential/introduction"
                                        title="Introduction"
                                        icon={<BookOpen className="h-4 w-4 text-blue-500" />}
                                    />
                                    <MatrixItem
                                        href="/differential/model-description"
                                        title="Model Description"
                                        icon={<FileText className="h-4 w-4 text-blue-500" />}
                                    />
                                    <MatrixItem
                                        href="/differential/figure-replication"
                                        title="Figure Replication"
                                        icon={<ImageIcon className="h-4 w-4 text-blue-500" />}
                                    />
                                    <MatrixItem
                                        href="/differential/results"
                                        title="Study Results"
                                        icon={<LineChart className="h-4 w-4 text-blue-500" />}
                                    />
                                    <MatrixItem
                                        href="/differential/modifications"
                                        title="Model Modifications"
                                        icon={<PenTool className="h-4 w-4 text-blue-500" />}
                                    />
                                    <MatrixItem
                                        href="/differential/theory"
                                        title="Modified Results"
                                        icon={<Brain className="h-4 w-4 text-blue-500" />}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem className="border-none shadow-sm rounded-full">
                    <NavigationMenuTrigger className="cursor-pointer font-medium border-none">
                        <div className="flex items-center gap-2">
                            <motion.div
                                whileHover={{ rotate: 360, scale: 1.2 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <Code className="h-4 w-4" />
                            </motion.div>
                            <span>Applied Programming</span>
                        </div>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="border-none">
                        <motion.div
                            className="w-[550px] p-4 bg-white dark:bg-slate-900 rounded-md shadow-lg"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ type: "spring", stiffness: 400, damping: 40 }}
                        >
                            <div className="grid grid-cols-1 gap-4">
                                {/* Row 1 */}
                                <div>
                                    <NavigationMenuLink asChild>
                                        <motion.a
                                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-700 to-blue-900 p-6 no-underline outline-none cursor-pointer overflow-hidden relative"
                                            href="/applied-programming/code-explanation"
                                            whileHover={{ scale: 1.02 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                        >
                                            <motion.div
                                                className="absolute inset-0 bg-blue-400 opacity-20"
                                                initial={{ x: "-100%" }}
                                                whileHover={{ x: "100%" }}
                                                transition={{ duration: 1.5 }}
                                            />
                                            <div className="mt-4 mb-2 text-lg font-medium text-white">Code Explanation</div>
                                            <p className="text-sm leading-tight text-white/90">
                                                Numerical methods and code implementation for solving and analyzing our ODE model.
                                            </p>
                                        </motion.a>
                                    </NavigationMenuLink>
                                </div>

                                {/* Matrix Layout - 1x3 grid */}
                                <div className="grid grid-cols-3 gap-2 border-none">
                                    <MatrixItem
                                        href="/applied-programming/solvers"
                                        title="ODE Solvers"
                                        icon={<Diff className="h-4 w-4 text-blue-500" />}
                                    />
                                    <MatrixItem
                                        href="/applied-programming/error-analysis"
                                        title="Error Analysis"
                                        icon={<BarChart3 className="h-4 w-4 text-blue-500" />}
                                    />
                                    <MatrixItem
                                        href="/applied-programming/visualizations"
                                        title="Visualizations"
                                        icon={<BarChart className="h-4 w-4 text-blue-500" />}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem className="border-none shadow-sm rounded-full">
                    <Link href="/promo-video" legacyBehavior passHref>
                        <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "cursor-pointer font-medium")}>
                            <div className="flex items-center gap-2">
                                <motion.div
                                    whileHover={{ rotate: 360, scale: 1.2 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <Video className="h-4 w-4" />
                                </motion.div>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600">
                  Promo Video
                </span>
                            </div>
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>

                <NavigationMenuItem className="border-none shadow-sm rounded-full">
                    <Link href="/contact" legacyBehavior passHref>
                        <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "cursor-pointer font-medium")}>
                            <div className="flex items-center gap-2">
                                <motion.div
                                    whileHover={{ rotate: 360, scale: 1.2 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <Mail className="h-4 w-4" />
                                </motion.div>
                                <span>Contact</span>
                            </div>
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>

                <NavigationMenuItem className="border-none shadow-sm rounded-full">
                    <Link href="/about" legacyBehavior passHref>
                        <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "cursor-pointer font-medium")}>
                            <div className="flex items-center gap-2">
                                <motion.div
                                    whileHover={{ rotate: 360, scale: 1.2 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <Info className="h-4 w-4" />
                                </motion.div>
                                <span>About</span>
                            </div>
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

function MatrixItem({
                        href,
                        title,
                        icon,
                    }: {
    href: string
    title: string
    icon: React.ReactNode
}) {
    return (
        <NavigationMenuLink asChild className="border-none">
            <motion.a
                href={href}
                className="block select-none rounded-md p-3 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer text-gray-800 dark:text-gray-200 transition-colors"
                whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(243, 244, 246, 0.1)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
                <div className="flex items-center gap-2 text-sm font-medium leading-none mb-1">
                    <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                        {icon}
                    </motion.div>
                    {title}
                </div>
            </motion.a>
        </NavigationMenuLink>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a"> & { icon?: React.ReactNode }
>(({ className, title, children, icon, href, ...props }, ref) => {
    return (
        <NavigationMenuLink asChild>
            <a
                ref={ref}
                href={href}
                className={cn(
                    "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 dark:hover:bg-slate-800 focus:bg-accent focus:text-accent-foreground cursor-pointer text-gray-800 dark:text-gray-200",
                    className,
                )}
                {...props}
            >
                <div className="flex items-center gap-2 text-sm font-medium leading-none">
                    {icon} {title}
                </div>
                <p className="line-clamp-2 text-xs leading-snug text-gray-600 dark:text-gray-400">{children}</p>
            </a>
        </NavigationMenuLink>
    )
})

ListItem.displayName = "ListItem"