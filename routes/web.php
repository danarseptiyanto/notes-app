<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CategoryController;



// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/', [NoteController::class, 'index'])->name('notes.index');
    Route::get('/archivednotes', [NoteController::class, 'indexarchive'])->name('notes.archived');
    Route::put('/notes/{note}/archive', [NoteController::class, 'archive'])->name('notes.archive');
    Route::put('/notes/{note}/pin', [NoteController::class, 'pin'])->name('notes.pin');
    Route::get('/category/{category}', [NoteController::class, 'index'])->name('notes.byCategory');
    Route::resource('notes', NoteController::class)->except(['index', 'create', 'edit', 'show']);
    Route::resource('categories', CategoryController::class)->except(['show']);
    Route::post('/notes/{note}/unarchive', [NoteController::class, 'unarchive'])
        ->name('notes.unarchive');
});

require __DIR__ . '/auth.php';
