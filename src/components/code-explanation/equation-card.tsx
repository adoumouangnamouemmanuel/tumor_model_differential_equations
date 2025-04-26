"use client"

import { motion } from "framer-motion"

interface EquationCardProps {
  title: string
  equation: string
  delay?: number
}

export function EquationCard({ title, equation, delay = 0 }: EquationCardProps) {
  return (
    <motion.div
      className="bg-muted p-4 rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <div className="text-center py-2">$${equation}$$</div>
    </motion.div>
  )
}
