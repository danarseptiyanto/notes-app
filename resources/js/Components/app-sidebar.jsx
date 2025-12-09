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
import { Link } from "@inertiajs/react";

// This is sample data.
const data = {
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
                <Link href="/">
                    <SidebarMenuButton
                        size="lg"
                        className="text-sidebar-accent-foreground"
                    >
                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                            {/* <Bot className="size-4" /> */}
                            <svg
                                width="41"
                                height="41"
                                viewBox="0 0 41 41"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M35 0H6C2.68629 0 0 2.68629 0 5.99999V34.1458C0 37.4595 2.68629 40.1458 6 40.1458H35C38.3137 40.1458 41 37.4595 41 34.1458V6C41 2.68629 38.3137 0 35 0Z"
                                    fill="#0751CF"
                                />
                                <path
                                    d="M40 26C30 26 28.6667 35.1 28 39C28.4444 39 28.8885 39 29.3322 39C29.7761 36.8335 30.8876 35.6418 32.6667 35.425C35.3333 35.1 37.3333 32.825 38 30.875L37 30.225C37.2222 30.0083 37.4445 29.7917 37.6667 29.575C38.3333 28.925 39.0028 27.95 40 26Z"
                                    fill="white"
                                />
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M19.9984 8C22.84 8 25.4473 8.96694 27.5043 10.5836L25.9547 13.8322C24.4247 12.3531 22.3208 11.4435 20.0023 11.4435C15.3146 11.4435 11.5168 15.1622 11.5168 19.7523C11.5168 23.4022 13.9212 26.5017 17.2623 27.6177L15.9508 30.8166C11.3177 29.1885 8 24.8507 8 19.7523C8 13.2627 13.3708 8.00382 19.9984 8.00382V8Z"
                                    fill="white"
                                />
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M29.9393 13.1634C31.2391 15.0399 32.0002 17.3101 32.0002 19.7485C32.0002 26.238 26.6294 31.4969 20.0018 31.4969C19.065 31.4969 18.1517 31.3899 17.2773 31.1912L18.6083 27.9426C19.0611 28.0152 19.5256 28.0534 20.0018 28.0534C24.6895 28.0534 28.4873 24.3347 28.4873 19.7446C28.4873 18.9612 28.3741 18.2006 28.1673 17.4821L29.9393 13.1595V13.1634Z"
                                    fill="white"
                                />
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M24.2786 26.9222L22.5105 31.2371C21.9992 31.3441 21.4722 31.4205 20.9375 31.4587C20.9453 31.4587 20.9492 31.4587 20.957 31.4587L22.5027 27.6865C23.1311 27.4993 23.7244 27.2394 24.2825 26.9222H24.2786Z"
                                    fill="#0751CF"
                                    fill-opacity="0.19"
                                />
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M12.8585 29.1923C12.4721 28.9095 12.1013 28.6076 11.75 28.2827L13.2059 24.7322C13.5064 25.1259 13.8421 25.4889 14.2051 25.8253L12.8312 29.1771L12.8546 29.1962L12.8585 29.1923Z"
                                    fill="#0751CF"
                                    fill-opacity="0.19"
                                />
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M17.633 17.4668L12.8359 29.1733C13.7766 29.8612 14.8227 30.4154 15.9507 30.809L16.1654 30.2854L21.423 17.4668H17.6369H17.633ZM20.9507 31.4587L22.4964 27.6865L27.1802 16.2629L28.9562 11.9289L30.3574 8.51215H26.6181L26.5713 8.51597L26.1146 9.63196L24.7836 12.8806L18.6088 27.9388L17.2778 31.1874C18.1521 31.3861 19.0576 31.4893 19.9944 31.4931C20.0959 31.4931 20.1974 31.4931 20.2989 31.4893H20.3145C20.4081 31.4855 20.5018 31.4817 20.5955 31.4779L20.6384 31.474C20.7243 31.4702 20.8063 31.4626 20.8921 31.4587C20.9117 31.4587 20.9312 31.4549 20.9507 31.4549V31.4587Z"
                                    fill="white"
                                />
                            </svg>
                        </div>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">
                                danarx.com
                            </span>
                            <span className="truncate text-xs">Notes</span>
                        </div>
                        {/* <ChevronsUpDown className="ml-auto" /> */}
                    </SidebarMenuButton>
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <NavProjects projects={data.projects} />
                <NavMain />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
