import { cn } from "@/lib/utils"

interface CodeBlockProps {
    code: string
    language?: string
    className?: string
}

export function CodeBlock({ code, className }: CodeBlockProps) {
    return (
        <div className={cn("bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto", className)}>
            <pre>{code}</pre>
        </div>
    )
}