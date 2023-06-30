import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import {
    IconArrowsSort,
    IconSortAscending2,
    IconSortDescending2,
    IconPlus,
} from "@tabler/icons-react";
import TodoCard from "../components/TodoCard.jsx";
import TodoAddModal from "../components/TodoAddModal.jsx";

export default function Todos() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [sortBy, setSortBy] = useState("todoDone");
    const [orderBy, setOrderBy] = useState("asc");

    useEffect(() => {
        getTodos(sortBy, orderBy);
    }, []);

    const getTodos = (sort_by = "todoDone", order_by = "asc") => {
        setLoading(true);
        axiosClient
            .get(`/todos?sort_by=${sort_by}&order_by=${order_by}`)
            .then(({ data }) => {
                setLoading(false);
                console.log(data);

                setTodos(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    return (
        <div className="page-header d-print-none">
            <div className="container-xl">
                <div className="row g-2 align-items-center">
                    <div className="col">
                        <h2 className="page-title">Todos</h2>

                        <div className="row mt-1 g-2 align-items-center text-muted">
                            <div className="col-auto cursor-pointer">
                                <h4
                                    className={
                                        sortBy != "todoPriority"
                                            ? "opacity-75"
                                            : ""
                                    }
                                    onClick={() => {
                                        setSortBy("todoPriority");
                                        setOrderBy(
                                            orderBy == "asc" ? "desc" : "asc"
                                        );
                                        getTodos(
                                            "todoPriority",
                                            orderBy == "asc" ? "desc" : "asc"
                                        );
                                    }}
                                >
                                    <span className="me-1">Priority</span>
                                    {sortBy != "todoPriority" ? (
                                        <>
                                            <IconArrowsSort size={17} />
                                        </>
                                    ) : orderBy == "asc" ? (
                                        <IconSortAscending2 size={17} />
                                    ) : (
                                        <IconSortDescending2 size={17} />
                                    )}
                                </h4>
                            </div>
                            <div className="col-auto cursor-pointer">
                                <h4
                                    className={
                                        sortBy != "todoDate" ? "opacity-75" : ""
                                    }
                                    onClick={() => {
                                        setSortBy("todoDate");
                                        setOrderBy(
                                            orderBy == "asc" ? "desc" : "asc"
                                        );
                                        getTodos(
                                            "todoDate",
                                            orderBy == "asc" ? "desc" : "asc"
                                        );
                                    }}
                                >
                                    <span className="me-1">Due Date</span>
                                    {sortBy != "todoDate" ? (
                                        <>
                                            <IconArrowsSort size={17} />
                                        </>
                                    ) : orderBy == "asc" ? (
                                        <IconSortAscending2 size={17} />
                                    ) : (
                                        <IconSortDescending2 size={17} />
                                    )}
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-auto ms-auto d-print-none">
                        <div className="btn-list">
                            <button
                                className="btn btn-primary w-100"
                                onClick={() => setIsAddModalOpen(true)}
                            >
                                <IconPlus className="me-2" size={18} />
                                Add Todo
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="page-body">
                {loading ? (
                    <div className="container-xl text-center">
                        <div className="spinner-grow" role="status"></div>
                    </div>
                ) : (
                    <div className="container-xl">
                        <div className="row row-cards">
                            <div className="col-lg-12">
                                <div className="row row-cards">
                                    {todos.length == 0 ? (
                                        <div className="empty">
                                            <p className="empty-title">
                                                No todos found
                                            </p>
                                            <p className="empty-subtitle text-muted">
                                                What do you need to get done
                                                today?
                                            </p>
                                        </div>
                                    ) : (
                                        todos.map((todo) => (
                                            <TodoCard
                                                todo={todo}
                                                getTodos={getTodos}
                                            />
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <TodoAddModal
                isOpen={isAddModalOpen}
                setIsOpen={setIsAddModalOpen}
                getTodos={getTodos}
            />
        </div>
    );
}
