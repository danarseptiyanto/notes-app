import React, { useState, useRef, useEffect } from "react";
import { router, useForm, usePage } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Ellipsis, Pin, PinOff } from "lucide-react";
import NoteDetailModal from "@/components/NoteDetailModal";
import Masonry from "react-masonry-css";
import { useMediaQuery } from "@/hooks/use-media-query";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";

// Reusable form component for both Dialog and Drawer
function NoteForm({ form, categories, editingNote, onSubmit, className }) {
    const textareaRef = useRef(null);

    return (
        <form onSubmit={onSubmit} className={className}>
            <div className="space-y-1">
                <Label htmlFor="content">Note</Label>
                <Textarea
                    id="content"
                    rows={0}
                    ref={textareaRef}
                    value={form.data.content}
                    onChange={(e) => form.setData("content", e.target.value)}
                    onInput={(e) => {
                        const el = e.currentTarget;
                        el.style.height = "auto";
                        el.style.height = el.scrollHeight + "px";
                    }}
                    className="min-h-44 text-sm md:min-h-64 md:text-base"
                    placeholder="Write your note..."
                />
            </div>
            <div className="space-y-1">
                <Label htmlFor="category">Category</Label>
                <Select
                    id="category"
                    value={form.data.category_id?.toString()}
                    onValueChange={(value) =>
                        form.setData("category_id", value)
                    }
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((c) => (
                            <SelectItem key={c.id} value={c.id.toString()}>
                                {c.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex gap-3 pb-5 pt-1 md:pb-0">
                <Button
                    type="submit"
                    disabled={form.processing}
                    className="w-full"
                >
                    {editingNote ? "Save Changes" : "Add Note"}
                </Button>
                <DrawerClose asChild>
                    <Button className="w-full" variant="outline">
                        Cancel
                    </Button>
                </DrawerClose>
            </div>
        </form>
    );
}

export default function NotesIndex() {
    const { notes, categories, activeCategory, search } = usePage().props;
    const [open, setOpen] = useState(false);
    const [editingNote, setEditingNote] = useState(null);
    const [selectedNote, setSelectedNote] = useState(null);
    const [detailOpen, setDetailOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    const pinnedNotes = notes.filter((note) => note.pinned);
    const unpinnedNotes = notes.filter((note) => !note.pinned);

    const breakpointColumnsObj = {
        default: 4, // 3 columns desktop
        768: 3, // 2 columns tablet
        640: 1, // 1 column mobile
    };

    // form for both creating and editing
    const form = useForm({
        content: "",
        category_id: categories.length ? categories[0].id : "",
    });

    // When opening dialog for editing, populate form
    useEffect(() => {
        if (editingNote) {
            form.setData("content", editingNote.content);
            form.setData("category_id", editingNote.category_id.toString());
        } else {
            form.reset();
        }
    }, [editingNote]);

    const submit = (e) => {
        e.preventDefault();

        if (editingNote) {
            // update existing note
            router.put(`/notes/${editingNote.id}`, form.data, {
                onSuccess: () => setEditingNote(null),
            });
        } else {
            // create new note
            form.post("/notes", {
                onSuccess: () => form.reset("content"),
            });
        }

        setOpen(false);
    };

    const deleteNote = (note) => {
        if (confirm("Delete this note?")) {
            router.delete(`/notes/${note.id}`);
        }
    };

    const openEditDialog = (note) => {
        setEditingNote(note);
        setOpen(true);
    };

    const openCreateDialog = () => {
        setEditingNote(null);
        setOpen(true);
    };

    // Generate page title and description based on search and category
    const getPageTitle = () => {
        if (search) {
            return activeCategory
                ? `Search results in ${activeCategory}`
                : "Search results";
        }
        return activeCategory ? `Notes in ${activeCategory}` : "All Notes";
    };

    const getPageDescription = () => {
        if (search) {
            return `Found ${notes.length} note${notes.length !== 1 ? "s" : ""} matching "${search}"`;
        }
        return activeCategory
            ? `Only showing notes in the "${activeCategory}" category`
            : "Create, edit, archive, or delete your Notes in this page";
    };

    const openDetailModal = (note) => {
        setSelectedNote(note);
        setDetailOpen(true);
    };

    const renderNote = (note) => (
        <Card key={note.id} className="group p-4 md:p-5">
            <div
                className="line-clamp-[10] cursor-pointer whitespace-pre-wrap text-sm text-gray-700 dark:text-white md:text-base"
                onClick={() => openDetailModal(note)}
            >
                {note.content}
            </div>
            <div className="flex items-center justify-between">
                <div className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                    {note.category?.name}
                </div>
                <div className="flex items-center gap-1">
                    <Button
                        variant="outline"
                        size="icon"
                        className="size-8 opacity-0 transition-opacity group-hover:opacity-100"
                        onClick={() => router.put(`/notes/${note.id}/pin`)}
                    >
                        {note.pinned ? (
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
                                className="size-8 opacity-0 transition-opacity group-hover:opacity-100"
                            >
                                <Ellipsis />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                <button onClick={() => openEditDialog(note)}>
                                    Edit Note
                                </button>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <button
                                    onClick={() =>
                                        router.put(`/notes/${note.id}/archive`)
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
            </div>
        </Card>
    );

    return (
        <AppLayout
            BreadcrumbLink1="Notes"
            BreadcrumbLink2={
                activeCategory ? `Notes in ${activeCategory}` : "All Notes"
            }
        >
            <button
                className="fixed bottom-7 right-7 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-700 text-white shadow-md md:hidden"
                onClick={openCreateDialog}
            >
                <Plus />
            </button>
            <div className="mb-7 flex items-center justify-between gap-2">
                <div>
                    <h1 className="text-xl font-bold leading-tight lg:text-2xl">
                        {getPageTitle()}
                    </h1>
                    <p className="pt-1 text-sm text-gray-500 dark:text-gray-300 lg:pt-0 lg:text-base">
                        {getPageDescription()}
                    </p>
                </div>
                <div>
                    <Button
                        className="hidden gap-2 md:flex"
                        onClick={openCreateDialog}
                    >
                        <Plus className="px-0" />
                        <p>Add Note</p>
                    </Button>
                </div>
            </div>

            {/* Responsive Dialog/Drawer */}
            {isDesktop ? (
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent
                        className="max-w-2xl"
                        onOpenAutoFocus={(event) => event.preventDefault()}
                    >
                        <DialogHeader>
                            <DialogTitle>
                                {editingNote ? "Edit Note" : "Add Note"}
                            </DialogTitle>
                            <DialogDescription>
                                {editingNote
                                    ? "Edit the note or the category attached to it"
                                    : "Add new note and the category to which it belongs"}
                            </DialogDescription>
                        </DialogHeader>
                        <NoteForm
                            form={form}
                            categories={categories}
                            editingNote={editingNote}
                            onSubmit={submit}
                            className="space-y-2"
                        />
                    </DialogContent>
                </Dialog>
            ) : (
                <Drawer open={open} onOpenChange={setOpen}>
                    <DrawerContent>
                        {/* <DrawerHeader className="text-left">
                            <DrawerTitle>
                                {editingNote ? "Edit Note" : "Add Note"}
                            </DrawerTitle>
                            <DrawerDescription>
                                {editingNote
                                    ? "Edit the note or the category attached to it"
                                    : "Add new note and the category to which it belongs"}
                            </DrawerDescription>
                        </DrawerHeader> */}
                        <NoteForm
                            form={form}
                            categories={categories}
                            editingNote={editingNote}
                            onSubmit={submit}
                            className="space-y-2 px-4"
                        />
                    </DrawerContent>
                </Drawer>
            )}

            {/* Note Detail Modal */}
            <NoteDetailModal
                note={selectedNote}
                open={detailOpen}
                onOpenChange={setDetailOpen}
                onEdit={openEditDialog}
            />

            {notes.length === 0 ? (
                <div className="mt-4 flex justify-center">
                    <Card className="flex h-72 w-full items-center justify-center p-6 text-center text-lg text-gray-600 dark:text-gray-300">
                        Notes you add appear here
                    </Card>
                </div>
            ) : (
                <div className="mt-4 space-y-8">
                    {pinnedNotes.length > 0 && (
                        <div>
                            <h3 className="mb-4 text-lg font-semibold">
                                Pinned Notes
                            </h3>
                            <Masonry
                                breakpointCols={breakpointColumnsObj}
                                className="flex gap-4"
                                columnClassName="masonry-column flex flex-col gap-3 md:gap-4"
                            >
                                {pinnedNotes.map(renderNote)}
                            </Masonry>
                        </div>
                    )}
                    {unpinnedNotes.length > 0 && (
                        <div>
                            <h3 className="mb-4 text-lg font-semibold">
                                Notes
                            </h3>
                            <Masonry
                                breakpointCols={breakpointColumnsObj}
                                className="flex gap-4"
                                columnClassName="masonry-column flex flex-col gap-3 md:gap-4"
                            >
                                {unpinnedNotes.map(renderNote)}
                            </Masonry>
                        </div>
                    )}
                </div>
            )}
        </AppLayout>
    );
}
