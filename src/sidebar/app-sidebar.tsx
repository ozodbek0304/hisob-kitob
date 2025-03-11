import * as React from "react"

import {
    Sidebar,
    SidebarContent,
    useSidebar,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { NavMain } from "./nav-main"
import ZipUploader from "@/custom/zip-uploader"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { setOpen, open } = useSidebar()


    return (
        <Sidebar
            collapsible="icon"
            className={cn("relative justify-between  h-full border-none")}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            style={{ zIndex: 50 }}
            {...props}
        >
            <SidebarContent className="bg-gray-100 dark:bg-[#262730] shadow-none   border-none">
                <NavMain />
                <div className="w-full border dark:border-gray-600 my-4 mb-7"></div>
                <div className={open ? "block px-2" : "hidden"}>
                    <ZipUploader />
                </div>
            </SidebarContent>

        </Sidebar>
    )
}