import React from "react";
import { usePage, router } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import Masonry from "react-masonry-css";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function CategoryShow() {
    const { category, notes, search } = usePage().props;

    const breakpointColumnsObj = {
        default: 4,
        768: 3,
        640: 1,
    };

    const deleteNote = (note) => {
        if (confirm("Delete this note?")) {
            router.delete(`/notes/${note.id}`);
        }
    };

    const openEditDialog = (note) => {
        // Navigate to main page with edit functionality
        router.get("/", { edit: note.id });
    };

    // Generate page title and description based on search
    const getPageTitle = () => {
        return search
            ? `Search results in ${category.name}`
            : `Notes in ${category.name}`;
    };

    const getPageDescription = () => {
        if (search) {
            return `Found ${notes.length} note${notes.length !== 1 ? "s" : ""} matching "${search}"`;
        }
        return `Only showing notes in the "${category.name}" category`;
    };

    return (
        <AppLayout
            BreadcrumbLink1="Notes"
            BreadcrumbLink2={`Notes in ${category.name}`}
        >
            <div className="mb-7 flex items-center justify-between gap-2">
                <div>
                    <h1 className="text-xl font-bold leading-tight lg:text-2xl">
                        {getPageTitle()}
                    </h1>
                    <p className="pt-1 text-sm text-gray-500 dark:text-gray-300 lg:pt-0 lg:text-base">
                        {getPageDescription()}
                    </p>
                </div>
            </div>

            {notes.length === 0 ? (
                <div className="mt-4 flex justify-center">
                    <Card className="flex h-72 w-full items-center justify-center p-6 text-center text-lg text-gray-600 dark:text-gray-300">
                        {search
                            ? `No notes found matching "${search}"`
                            : "No notes in this category"}
                    </Card>
                </div>
            ) : (
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="mt-4 flex gap-4"
                    columnClassName="masonry-column flex flex-col gap-3 md:gap-4"
                >
                    {notes.map((note) => (
                        <Card key={note.id} className="group p-4 md:p-5">
                            <div className="whitespace-pre-wrap text-sm text-gray-700 dark:text-white md:text-base">
                                {note.content}
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                                    {note.category?.name}
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="size-8 opacity-0 transition-opacity group-hover:opacity-100"
                                        >
                                            <Ellipsis />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem>
                                            <button
                                                onClick={() =>
                                                    router.put(
                                                        `/notes/${note.id}/archive`,
                                                    )
                                                }
                                            >
                                                Archive
                                            </button>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <button
                                                className="text-red-600"
                                                onClick={() => deleteNote(note)}
                                            >
                                                Delete Note
                                            </button>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </Card>
                    ))}
                </Masonry>
            )}
        </AppLayout>
    );
}
