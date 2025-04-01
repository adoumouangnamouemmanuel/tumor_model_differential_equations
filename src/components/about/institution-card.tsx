"use client"

import { motion } from "framer-motion"

interface InstitutionCardProps {
    name: string
    department: string
    description: string
    image: string
}

export function InstitutionCard({ name, department, description, image }: InstitutionCardProps) {
    return (
        <motion.div
            className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-slate-700"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{
                y: -5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
        >
            <div className="relative h-40 overflow-hidden">
                <motion.img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-xl font-bold">{name}</h3>
                    <p className="text-sm text-white/80">{department}</p>
                </div>
            </div>

            <div className="p-6">
                <p className="text-gray-700 dark:text-gray-300">{description}</p>
            </div>
        </motion.div>
    )
}