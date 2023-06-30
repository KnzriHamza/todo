<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTodoRequest;
use App\Http\Requests\UpdateTodoRequest;
use App\Http\Resources\TodoResource;
use Illuminate\Http\Request;
use App\Models\Todo;
use Carbon\Carbon;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = auth()->user()->todos()->with('category');

        if ($request->query('sort_by')) {
            $sort = $request->query('sort_by');
            $order = $request->query('order_by', 'asc');
            $query->orderBy("todoDone", "asc");
            $query->orderBy($sort, $order);
        }

        if ($view = $request->query('view')) {
            if ($view == "dashboard") {
                $tomorrow = $query->whereDate("todoDate", Carbon::tomorrow("Europe/Berlin"))->get();
                $query = auth()->user()->todos()->with('category');
                $today = $query->whereDate("todoDate", Carbon::today("Europe/Berlin"))->get();
                return [
                    "today" => TodoResource::collection($today),
                    "tomorrow" => TodoResource::collection($tomorrow)
                ];
            }
        }
        $result = $query->get();

        return TodoResource::collection($result);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTodoRequest $request)
    {
        $todo = new Todo;
        $todo->user_id = auth()->user()->id;
        $todo->todoTitle = $request->todoTitle;
        $todo->todoMessage = $request->todoMessage;
        $todo->todoDate = $request->todoDate;
        $todo->todoPriority = $request->todoPriority;
        $todo->todo_category_id = $request->category_id;
        $todo->save();

        return new TodoResource($todo);
    }

    /**
     * Display the specified resource.
     */
    public function show(Todo $todo)
    {
        $response = auth()->user()->todos()->with('category')->find($todo->id);

        return new TodoResource($response);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTodoRequest $request, Todo $todo)
    {
        $data = $request->validated();
        if (!empty($request->category_id)) {
            $todo->todo_category_id = $request->category_id;
        }
        $todo->update($data);

        return new TodoResource($todo);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Todo $todo)
    {
        $todo->delete();

        return response("{}", 204);
    }
}