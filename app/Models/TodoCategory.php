<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class TodoCategory extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = ['categoryName', 'categoryColor'];

    public function todos(): HasMany
    {
        return $this->hasMany(Todo::class);
    }
}