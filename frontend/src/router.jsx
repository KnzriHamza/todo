import { createBrowserRouter, Navigate } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout.jsx";
import AuthLayout from "./layouts/AuthLayout.jsx";
import Login from "./views/Login.jsx";
import Signup from "./views/Signup.jsx";
import NotFound from "./views/NotFound.jsx";
import Dashboard from "./views/Dashboard.jsx";
import TodoCategories from "./views/TodoCategories.jsx";
import Todos from "./views/Todos.jsx";
import TodoCategory from "./views/TodoCategory.jsx";

const router = createBrowserRouter([
    // Dashboard Routes
    {
        path: "/",
        element: <DashboardLayout />,
        children: [
            {
                path: "dash/",
                element: <Dashboard />,
            },
            {
                path: "dash/categories",
                element: <TodoCategories />,
            },
            {
                path: "dash/categories/:id",
                element: <TodoCategory />,
            },
            {
                path: "dash/todos",
                element: <Todos />,
            },
        ],
    },

    // Authentification Routes
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
