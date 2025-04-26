"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface SectionHeaderProps {
  title: string
  icon: LucideIcon
  delay?: number
}

export function SectionHeader({ title, icon: Icon, delay = 0 }: SectionHeaderProps) {
  return (
    <motion.div
      className="flex items-center gap-4 mb-6"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="p-3 rounded-full bg-blue-50 dark:bg-blue-900/20">
        <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
      </div>
      <h2 className="text-2xl font-bold font-serif">{title}</h2>
    </motion.div>
  )
}
