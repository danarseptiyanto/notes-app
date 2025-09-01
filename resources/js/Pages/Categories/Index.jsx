import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { useForm, usePage } from "@inertiajs/react";

export default function CategoriesIndex() {
    const { categories } = usePage().props;
    const [editingId, setEditingId] = useState(null);

    const form = useForm({ name: "" });

    const submit = (e) => {
        e.preventDefault();
        form.post("/categories", {
            onSuccess: () => form.reset("name"),
        });
    };

    const updateCategory = (category, e) => {
        e.preventDefault();
        Inertia.put(`/categories/${category.id}`, {
            name: e.target.name.value,
        });
        setEditingId(null);
    };

    const deleteCategory = (category) => {
        if (confirm("Delete this category?")) {
            Inertia.delete(`/categories/${category.id}`);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Categories</h1>

            {/* Add category form */}
            <form
                onSubmit={submit}
                className="bg-white shadow p-4 rounded-xl mb-6 flex gap-2"
            >
                <input
                    type="text"
                    className="flex-1 border rounded p-2"
                    placeholder="Category name"
                    value={form.data.name}
                    onChange={(e) => form.setData("name", e.target.value)}
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 rounded-lg hover:bg-blue-600"
                    disabled={form.processing}
                >
                    Add
                </button>
            </form>

            {/* Categories list */}
            <div className="space-y-3">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="bg-white shadow p-4 rounded-xl flex items-center justify-between"
                    >
                        {editingId === category.id ? (
                            <form
                                onSubmit={(e) => updateCategory(category, e)}
                                className="flex gap-2 flex-1"
                            >
                                <input
                                    name="name"
                                    defaultValue={category.name}
                                    className="flex-1 border rounded p-2"
                                />
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
                            </form>
                        ) : (
                            <>
                                <span>{category.name}</span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() =>
                                            setEditingId(category.id)
                                        }
                                        className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteCategory(category)}
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
