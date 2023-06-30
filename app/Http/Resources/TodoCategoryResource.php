<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TodoCategoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *

     * @return array<string, mixed>
     */
    public static $wrap;
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'categoryName' => $this->categoryName,
            'categoryColor' => $this->categoryColor,
            'categoryIcon' => $this->categoryIcon,
            'todos_count' => $this->todos_count,
            'pending_todos_count' => $this->pending_todos_count,
            'done_todos_count' => $this->done_todos_count,
            'todos' => TodoResource::collection($this->todos),
        ];
    }
}