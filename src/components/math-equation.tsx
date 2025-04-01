interface MathEquationProps {
    title: string
    equation: string
}

export function MathEquation({ title, equation }: MathEquationProps) {
    return (
        <div>
            <p className="mb-2">{title}</p>
            <div className="p-2 bg-background rounded-md text-center">
                $${equation}$$
            </div>
        </div>
    )
}