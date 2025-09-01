<?php

namespace App\Http\Controllers;

use App\Models\Note; // It's good practice to import the models you use
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class NoteController extends Controller
{
    use AuthorizesRequests;
    public function index()
    {
        $user = auth()->user();

        // eager load categories and notes
        $categories = $user->categories()->orderBy('name')->get();
        $notes = $user->notes()->with('category')->latest()->get();

        return Inertia::render('Notes/Index', compact('notes', 'categories'));
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
            'pinned' => 'sometimes|boolean',
        ]);

        $note->update($data);

        return redirect()->back();
    }

    public function destroy(Note $note)
    {
        $this->authorize('delete', $note);
        $note->delete();
        return redirect()->back();
    }
}
