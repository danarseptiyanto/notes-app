import React, { useState, useRef, useEffect } from "react";
import { router, useForm, usePage } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Ellipsis } from "lucide-react";
import Masonry from "react-masonry-css";

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
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export default function NotesIndex() {
    const { notes, categories } = usePage().props;
    const [open, setOpen] = useState(false);
    const [editingNote, setEditingNote] = useState(null);
    const textareaRef = useRef(null);

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

    return (
        <AppLayout>
            <div className="mb-7 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold leading-tight">Notes</h1>
                    <p className="text-gray-500">
                        Create, edit, archive, or delete your Notes in this page
                    </p>
                </div>
                <div>
                    <Button className="gap-1" onClick={openCreateDialog}>
                        <Plus className="px-0" />
                        Add Note
                    </Button>
                </div>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent
                    className="max-w-md"
                    onOpenAutoFocus={(event) => event.preventDefault()}
                >
                    <form onSubmit={submit} className="space-y-2">
                        <DialogHeader>
                            <DialogTitle>
                                {editingNote ? "Edit Note" : "Add Note"}
                            </DialogTitle>
                            <DialogDescription>
                                {editingNote
                                    ? "Edit the note or the category attached to it"
                                    : "Add new note and the category to which it belongs"}
                            </DialogDescription>

                            <div className="mt-1 space-y-1">
                                <Label htmlFor="content">Note</Label>
                                <Textarea
                                    id="content"
                                    rows={0}
                                    ref={textareaRef}
                                    value={form.data.content}
                                    onChange={(e) =>
                                        form.setData("content", e.target.value)
                                    }
                                    onInput={(e) => {
                                        const el = e.currentTarget;
                                        el.style.height = "auto";
                                        el.style.height =
                                            el.scrollHeight + "px";
                                    }}
                                    className="min-h-44"
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
                                            <SelectItem
                                                key={c.id}
                                                value={c.id.toString()}
                                            >
                                                {c.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </DialogHeader>

                        <DialogFooter className="pt-1">
                            <Button type="submit" disabled={form.processing}>
                                {editingNote ? "Save Changes" : "Add Note"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
            {notes.length === 0 ? (
                <div className="mt-4 flex justify-center">
                    <Card className="flex h-72 w-full items-center justify-center p-6 text-center text-lg text-gray-600">
                        Notes you add appear here
                    </Card>
                </div>
            ) : (
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="mt-4 flex gap-4"
                    columnClassName="masonry-column flex flex-col gap-4"
                >
                    {notes.map((note) => (
                        <Card key={note.id} className="group p-5">
                            <div className="whitespace-pre-wrap text-gray-700">
                                {note.content}
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="mt-2 text-sm text-gray-500">
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
                                                    openEditDialog(note)
                                                }
                                            >
                                                Edit Note
                                            </button>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            Archive
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
