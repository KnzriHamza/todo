## Todo App

Welcome to the Todo App, a simple application built using Laravel and React. This app allows you to manage your tasks and keep track of your to-do list efficiently.

<p align="center">
  <img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo">
</p>

<p align="center">
  <a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
  <a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
  <a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
  <a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

### Features

- Create, update, and delete tasks
- Mark tasks as completed
- Filter tasks based on their completion status
- User-friendly interface
- Seamless integration between Laravel and React

### How to run

To run the Todo App, follow the steps below:

1. Clone this repository to your local machine. You can find instructions on how to clone a repository [here](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository).

2. Install the dependencies. After cloning the repo, navigate to the project directory and run the following commands:

   ```
   composer install
   npm install
   ```

3. Run the migration and seed the database. In the project directory, run the following command:

   ```
   php artisan migrate --seed
   ```

4. Start the development server. Use the following command to start the Laravel development server:

   ```
   php artisan serve
   ```

   Additionally, you may need to compile the assets by running:

   ```
   npm run dev
   ```

   The Todo App will now be accessible at `http://localhost:8000`.

That's it! You can now use the Todo App to manage your tasks and stay organized. Enjoy!
