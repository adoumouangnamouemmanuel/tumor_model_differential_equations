"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }

    return (
        <motion.div
            className="absolute top-8 right-8 z-50 md:right-12"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 1.2,
            }}
        >
            <motion.button
                onClick={toggleTheme}
                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-blue-200/30 dark:border-white/20 text-blue-600 dark:text-white shadow-lg"
                whileHover={{
                    scale: 1.1,
                    rotate: 5,
                    boxShadow: "0 0 15px rgba(120, 180, 255, 0.7)",
                }}
                whileTap={{ scale: 0.9 }}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={theme}
                        initial={{ rotate: -30, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 30, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {theme === "dark" ? (
                            <Sun className="h-6 w-6 text-yellow-300" />
                        ) : (
                            <Moon className="h-6 w-6 text-blue-600" />
                        )}
                    </motion.div>
                </AnimatePresence>
            </motion.button>
        </motion.div>
    )
}