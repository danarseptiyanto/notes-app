<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Inertia\Inertia;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class NoteController extends Controller
{
    use AuthorizesRequests;
    public function index(Request $request, $categoryName = null)
    {
        $user = $request->user();

        // eager load categories
        $categories = $user->categories()->orderBy('name')->get();

        $notesQuery = $user->notes()
            ->with('category')
            ->where('archived', false)
            ->latest();

        if ($categoryName) {
            $category = $user->categories()
                ->where('name', $categoryName)
                ->firstOrFail();

            $notesQuery->where('category_id', $category->id);
        }

        $notes = $notesQuery->get();

        return Inertia::render('Notes/Index', [
            'notes' => $notes,
            'categories' => $categories,
            'activeCategory' => $categoryName,
        ]);
    }

    public function indexarchive(Request $request, $categoryName = null)
    {
        $user = $request->user();
        $notes = $user->notes()
            ->with('category')
            ->where('archived', true)
            ->latest()
            ->get();;
        return Inertia::render('Notes/IndexArchive', [
            'notes' => $notes
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'content' => 'required|string',
            'category_id' => 'required|exists:categories,id',
        ]);

        $note = auth()->user()->notes()->create($data);

        return redirect()->back()->with('success', 'Note created');
    }

    public function update(Request $request, Note $note)
    {
        $this->authorize('update', $note);

        $data = $request->validate([
            'content' => 'required|string',
            'category_id' => 'required|exists:categories,id',
        ]);

        $note->update($data);

        return redirect()->back()->with('success', 'Note successfully updated!');
    }

    public function destroy(Note $note)
    {
        $this->authorize('delete', $note);
        $note->delete();
        return redirect()->back()->with('success', 'Note Deleted!');
    }
    public function filter(Request $request, $categoryName)
    {
        $user = $request->user();

        // Make sure category belongs to the authenticated user
        $category = Category::where('name', $categoryName)
            ->where('user_id', $user->id)
            ->firstOrFail();

        // Get notes for this category belonging to this user
        $notes = $user->notes()
            ->where('category_id', $category->id)
            ->get();

        return Inertia::render('Notes/Filter', [
            'category' => $category,
            'notes' => $notes,
        ]);
    }

    public function archive(Note $note)
    {
        $note->update(['archived' => true]);

        return back()->with('success', 'Note Archived!');
    }

    public function unarchive(Note $note)
    {
        $note->update(['archived' => false]);

        return back()->with('success', 'Note Unarchived!');
    }
}
