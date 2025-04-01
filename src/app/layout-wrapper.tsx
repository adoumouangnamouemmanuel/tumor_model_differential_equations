import type React from "react"

interface LayoutWrapperProps {
    children: React.ReactNode
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
    return <div className="pt-16">{children}</div>
}