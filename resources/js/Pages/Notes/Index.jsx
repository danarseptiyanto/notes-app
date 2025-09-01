import React, { useState } from "react";
import { router, useForm, usePage } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function NotesIndex() {
    const { notes, categories } = usePage().props;
    const [editingId, setEditingId] = useState(null);

    // create form
    const form = useForm({
        content: "",
        category_id: categories.length ? categories[0].id : "",
    });

    const submit = (e) => {
        e.preventDefault();
        form.post("/notes", {
            onSuccess: () => form.reset("content"),
        });
    };

    const updateNote = (note, e) => {
        e.preventDefault();
        router.put(`/notes/${note.id}`, {
            content: e.target.content.value,
            category_id: e.target.category_id.value,
        });
        setEditingId(null);
    };

    const deleteNote = (note) => {
        if (confirm("Delete this note?")) {
            router.delete(`/notes/${note.id}`);
        }
    };

    return (
        <AppLayout>
            <div className="">
                <Card className="mb-6 p-4 mx-auto max-w-2xl">
                    <form onSubmit={submit} className="">
                        <Textarea
                            value={form.data.content}
                            onChange={(e) =>
                                form.setData("content", e.target.value)
                            }
                        />
                        <div className="flex items-center mt-4 justify-between">
                            <Select
                                value={form.data.category_id?.toString()}
                                onValueChange={(value) =>
                                    form.setData("category_id", value)
                                }
                            >
                                <SelectTrigger className="w-[180px]">
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
                            <Button type="submit" disabled={form.processing}>
                                Add Note
                            </Button>
                        </div>
                    </form>
                </Card>

                {/* Notes list */}
                <div className="columns-3 gap-4">
                    {notes.map((note) => (
                        <Card key={note.id} className="mb-4 break-inside-avoid">
                            {editingId === note.id ? (
                                <form
                                    onSubmit={(e) => updateNote(note, e)}
                                    className="space-y-2"
                                >
                                    <textarea
                                        name="content"
                                        defaultValue={note.content}
                                        className="w-full border rounded p-2"
                                        rows="3"
                                    />
                                    <select
                                        name="category_id"
                                        defaultValue={note.category_id}
                                        className="border rounded p-2"
                                    >
                                        {categories.map((c) => (
                                            <option key={c.id} value={c.id}>
                                                {c.name}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="flex gap-2">
                                        <button
                                            type="submit"
                                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                        >
                                            Save
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setEditingId(null)}
                                            className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <>
                                    <div className="whitespace-pre-wrap">
                                        {note.content}
                                    </div>
                                    <div className="text-sm text-gray-500 mt-2">
                                        {note.category?.name}
                                    </div>
                                    <div className="flex gap-2 mt-3">
                                        <button
                                            onClick={() =>
                                                setEditingId(note.id)
                                            }
                                            className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteNote(note)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </>
                            )}
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
