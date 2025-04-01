"use client"
import Image from "next/image"

export function ModelDiagram() {
    return (
        <div className="w-full flex flex-col items-center justify-center">
            <h3 className="text-xl font-bold mb-4 text-center">Model Interactions</h3>

            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
                <Image src="/images/model-diagram.png" alt="Model Interaction Diagram" fill className="object-contain" />
            </div>

            <p className="text-sm text-[hsl(var(--muted-foreground))] mt-4 text-center">
                Diagram showing the interactions between normal cells, tumor cells, immune cells, and dietary factors
            </p>
        </div>
    )
}