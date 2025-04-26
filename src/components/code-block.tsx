"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

interface CodeBlockProps {
    code: string
    language: string
}

export function CodeBlock({ code }: CodeBlockProps) {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="relative">
            <button
                onClick={handleCopy}
                className="absolute top-2 right-2 p-2 rounded-md bg-muted/80 hover:bg-muted transition-colors z-10"
                aria-label="Copy code"
            >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </button>
            <pre className="p-4 rounded-md bg-black text-white overflow-x-auto font-mono text-sm">
        <code>{code}</code>
      </pre>
        </div>
    )
}