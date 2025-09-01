import React, { useState } from "react";
import { router, useForm, usePage } from "@inertiajs/react";

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
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">My Notes</h1>
            <form
                onSubmit={submit}
                className="bg-white shadow p-4 rounded-xl mb-6 space-y-3"
            >
                <textarea
                    className="w-full border rounded p-2"
                    rows="3"
                    placeholder="Write a note..."
                    value={form.data.content}
                    onChange={(e) => form.setData("content", e.target.value)}
                />
                <div className="flex items-center justify-between">
                    <select
                        className="border rounded p-2"
                        value={form.data.category_id}
                        onChange={(e) =>
                            form.setData("category_id", e.target.value)
                        }
                    >
                        {categories.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        disabled={form.processing}
                    >
                        Add Note
                    </button>
                </div>
            </form>

            {/* Notes list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {notes.map((note) => (
                    <div
                        key={note.id}
                        className="bg-white shadow rounded-xl p-4 flex flex-col justify-between"
                    >
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
                                        onClick={() => setEditingId(note.id)}
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
                    </div>
                ))}
            </div>
        </div>
    );
}
