<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class CategoryController extends Controller
{
    use AuthorizesRequests;

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

        // Encrypt category name
        $data['name'] = Crypt::encryptString($data['name']);

        auth()->user()->categories()->create($data);

        return redirect()->back()->with('success', 'Category created.');
    }

    public function update(Request $request, Category $category)
    {
        $this->authorize('update', $category);

        if ($category->name === 'General') {
            return redirect()->back()->with('error', 'Default category cant be renamed');
        }

        $data = $request->validate([
            'name' => 'required|string|max:100',
        ]);

        // Encrypt category name
        $data['name'] = Crypt::encryptString($data['name']);

        $category->update($data);

        return redirect()->back()->with('success', 'Category updated.');
    }

    public function destroy(Category $category)
    {
        $this->authorize('delete', $category);

        if ($category->name === 'General') {
            return redirect()->back()->with('error', 'You cannot delete the default category.');
        }

        // Find the "General" category (encrypted in DB)
        $encryptedGeneral = Crypt::encryptString('General');
        $generalCategory = Category::where('name', $encryptedGeneral)->first();

        if (!$generalCategory) {
            return redirect()->back()->with('error', 'General category not found. Please create one first.');
        }

        // Reassign all notes from this category to the "General" category
        $category->notes()->update([
            'category_id' => $generalCategory->id
        ]);

        // Now delete the category
        $category->delete();

        return redirect()->back()->with('success', 'Category deleted. Notes moved to General.');
    }
}
