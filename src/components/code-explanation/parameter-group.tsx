"use client"

import { motion } from "framer-motion"

interface ParameterProps {
  name: string
  value: string
  description: string
}

interface ParameterGroupProps {
  title: string
  parameters: ParameterProps[]
  delay?: number
}

export function ParameterGroup({ title, parameters, delay = 0 }: ParameterGroupProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay }}>
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <ul className="space-y-2 text-sm">
        {parameters.map((param, i) => (
          <li key={i} className="flex items-center">
            <span className="font-mono w-16">{param.name} =</span>
            <span className="font-mono text-blue-600 dark:text-blue-400 w-20">{param.value}</span>
            <span className="text-muted-foreground text-xs">{param.description}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
