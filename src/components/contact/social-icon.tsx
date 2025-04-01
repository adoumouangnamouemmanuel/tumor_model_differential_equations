"use client"

import { motion } from "framer-motion"
import { Twitter, Linkedin, Github } from "lucide-react"

interface SocialIconProps {
    platform: "twitter" | "linkedin" | "github"
    username: string
}

export function SocialIcon({ platform, username }: SocialIconProps) {
    const platformConfig = {
        twitter: {
            icon: <Twitter className="h-5 w-5" />,
            color:
                "bg-blue-100 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/50",
            url: `https://twitter.com/${username}`,
        },
        linkedin: {
            icon: <Linkedin className="h-5 w-5" />,
            color:
                "bg-blue-100 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/50",
            url: `https://linkedin.com/in/${username}`,
        },
        github: {
            icon: <Github className="h-5 w-5" />,
            color:
                "bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/50",
            url: `https://github.com/${username}`,
        },
    }

    return (
        <motion.a
            href={platformConfig[platform].url}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-full ${platformConfig[platform].color} transition-colors`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`${platform} profile`}
        >
            {platformConfig[platform].icon}
        </motion.a>
    )
}