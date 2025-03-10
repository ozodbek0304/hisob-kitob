import {
    LayoutDashboard,
    Plane,
} from "lucide-react"

import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { Link } from "@tanstack/react-router"

export function NavMain() {
    const { setOpenMobile } = useSidebar()

    const links = [
        {
            to: "/",
            icon: <LayoutDashboard />,
            title: "Qarzdorlikni Hisoblash",
        },
        {
            to: "/data-create",
            icon: <Plane />,
            title: "Malumotlarni Kiritish",
        },
    ]

    return (
        <SidebarGroup>
            <SidebarMenu>
                <Link
                    to="/"
                    className="rounded-lg mb-8"
                    onClick={() => {
                        setOpenMobile(false)
                    }}
                >
                    <SidebarMenuItem>
                        <SidebarMenuButton className="text-3xl text-primary font-extrabold gap-0">
                           H <span>isob Kitob</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </Link>
                {links.map(
                    ({ title, ...item }) =>
                    (
                        <Link
                            {...item}
                            key={item.to}
                            activeProps={{
                                className:
                                    "[&_button]:bg-primary hover:[&_button]:bg-primary hover:[&_button]:text-primary-foreground [&_button]:text-white text-primary-foreground",
                            }}
                            className="rounded-lg"
                            onClick={() => {
                                setOpenMobile(false)
                            }}
                        >
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    tooltip={title}
                                    className="text-black/60"
                                >
                                    {item.icon}
                                    <span>{title}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </Link>
                    ),
                )}
            </SidebarMenu>
        </SidebarGroup>
    )
}