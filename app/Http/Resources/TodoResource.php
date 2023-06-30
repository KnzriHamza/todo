<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TodoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *

     * @return array<string, mixed>
     */
    public static $wrap;
    public function toArray(Request $request): array
    {
        if (!empty($this->category)) {
            return [
                'id' => $this->id,
                'todoTitle' => $this->todoTitle,
                'todoMessage' => $this->todoMessage,
                'todoPriority' => $this->todoPriority,
                'todoDone' => $this->todoDone,
                'todoDate' => $this->todoDate,
                'categoryId' => $this->category->id,
                'categoryName' => $this->category->categoryName,
                'categoryColor' => $this->category->categoryColor,
                'categoryIcon' => $this->category->categoryIcon,
            ];
        } else {
            return [
                'id' => $this->id,
                'todoTitle' => $this->todoTitle,
                'todoMessage' => $this->todoMessage,
                'todoPriority' => $this->todoPriority,
                'todoDone' => $this->todoDone,
                'todoDate' => $this->todoDate,
                'categoryId' => 0,
                'categoryName' => "Uncategorized",
                'categoryColor' => "muted",
                'categoryIcon' => "bolt",
            ];
        }
    }
}