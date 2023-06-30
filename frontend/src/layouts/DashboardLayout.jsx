import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";
import axiosClient from "../axios-client.js";
import { useEffect } from "react";
import { IconHome2 } from "@tabler/icons-react";

export default function DashboardLayout() {
    const { user, token, setUser, setToken } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    const onLogout = (ev) => {
        ev.preventDefault();
        axiosClient.post("/logout").then(() => {
            setUser({});
            setToken(null);
        });
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        document.body.classList.add("layout-boxed");
        document.body.classList.remove("d-flex", "flex-column");
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    }, []);

    return (
        <div id="DashboardLayout">
            <div className="page">
                <header className="navbar-expand-md">
                    <div className="navbar">
                        <div className="container-xl">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link" to="dash/">
                                        <IconHome2 size={22} />
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link"
                                        to="dash/categories"
                                    >
                                        Categories
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="dash/todos">
                                        Todos
                                    </Link>
                                </li>
                            </ul>

                            <div className="my-2 my-md-0 flex-grow-1 flex-md-grow-0 order-first order-md-last">
                                <ul className="navbar-nav">
                                    <li className="nav-item">{user.name}</li>
                                    <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            onClick={onLogout}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="icon"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                stroke-width="2"
                                                stroke="currentColor"
                                                fill="none"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            >
                                                <path
                                                    stroke="none"
                                                    d="M0 0h24v24H0z"
                                                    fill="none"
                                                ></path>
                                                <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
                                                <path d="M9 12h12l-3 -3"></path>
                                                <path d="M18 15l3 -3"></path>
                                            </svg>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="page-wrapper">
                    <div className="page-body">
                        <div className="container-xl">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
