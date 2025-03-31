"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="border-blue-200 hover:border-blue-400 hover:bg-blue-50 dark:border-blue-800 dark:hover:border-blue-700 dark:hover:bg-blue-950 cursor-pointer"
                >
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={theme}
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 20, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute"
                        >
                            {theme === "light" ? (
                                <Sun className="h-[1.2rem] w-[1.2rem] text-blue-600" />
                            ) : (
                                <Moon className="h-[1.2rem] w-[1.2rem] text-blue-300" />
                            )}
                        </motion.div>
                    </AnimatePresence>
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 shadow-lg"
            >
                <DropdownMenuItem
                    onClick={() => setTheme("light")}
                    className="cursor-pointer text-gray-800 dark:text-gray-200 font-medium"
                >
                    <motion.div
                        whileHover={{ rotate: 20 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        className="mr-2"
                    >
                        <Sun className="h-4 w-4 text-blue-500" />
                    </motion.div>
                    <span>Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setTheme("dark")}
                    className="cursor-pointer text-gray-800 dark:text-gray-200 font-medium"
                >
                    <motion.div
                        whileHover={{ rotate: 20 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        className="mr-2"
                    >
                        <Moon className="h-4 w-4 text-blue-500" />
                    </motion.div>
                    <span>Dark</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setTheme("system")}
                    className="cursor-pointer text-gray-800 dark:text-gray-200 font-medium"
                >
                    <span>System</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}