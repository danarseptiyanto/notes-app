"use client";

import { ChevronRight, Funnel } from "lucide-react";
import { Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export function NavMain({ items }) {
    const { userCategories } = usePage().props;
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Filter</SidebarGroupLabel>
            <SidebarMenu>
                <Collapsible defaultOpen asChild className="group/collapsible">
                    <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                            <SidebarMenuButton tooltip="Dashboard">
                                <Funnel />
                                <span>Filter Categories</span>
                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <SidebarMenuSub>
                                {userCategories &&
                                    userCategories.map((category) => (
                                        <SidebarMenuSubItem key={category.id}>
                                            <SidebarMenuSubButton>
                                                {/* Use Inertia's Link component for SPA navigation */}
                                                <Link
                                                    href={`/category/${category.name}`}
                                                >
                                                    <span>{category.name}</span>
                                                </Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    ))}
                                <SidebarMenuSubItem>
                                    <SidebarMenuSubButton>
                                        <a href="#">
                                            <span>Add new</span>
                                        </a>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                            </SidebarMenuSub>
                        </CollapsibleContent>
                    </SidebarMenuItem>
                </Collapsible>
            </SidebarMenu>
        </SidebarGroup>
    );
}
