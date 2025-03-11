import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface IProps {
    children: ReactNode
    className?: string
}
export default function ErrorMessage({ children, className }: IProps) {
    return (
        <p className={cn("text-red-600 text-xs font-medium", className)}>
            {children}
        </p>
    )
}
