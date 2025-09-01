<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = auth()->user()
            ->categories()
            ->orderBy('name')
            ->get();

        return Inertia::render('Categories/Index', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:100',
        ]);

        auth()->user()->categories()->create($data);

        return redirect()->back()->with('success', 'Category created.');
    }

    public function update(Request $request, Category $category)
    {
        // only allow owner to update
        if ($category->user_id !== auth()->id()) {
            abort(403);
        }

        $data = $request->validate([
            'name' => 'required|string|max:100',
        ]);

        $category->update($data);

        return redirect()->back()->with('success', 'Category updated.');
    }

    public function destroy(Category $category)
    {
        // protect General category if you want
        if ($category->user_id !== auth()->id()) {
            abort(403);
        }

        if ($category->name === 'General') {
            return redirect()->back()->with('error', 'You cannot delete the default category.');
        }

        $category->delete();

        return redirect()->back()->with('success', 'Category deleted.');
    }
}
