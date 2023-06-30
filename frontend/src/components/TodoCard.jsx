import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { Link } from "react-router-dom";
import {
    IconTrash,
    IconShare,
    IconPencil,
    IconCalendarDue,
} from "@tabler/icons-react";
import TodoModal from "../components/TodoModal.jsx";
import TodoDeleteModal from "../components/TodoDeleteModal.jsx";
import { priorities, icons } from "../constants.jsx";
import moment from "moment";

export default function TodoCard(props) {
    const { todo, getTodos } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [done, setDone] = useState(todo.todoDone);
    const IconPriority = priorities[todo.todoPriority].icon;
    const IconCategory = icons[todo.categoryIcon];

    const setTodoDone = () => {
        let doneValue = done == 1 ? 0 : 1;
        axiosClient
            .put("/todos/" + todo.id, {
                todoDone: doneValue,
            })
            .then(() => {
                setDone(doneValue);
            });
    };

    return (
        <>
            <div className={`card ${done == 1 ? "bg-muted-lt" : ""}`}>
                <div className="card-body">
                    <div className="row align-items-center">
                        <div className="col-auto">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={done}
                                onChange={() => setTodoDone()}
                            />
                        </div>
                        <div className="col">
                            <label className="form-check mb-0">
                                <h3
                                    className={`mb-0 ${
                                        done == 1
                                            ? "text-decoration-line-through"
                                            : ""
                                    }`}
                                >
                                    {todo.todoTitle}
                                </h3>
                                <div className="text-secondary">
                                    {todo.todoMessage}
                                </div>
                            </label>
                        </div>
                        <div className="col-auto">
                            <Link to={`/dash/categories/${todo.categoryId}`}>
                                <span
                                    className={`col-auto badge align-items-center bg-${todo.categoryColor}-lt`}
                                >
                                    <IconCategory size={12} className="me-1" />
                                    {todo.categoryName}
                                </span>
                            </Link>
                        </div>
                        <div className="col-auto">
                            <span
                                className={`col-auto badge badge-outline text-${
                                    priorities[todo.todoPriority].color
                                }`}
                            >
                                <IconPriority size={12} />
                            </span>
                        </div>
                        <div className="col-auto link-warning align-items-center">
                            <IconCalendarDue size={24} />
                            {moment(todo.todoDate).calendar(null, {
                                sameDay: "[Today]",
                                nextDay: "[Tomorrow]",
                                nextWeek: "dddd",
                                lastDay: "[Yesterday]",
                                lastWeek: "[Last] dddd",
                                sameElse: "DD/MM/YYYY",
                            })}
                        </div>
                        <div className="col-auto text-muted">
                            <button
                                className="switch-icon text-muted switch-icon-scale"
                                onClick={() => setIsModalOpen(true)}
                            >
                                <IconPencil size={24} />
                            </button>
                        </div>
                        <div className="col-auto">
                            <button
                                className="switch-icon text-muted switch-icon-scale"
                                onClick={() => setIsDeleteModalOpen(true)}
                            >
                                <IconTrash size={24} />
                            </button>
                        </div>
                        <div className="col-auto">
                            <button className="switch-icon text-muted switch-icon-scale">
                                <IconShare size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <TodoModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                todo={todo}
                getTodos={getTodos}
            />
            <TodoDeleteModal
                isOpen={isDeleteModalOpen}
                setIsOpen={setIsDeleteModalOpen}
                todo={todo}
                getTodos={getTodos}
            />
        </>
    );
}
