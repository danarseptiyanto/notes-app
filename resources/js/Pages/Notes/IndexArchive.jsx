import React from "react";
import AppLayout from "@/Layouts/AppLayout";
import { usePage, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ArchiveRestore, ArchiveX, Trash2 } from "lucide-react";

export default function IndexArchive() {
    const { notes } = usePage().props;

    const handleUnarchive = (id) => {
        router.post(route("notes.unarchive", id));
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this note permanently?")) {
            router.delete(route("notes.destroy", id));
        }
    };

    return (
        <AppLayout BreadcrumbLink1="Notes" BreadcrumbLink2="Archived">
            <div className="mb-7 flex items-center justify-between gap-2">
                <div>
                    <h1 className="text-xl font-bold leading-tight lg:text-2xl">
                        Archived Notes
                    </h1>
                    <p className="pt-1 text-sm text-gray-500 dark:text-gray-300 lg:pt-0 lg:text-base">
                        View and manage your archived notes here
                    </p>
                </div>
            </div>

            {notes && notes.length > 0 ? (
                <div className="rounded-md border">
                    <Table>
                        <TableBody>
                            {notes.map((note) => (
                                <TableRow key={note.id}>
                                    <TableCell className="flex flex-col md:flex-row md:items-center md:justify-between">
                                        <div className="p-2.5">
                                            <div className="whitespace-pre-wrap pb-1">
                                                <span className="text-base text-gray-800 dark:text-white">
                                                    {note.content}
                                                </span>
                                            </div>
                                            {note.category && (
                                                <div className="text-md text-gray-500 dark:text-gray-300">
                                                    {note.category.name}
                                                </div>
                                            )}
                                        </div>
                                        <div className="inline-flex space-x-2 px-2.5">
                                            <Button
                                                onClick={() =>
                                                    handleUnarchive(note.id)
                                                }
                                                variant="outline"
                                                size="sm"
                                            >
                                                <ArchiveRestore className="size-3" />
                                            </Button>
                                            <Button
                                                onClick={() =>
                                                    handleDelete(note.id)
                                                }
                                                variant="destructive"
                                                size="sm"
                                            >
                                                <Trash2 className="size-3" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            ) : (
                <p className="text-gray-500">No archived notes.</p>
            )}
        </AppLayout>
    );
}
