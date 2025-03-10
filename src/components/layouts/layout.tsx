import { cn } from "@/lib/utils"
import { Header } from "../shared/header";

type Props = { children: React.ReactNode; className?: string }

export default function Layout({ children, className }: Props) {
    return <main className="">
        <Header />
        <div className={cn(`p-4 `, className)}>
            {children}
        </div>
    </main>
}
