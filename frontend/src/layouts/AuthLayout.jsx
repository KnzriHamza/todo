import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";
import { useEffect } from "react";

export default function AuthLayout() {
    const { token } = useStateContext();

    useEffect(() => {
        document.body.classList.add("d-flex", "flex-column");
        document.body.classList.remove("layout-boxed");
    });

    if (token) {
        return <Navigate to="/" />;
    }
    return (
        <div className="page page-center">
            <Outlet />
        </div>
    );
}
