import "@/app/globals.css"
import { SiteHeader } from "@/components/header/site-header"
import Script from "next/script"

import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
    title: "MATH221 & CE122: Differential Equations & Numerical Methods",
    description: "Study of the application of ODE models and numerical methods in investigating a real-world problem",
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
                <SiteHeader />
                <main className="pt-32 pb-16 px-6 md:px-8 lg:px-12">{children}</main>
            </div>
        </ThemeProvider>

        {/* MathJax Script - moved to bottom of body to avoid hydration issues */}
        <Script id="mathjax-config" strategy="lazyOnload">
            {`
            window.MathJax = {
              tex: {
                inlineMath: [['\\\$$', '\\\$$']],
                displayMath: [['\\\\[', '\\\\]']]
              },
              svg: {
                fontCache: 'global'
              },
              startup: {
                pageReady: () => {
                  return MathJax.startup.defaultPageReady().then(() => {
                    // Store the original typeset function
                    const originalTypeset = MathJax.typeset;
                    
                    // Override the typeset function to handle errors gracefully
                    MathJax.typeset = (elements) => {
                      try {
                        return originalTypeset.call(MathJax, elements);
                      } catch (error) {
                        console.error('MathJax typeset error:', error);
                        // Try again with a delay
                        setTimeout(() => {
                          try {
                            originalTypeset.call(MathJax, elements);
                          } catch (e) {
                            console.error('MathJax retry failed:', e);
                          }
                        }, 200);
                      }
                    };
                  });
                }
              }
            };
          `}
        </Script>
        <Script
            id="mathjax-script"
            src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
            strategy="lazyOnload"
        />
        </body>
        </html>
    )
}
