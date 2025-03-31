import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/header/site-header"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
        <head>
            <title>MATH221 & CE122: Differential Equations & Numerical Methods</title>
            <meta
                name="description"
                content="Study of the application of ODE models and numerical methods in investigating tumor cells and immune system competition"
            />
        </head>
        <body className={`${inter.className} overflow-x-hidden dark:text-white`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <div className="relative flex min-h-screen flex-col overflow-hidden">
                <SiteHeader />
                <div className="flex-1">{children}</div>
            </div>
        </ThemeProvider>
        </body>
        </html>
    )
}