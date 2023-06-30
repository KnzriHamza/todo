<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('todos', function (Blueprint $table) {
            $table->id();
            $table->string('todoTitle');
            $table->string('todoMessage');
            $table->string('todoPriority');
            $table->boolean('todoDone')->default(false);
            $table->dateTime('todoDate', $precision = 0);
            $table->foreignIdFor(\App\Models\User::class);
            $table->foreignIdFor(\App\Models\TodoCategory::class);
            $table->string('sharedWith')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('todos');
    }
};