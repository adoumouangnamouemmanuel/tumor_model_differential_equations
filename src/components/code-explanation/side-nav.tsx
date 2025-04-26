"use client"

import type React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { BarChart3, FileVideo, FunctionSquare, LineChart, Settings } from 'lucide-react'
import Link from "next/link"

interface NavItem {
    id: string
    title: string
    icon: React.ReactNode
}

export function SideNav() {
    const [activeSection, setActiveSection] = useState("model-setup")

    const navItems: NavItem[] = [
        { id: "model-setup", title: "Model Setup", icon: <Settings className="h-4 w-4" /> },
        { id: "figure-reproduction", title: "Figure Reproduction", icon: <LineChart className="h-4 w-4" /> },
        { id: "animation-code", title: "Animation Code", icon: <FileVideo className="h-4 w-4" /> },
        { id: "error-analysis", title: "Error Analysis", icon: <BarChart3 className="h-4 w-4" /> },
        { id: "solver-comparison", title: "Solver Comparison", icon: <FunctionSquare className="h-4 w-4" /> },
    ]

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id)
                    }
                })
            },
            { threshold: 0.2 },
        )

        navItems.forEach((item) => {
            const element = document.getElementById(item.id)
            if (element) observer.observe(element)
        })

        return () => {
            navItems.forEach((item) => {
                const element = document.getElementById(item.id)
                if (element) observer.unobserve(element)
            })
        }
    }, [])

    return (
        <motion.div
            className="fixed top-24 h-fit"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <nav className="space-y-1">
                {navItems.map((item) => (
                    <Link
                        key={item.id}
                        href={`#${item.id}`}
                        className={cn(
                            "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                            activeSection === item.id
                                ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                                : "hover:bg-muted",
                        )}
                        onClick={(e) => {
                            e.preventDefault()
                            document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })
                        }}
                    >
                        {item.icon}
                        {item.title}
                    </Link>
                ))}
            </nav>
        </motion.div>
    )
}