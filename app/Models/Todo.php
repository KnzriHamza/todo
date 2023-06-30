<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Laravel\Sanctum\HasApiTokens;

class Todo extends Model
{
    use HasApiTokens, HasFactory;

    protected $fillable = [
        'todoTitle',
        'todoMessage',
        'todoDone',
        'todoDate',
        'todoPriority',
        'sharedWith',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(TodoCategory::class, 'todo_category_id');
    }
}