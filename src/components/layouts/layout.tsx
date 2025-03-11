import { cn } from "@/lib/utils"
import { Header } from "../shared/header";
import { useEffect } from "react";
import { TOKEN } from "@/lib/localstorage-keys";

type Props = { children: React.ReactNode; className?: string }

export default function Layout({ children, className }: Props) {

    useEffect(() => {
        const token = localStorage.getItem(TOKEN);
        if (!token) {
            window.location.assign("/login");
        }
    }, [])

    return <main className="">
        <Header />
        <div className={cn(`p-4 `, className)}>
            {children}
        </div>
    </main>
}
