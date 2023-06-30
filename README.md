## Todo App

Welcome to the Todo App, a simple application built using Laravel and React. This app allows you to manage your tasks and keep track of your to-do list efficiently.

### Demo

Check out the live demo of the todo app: [here](http://194.233.172.81:5174/)

### Features

- Create, update, and delete tasks
- Mark tasks as completed
- Filter tasks based on their completion status
- User-friendly interface
- Seamless integration between Laravel and React


### prerequisitions

Before getting started with the todo app, ensure that you have the following prerequisites installed and configured on your machine:

-    Docker: Install Docker on your system by following the official Docker documentation specific to your operating system. Docker will be used to containerize the Laravel backend and React frontend, making it easier to set up and deploy the application.

-    Node.js and npm: Install Node.js and npm (Node Package Manager) on your machine. These will be used to manage dependencies and run the React frontend.


 

### How to run

To run the App, follow the steps below:

1. Clone this repository to your local machine. You can find instructions on how to clone a repository [here](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository).

2. Install the dependencies. After cloning the repo, navigate to the project directory and run the following commands:

   ```
   composer install
   npm install
   ```

3. Environment Configuration

To configure the environment variables, create a .env file in the backend directory based on the provided .env.example file. Update the values in the .env file to match your specific configuration, do not forget to pinpoint the backend api Endpoint in VITE_API_BASE_URL variable


4. Run the container. In the project directory, run the following command:

   ```
   docker-compose up 

   
   ```

4. Attach to shell and Run the migration using 

   ```
   ./vendor/bin/sail shell

   php artisan migrate
   ```

   Additionally, you may need to compile the assets by running:

   ```
   npm run dev
   ```

   The Todo App will now be accessible at `http://localhost:5174`.

That's it! You can now use the Todo App to manage your tasks and stay organized. Enjoy!
