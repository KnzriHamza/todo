import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";
import { greetings } from "../utils.js";
import { Link } from "react-router-dom";
import TodoCard from "../components/TodoCard.jsx";
import {
    IconArrowsSort,
    IconSortAscending2,
    IconSortDescending2,
    IconPlus,
} from "@tabler/icons-react";
import TodoAddModal from "../components/TodoAddModal.jsx";

export default function Dashboard() {
    const { user } = useStateContext();
    const [todayTodos, setTodayTodos] = useState([]);
    const [tomorrowTodos, setTomorrowTodos] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [todoCategories, setTodoCategories] = useState([]);
    const [sortBy, setSortBy] = useState("todoDone");
    const [orderBy, setOrderBy] = useState("asc");

    useEffect(() => {
        getTodoCategories();
        getTodos();
    }, []);

    const getTodoCategories = () => {
        setLoading(true);
        axiosClient
            .get("/todoCategories")

            .then(({ data }) => {
                setLoading(false);
                console.log(data);

                setTodoCategories(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const getTodos = (sort_by = "todoDone", order_by = "asc") => {
        setLoading(true);
        axiosClient
            .get(
                `/todos?view=dashboard&sort_by=${sort_by}&order_by=${order_by}`
            )
            .then(({ data }) => {
                setLoading(false);
                console.log(data);

                setTodayTodos(data.today);
                setTomorrowTodos(data.tomorrow);
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
                        <h2 className="page-title">{greetings(user.name)}</h2>
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
            {loading ? (
                <div className="container-xl text-center">
                    <div className="spinner-grow" role="status"></div>
                </div>
            ) : (
                <div className="page-body">
                    <section>
                        <div className="container-xl">
                            <div className="row g-2 align-items-center">
                                <div className="col">
                                    <h2 className="page-title">Today</h2>
                                </div>
                            </div>
                            <div className="page-body">
                                <div className="container-xl">
                                    <div className="row row-cards">
                                        <div className="col-lg-12">
                                            <div className="row row-cards">
                                                {todayTodos.length == 0 ? (
                                                    <div className="empty">
                                                        <p className="empty-title">
                                                            No todos for Today
                                                        </p>
                                                        <p className="empty-subtitle text-muted">
                                                            What do you need to
                                                            get done today?
                                                        </p>
                                                    </div>
                                                ) : (
                                                    todayTodos.map((todo) => (
                                                        <TodoCard
                                                            todo={todo}
                                                            todoCategories={
                                                                todoCategories
                                                            }
                                                            getTodos={getTodos}
                                                        />
                                                    ))
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="container-xl">
                            <div className="row g-2 align-items-center">
                                <div className="col">
                                    <h2 className="page-title">Tomorrow</h2>
                                </div>
                            </div>
                            <div className="page-body">
                                <div className="container-xl">
                                    <div className="row row-cards">
                                        <div className="col-lg-12">
                                            <div className="row row-cards">
                                                {tomorrowTodos.length == 0 ? (
                                                    <div className="empty">
                                                        <p className="empty-title">
                                                            No todos for
                                                            Tomorrow
                                                        </p>
                                                        <p className="empty-subtitle text-muted">
                                                            What do you need to
                                                            get done tomorrow?
                                                        </p>
                                                    </div>
                                                ) : (
                                                    tomorrowTodos.map(
                                                        (todo) => (
                                                            <TodoCard
                                                                todo={todo}
                                                                todoCategories={
                                                                    todoCategories
                                                                }
                                                                getTodos={
                                                                    getTodos
                                                                }
                                                            />
                                                        )
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            )}
            <TodoAddModal
                isOpen={isAddModalOpen}
                setIsOpen={setIsAddModalOpen}
                getTodos={getTodos}
            />
        </div>
    );
}
