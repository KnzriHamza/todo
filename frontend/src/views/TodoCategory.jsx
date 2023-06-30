import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { Link, useParams } from "react-router-dom";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import TodoAddModal from "../components/TodoAddModal.jsx";
import TodoCard from "../components/TodoCard.jsx";
import TodoCategoryDeleteModal from "../components/TodoCategoryDeleteModal.jsx";

export default function TodoCategory() {
    const { id } = useParams();
    const [category, setCategory] = useState({});
    const [loading, setLoading] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    useEffect(() => {
        getCategory();
    }, []);

    const getCategory = () => {
        setLoading(true);
        axiosClient
            .get("/todoCategories/" + id)
            .then(({ data }) => {
                setLoading(false);
                console.log(data);

                setCategory(data);
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
                        <h2 className="page-title">{category.categoryName}</h2>
                    </div>
                    <div className="col-auto ms-auto d-print-none">
                        <div className="btn-list">
                            <button
                                className="btn btn-outline-red"
                                onClick={() => setIsDeleteModalOpen(true)}
                            >
                                <IconTrash className="me-2" size={18} />
                                Delete Category
                            </button>
                            <button
                                className="btn btn-primary"
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
                        <categoryIcon size={12} />
                        <div className="row row-cards">
                            <div className="datagrid">
                                <div className="datagrid-item">
                                    <div className="datagrid-title">Tasks</div>
                                    <div className="datagrid-content">
                                        {category.todos_count}
                                    </div>
                                </div>
                                <div className="datagrid-item">
                                    <div className="datagrid-title">
                                        Pending Todos
                                    </div>
                                    <div className="datagrid-content">
                                        {category.pending_todos_count}
                                    </div>
                                </div>
                                <div className="datagrid-item">
                                    <div className="datagrid-title">
                                        Done Todos
                                    </div>
                                    <div className="datagrid-content">
                                        {category.done_todos_count}
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="row row-cards">
                                    {typeof category?.todos === "undefined" ||
                                    category.todos.length == 0 ? (
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
                                        category.todos.map((todo) => (
                                            <TodoCard todo={todo} />
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
            />
            <TodoCategoryDeleteModal
                isOpen={isDeleteModalOpen}
                setIsOpen={setIsDeleteModalOpen}
                todoCategory={category}
            />
        </div>
    );
}
