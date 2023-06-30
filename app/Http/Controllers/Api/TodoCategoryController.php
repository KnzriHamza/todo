<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateTodoRequest;
use App\Http\Resources\TodoResource;
use App\Models\TodoCategory;
use Illuminate\Http\Request;
use App\Http\Resources\TodoCategoryResource;
use Illuminate\Database\Eloquent\Builder;

class TodoCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $response = auth()->user()->todoCategories()->withCount('todos')->get();

        return TodoCategoryResource::collection($response);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $todoCategory = new TodoCategory;
        $todoCategory->user_id = auth()->user()->id;
        $todoCategory->categoryName = $request->categoryName;
        $todoCategory->categoryColor = $request->categoryColor;
        $todoCategory->categoryIcon = $request->categoryIcon;
        $todoCategory->save();

        return new TodoCategoryResource($todoCategory);
    }

    /**
     * Display the specified resource.
     */
    public function show(TodoCategory $todoCategory)
    {
        $response = auth()->user()->todoCategories()->with('todos')->withCount([
            'todos',
            'todos as pending_todos_count' => function (Builder $query) {
                $query->where('todoDone', false);
            },
            'todos as done_todos_count' => function (Builder $query) {
                $query->where('todoDone', true);
            },
        ])->find($todoCategory->id);

        return new TodoCategoryResource($response);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTodoRequest $request, TodoCategory $todoCategory)
    {
        $data = $request->validated();
        $todoCategory->update($data);

        return new TodoCategoryResource($todoCategory);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TodoCategory $todoCategory)
    {
        $todoCategory->delete();

        return response("{}", 204);
    }
}