import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { IconPlus } from "@tabler/icons-react";
import TodoCategoryAddModal from "../components/TodoCategoryAddModal.jsx";

export default function TodoCategories() {
    const [todoCategories, setTodoCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        getTodoCategories();
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

    return (
        <div className="page-header d-print-none">
            <div className="container-xl">
                <div className="row g-2 align-items-center">
                    <div className="col">
                        <h2 className="page-title">Categories</h2>
                    </div>
                    <div className="col-auto ms-auto d-print-none">
                        <div className="btn-list">
                            <button
                                className="btn btn-primary w-100"
                                onClick={() => setIsOpen(true)}
                            >
                                <IconPlus className="me-2" size={18} />
                                Add Category
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
                            {todoCategories.length == 0 ? (
                                <div className="empty">
                                    <p className="empty-title">
                                        No categories found
                                    </p>
                                    <p className="empty-subtitle text-muted">
                                        Do you like to create a category?
                                    </p>
                                </div>
                            ) : (
                                todoCategories.map((todoCategory) => (
                                    <div className="col-md-6 col-lg-3">
                                        <Link
                                            to={`/dash/categories/${todoCategory.id}`}
                                        >
                                            <div className="card">
                                                <div className="card-body p-4">
                                                    <span
                                                        className={`form-colorinput-color rounded-circle mb-2 bg-${todoCategory.categoryColor}`}
                                                    ></span>
                                                    <h3 className="m-0 mb-1">
                                                        {
                                                            todoCategory.categoryName
                                                        }
                                                    </h3>
                                                    <div className="text-secondary">
                                                        {`${todoCategory.todos_count} Tasks`}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>
            <TodoCategoryAddModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                getTodoCategories={getTodoCategories}
            />
        </div>
    );
}
