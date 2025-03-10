import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/sidebar/app-sidebar"
import { createFileRoute, Outlet } from "@tanstack/react-router"
import { Menu } from "lucide-react"

export const Route = createFileRoute("/_main")({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <SidebarProvider defaultOpen={false} open>
            <AppSidebar className="shadow" />
            <SidebarInset className="bg-primary-foreground overflow-auto">
                <SidebarTrigger
                    variant={"default"}
                    className="md:hidden fixed bottom-16 right-5 rounded-full w-10 h-9 z-50"
                >
                    <Menu className="text-white" />
                </SidebarTrigger>

                <div className="relative max-h-screen overflow-y-auto">
                    <Outlet />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
