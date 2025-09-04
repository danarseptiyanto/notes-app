import React from "react";
import { usePage } from "@inertiajs/react";

export default function CategoryShow() {
    const { category, notes } = usePage().props;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Notes in {category.name}</h1>

            {notes.length > 0 ? (
                <ul className="mt-4 space-y-2">
                    {notes.map((note) => (
                        <li key={note.id} className="rounded border p-4">
                            {note.content}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="mt-4 text-gray-500">No notes in this category.</p>
            )}
        </div>
    );
}
