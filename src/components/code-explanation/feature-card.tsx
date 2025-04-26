"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"
import Link from "next/link"

interface FeatureCardProps {
  title: string
  description: string
  icon: LucideIcon
  href: string
  delay?: number
}

export function FeatureCard({ title, description, icon: Icon, href, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
    >
      <Link href={href} className="block h-full">
        <Card className="border-none shadow-lg overflow-hidden h-full transition-all hover:shadow-xl">
          <CardContent className="p-6 flex flex-col h-full">
            <div className="p-3 rounded-full bg-blue-50 dark:bg-blue-900/20 w-fit mb-4">
              <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>

            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-muted-foreground text-sm flex-grow">{description}</p>

            <div className="mt-4 text-blue-600 dark:text-blue-400 text-sm font-medium">Explore code →</div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
