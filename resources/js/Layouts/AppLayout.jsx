import { AppSidebar } from "@/components/app-sidebar";
import { Head } from "@inertiajs/react";
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

import { Toaster, toast } from "sonner";
import { useEffect } from "react";
import { usePage } from "@inertiajs/react";

export default function AppLayout({
    children,
    BreadcrumbLink1,
    BreadcrumbLink2,
    title = "Notes",
}) {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    return (
        <>
            <Head title={title} />
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
                        <div className="flex items-center">
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
                        <ThemeToggle />
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
