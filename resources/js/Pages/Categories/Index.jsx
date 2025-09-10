import React, { useState, useEffect } from "react";
import { router, useForm, usePage } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { Plus, PencilLine, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
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
            <div className="mb-7 flex items-center justify-between gap-2">
                <div>
                    <h1 className="text-xl font-bold leading-tight lg:text-2xl">
                        Category
                    </h1>
                    <p className="pt-1 text-sm text-gray-500 dark:text-gray-300 lg:pt-0 lg:text-base">
                        Create, edit, or delete your Categories in this page
                    </p>
                </div>
                <div>
                    <Button className="gap-1" onClick={openCreateDialog}>
                        <Plus className="px-0" />
                        Add <span className="hidden md:block">Category</span>
                    </Button>
                </div>
            </div>
            <div className="mx-auto">
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
                <div className="rounded-md border">
                    <Table>
                        <TableBody>
                            {categories.map((category) => (
                                <TableRow key={category.id}>
                                    <TableCell className="flex flex-col md:flex-row md:items-center md:justify-between">
                                        <div className="p-2.5">
                                            <div className="whitespace-pre-wrap pb-1">
                                                <span className="text-base text-gray-800 dark:text-white">
                                                    {category.name}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="inline-flex space-x-2 px-2.5">
                                            <Button
                                                onClick={() =>
                                                    openEditDialog(category)
                                                }
                                                variant="outline"
                                                size="sm"
                                            >
                                                <PencilLine className="size-3" />
                                            </Button>
                                            <Button
                                                onClick={() =>
                                                    deleteCategory(category)
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
