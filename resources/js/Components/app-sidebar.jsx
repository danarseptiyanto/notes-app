import * as React from "react";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import { Bot, NotebookPen, FileSymlink, ArchiveRestore } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "https://ui.shadcn.com/avatars/shadcn.jpg",
    },
    projects: [
        {
            name: "All Notes",
            url: "/",
            icon: NotebookPen,
        },
        {
            name: "Archived Notes",
            url: "/archivednotes",
            icon: ArchiveRestore,
        },
        {
            name: "Categories",
            url: "/categories",
            icon: FileSymlink,
        },
    ],
};

export function AppSidebar({ ...props }) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenuButton
                    size="lg"
                    className="text-sidebar-accent-foreground"
                >
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                        <Bot className="size-4" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                            Danar&Co.
                        </span>
                        <span className="truncate text-xs">Notes</span>
                    </div>
                    {/* <ChevronsUpDown className="ml-auto" /> */}
                </SidebarMenuButton>
            </SidebarHeader>
            <SidebarContent>
                <NavProjects projects={data.projects} />
                <NavMain />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
