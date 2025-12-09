import React, { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Pin, PinOff, Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function NoteDetailModal({ note, open, onOpenChange, onEdit }) {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [isPinned, setIsPinned] = useState(false);

    // Update local state when note changes
    useEffect(() => {
        if (note) {
            setIsPinned(note.pinned);
        }
    }, [note]);

    if (!note) return null;

    const deleteNote = () => {
        if (confirm("Delete this note?")) {
            router.delete(`/notes/${note.id}`);
            onOpenChange(false);
        }
    };

    const archiveNote = () => {
        router.put(`/notes/${note.id}/archive`);
        onOpenChange(false);
    };

    const togglePin = () => {
        setIsPinned(!isPinned); // Update local state immediately
        router.put(`/notes/${note.id}/pin`);
    };

    const handleEdit = () => {
        onOpenChange(false);
        if (onEdit) {
            onEdit(note);
        }
    };

    const NoteContent = () => (
        <div className="space-y-4">
            <div className="flex items-start justify-between gap-3">
                <div className="flex-1 whitespace-pre-wrap text-sm text-gray-700 dark:text-white md:text-base">
                    {note.content}
                </div>
            </div>
            <div className="flex items-center justify-between border-t pt-3 text-sm text-gray-500 dark:text-gray-300">
                <p>{note.category?.name}</p>
                <div className="flex items-center gap-1">
                    <Button
                        variant="outline"
                        size="icon"
                        className="size-9"
                        onClick={togglePin}
                    >
                        {isPinned ? (
                            <PinOff className="size-4" />
                        ) : (
                            <Pin className="size-4" />
                        )}
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="size-9"
                            >
                                <Ellipsis className="size-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                <button onClick={handleEdit}>Edit Note</button>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <button onClick={archiveNote}>Archive</button>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <button
                                    className="text-red-600"
                                    onClick={deleteNote}
                                >
                                    Delete Note
                                </button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Note Details</DialogTitle>
                    </DialogHeader>
                    <NoteContent />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent className="max-h-[100dvh]">
                <DrawerHeader className="text-left">
                    <DrawerTitle>Note Details</DrawerTitle>
                </DrawerHeader>
                <div className="flex-1 overflow-y-auto px-4 pb-8">
                    <NoteContent />
                </div>
            </DrawerContent>
        </Drawer>
    );
}
