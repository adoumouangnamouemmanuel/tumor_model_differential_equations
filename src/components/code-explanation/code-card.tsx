"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"
import { CodeBlock } from "@/components/code-block"
import { SectionHeader } from "./section-header"

interface CodeCardProps {
  title: string
  icon: LucideIcon
  code: string
  description?: string
  delay?: number
  children?: React.ReactNode
}

export function CodeCard({ title, icon, code, description, delay = 0, children }: CodeCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay }}>
      <Card className="border-none shadow-lg overflow-hidden">
        <CardContent className="p-6">
          <SectionHeader title={title} icon={icon} />

          <CodeBlock code={code} language="matlab" />

          {description && <p className="mt-4 text-sm text-muted-foreground">{description}</p>}

          {children && <div className="mt-6">{children}</div>}
        </CardContent>
      </Card>
    </motion.div>
  )
}
