import React, { useState, useEffect } from "react";
import { router, useForm, usePage } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function CategoriesIndex() {
    const { categories, flash } = usePage().props;
    const [open, setOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);

    const form = useForm({ name: "" });

    // populate form when editing
    useEffect(() => {
        if (editingCategory) {
            form.setData("name", editingCategory.name);
        } else {
            form.reset();
        }
    }, [editingCategory]);

    const openCreateDialog = () => {
        setEditingCategory(null);
        setOpen(true);
    };

    const openEditDialog = (category) => {
        setEditingCategory(category);
        setOpen(true);
    };

    const submit = (e) => {
        e.preventDefault();

        if (editingCategory) {
            router.put(`/categories/${editingCategory.id}`, form.data, {
                onSuccess: () => setEditingCategory(null),
            });
        } else {
            form.post("/categories", {
                onSuccess: () => form.reset(),
            });
        }

        setOpen(false);
    };

    const deleteCategory = (category) => {
        if (confirm("Delete this category?")) {
            router.delete(`/categories/${category.id}`);
        }
    };

    return (
        <AppLayout BreadcrumbLink1="Notes" BreadcrumbLink2="All Notes">
            <div className="mx-auto max-w-xl p-6">
                <h1 className="mb-6 text-2xl font-bold">Categories</h1>

                {flash?.error && (
                    <div className="mb-4 rounded bg-red-100 p-2 text-red-600">
                        {flash.error}
                    </div>
                )}

                <Button onClick={openCreateDialog} className="mb-4">
                    Add Category
                </Button>

                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="max-w-md">
                        <form onSubmit={submit} className="space-y-4">
                            <DialogHeader>
                                <DialogTitle>
                                    {editingCategory
                                        ? "Edit Category"
                                        : "Add Category"}
                                </DialogTitle>
                            </DialogHeader>

                            <Input
                                placeholder="Category name"
                                value={form.data.name}
                                onChange={(e) =>
                                    form.setData("name", e.target.value)
                                }
                            />

                            <DialogFooter className="flex justify-end gap-2">
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={() => setOpen(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={form.processing}
                                >
                                    {editingCategory
                                        ? "Save Changes"
                                        : "Add Category"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

                <div className="mt-4 space-y-3">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="flex items-center justify-between rounded-xl bg-white p-4 shadow"
                        >
                            <span>{category.name}</span>
                            <div className="flex gap-2">
                                <Button
                                    variant="secondary"
                                    onClick={() => openEditDialog(category)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={() => deleteCategory(category)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}

// import React, { useState } from "react";
// import { router, useForm, usePage } from "@inertiajs/react";

// export default function CategoriesIndex() {
//     const { categories, flash } = usePage().props;
//     const [editingId, setEditingId] = useState(null);

//     const form = useForm({ name: "" });

//     const submit = (e) => {
//         e.preventDefault();
//         form.post("/categories", {
//             onSuccess: () => form.reset("name"),
//         });
//     };

//     const updateCategory = (category, e) => {
//         e.preventDefault();
//         router.put(`/categories/${category.id}`, {
//             name: e.target.name.value,
//         });
//         setEditingId(null);
//     };

//     const deleteCategory = (category) => {
//         if (confirm("Delete this category?")) {
//             router.delete(`/categories/${category.id}`);
//         }
//     };

//     return (
//         <div className="max-w-xl mx-auto p-6">
//             <h1 className="text-2xl font-bold mb-6">Categories</h1>
//             {flash?.error && (
//                 <div className="mb-4 p-2 bg-red-100 text-red-600 rounded">
//                     {flash.error}xx
//                 </div>
//             )}
//             {/* Add category form */}
//             <form
//                 onSubmit={submit}
//                 className="bg-white shadow p-4 rounded-xl mb-6 flex gap-2"
//             >
//                 <input
//                     type="text"
//                     className="flex-1 border rounded p-2"
//                     placeholder="Category name"
//                     value={form.data.name}
//                     onChange={(e) => form.setData("name", e.target.value)}
//                 />
//                 <button
//                     type="submit"
//                     className="bg-blue-500 text-white px-4 rounded-lg hover:bg-blue-600"
//                     disabled={form.processing}
//                 >
//                     Add
//                 </button>
//             </form>

//             {/* Categories list */}
//             <div className="space-y-3">
//                 {categories.map((category) => (
//                     <div
//                         key={category.id}
//                         className="bg-white shadow p-4 rounded-xl flex items-center justify-between"
//                     >
//                         {editingId === category.id ? (
//                             <form
//                                 onSubmit={(e) => updateCategory(category, e)}
//                                 className="flex gap-2 flex-1"
//                             >
//                                 <input
//                                     name="name"
//                                     defaultValue={category.name}
//                                     className="flex-1 border rounded p-2"
//                                 />
//                                 <button
//                                     type="submit"
//                                     className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
//                                 >
//                                     Save
//                                 </button>
//                                 <button
//                                     type="button"
//                                     onClick={() => setEditingId(null)}
//                                     className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
//                                 >
//                                     Cancel
//                                 </button>
//                             </form>
//                         ) : (
//                             <>
//                                 <span>{category.name}</span>
//                                 <div className="flex gap-2">
//                                     <button
//                                         onClick={() =>
//                                             setEditingId(category.id)
//                                         }
//                                         className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
//                                     >
//                                         Edit
//                                     </button>
//                                     <button
//                                         onClick={() => deleteCategory(category)}
//                                         className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                                     >
//                                         Delete
//                                     </button>
//                                 </div>
//                             </>
//                         )}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }
