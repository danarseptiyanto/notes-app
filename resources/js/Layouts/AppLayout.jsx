import { AppSidebar } from "@/components/app-sidebar";
import { Head, router } from "@inertiajs/react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import ThemeToggle from "@/Components/ThemeToggle";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Toaster, toast } from "sonner";
import { useEffect, useState, useRef } from "react";
import { usePage } from "@inertiajs/react";

export default function AppLayout({
    children,
    BreadcrumbLink1,
    BreadcrumbLink2,
    title = "Notes",
}) {
    const { flash, search: initialSearch } = usePage().props;
    const [searchQuery, setSearchQuery] = useState(initialSearch || "");
    const debounceTimeout = useRef(null);

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    // Update local state when URL changes
    useEffect(() => {
        setSearchQuery(initialSearch || "");
    }, [initialSearch]);

    const handleSearchChange = (value) => {
        setSearchQuery(value);

        // Clear existing timeout
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        // Set new timeout for debounced search
        debounceTimeout.current = setTimeout(() => {
            const currentUrl = new URL(window.location.href);
            if (value) {
                currentUrl.searchParams.set("search", value);
            } else {
                currentUrl.searchParams.delete("search");
            }
            router.get(
                currentUrl.pathname + currentUrl.search,
                {},
                {
                    preserveState: true,
                    preserveScroll: true,
                },
            );
        }, 300);
    };

    const clearSearch = () => {
        setSearchQuery("");
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.delete("search");
        router.get(
            currentUrl.pathname + currentUrl.search,
            {},
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    return (
        <>
            <Head title={title} />
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
                        <div className="flex items-center gap-2">
                            <SidebarTrigger className="-ml-1" />
                            <Separator
                                orientation="vertical"
                                className="mr-2 data-[orientation=vertical]:h-4"
                            />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem className="hidden md:block">
                                        <BreadcrumbPage>
                                            {BreadcrumbLink1}
                                        </BreadcrumbPage>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator className="hidden md:block" />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>
                                            {BreadcrumbLink2}
                                        </BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="relative hidden md:block">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search notes..."
                                    className="w-64 pl-8 pr-8"
                                    value={searchQuery}
                                    onChange={(e) =>
                                        handleSearchChange(e.target.value)
                                    }
                                />
                                {searchQuery && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-0 top-0 h-full px-2 hover:bg-transparent"
                                        onClick={clearSearch}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                            <ThemeToggle />
                        </div>
                    </header>
                    <div className="flex flex-1 flex-col gap-4 p-5">
                        <main>{children}</main>
                    </div>
                </SidebarInset>
                <Toaster position="bottom-right" richColors />
            </SidebarProvider>
        </>
    );
}
