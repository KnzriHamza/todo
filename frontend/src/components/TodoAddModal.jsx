import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { Dialog, RadioGroup } from "@headlessui/react";
import { priorities } from "../constants.jsx";
import Datetime from "react-datetime";
import moment from "moment";

export default function TodoAddModal(props) {
    const { isOpen, setIsOpen, getTodos } = props;
    const [todoCategories, setTodoCategories] = useState([]);
    const [selectedPriority, setSelectedPriority] = useState("lowest");
    const [selectedDatetime, setSelectedDatetime] = useState(moment());

    useEffect(() => {
        getTodoCategories();
    }, []);

    const getTodoCategories = () => {
        axiosClient.get("/todoCategories").then(({ data }) => {
            console.log(data);
            setTodoCategories(data.data);
        });
    };

    const onSubmit = (ev) => {
        ev.preventDefault();
        const form = ev.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        axiosClient
            .post("/todos", {
                todoTitle: formJson.title,
                todoMessage: formJson.description,
                todoDate: selectedDatetime.format("YYYY-MM-DD HH:mm:d"),
                todoPriority: selectedPriority,
                category_id: formJson.category,
            })
            .then(() => {
                setIsOpen(false);
                getTodos();
            });
    };

    return (
        <Dialog
            as="div"
            className="modal d-lg-block"
            open={isOpen}
            onClose={() => setIsOpen(false)}
        >
            <div className="modal-backdrop show" />
            <Dialog.Panel
                as="div"
                className="modal-dialog modal-lg modal-dialog-centered"
            >
                <div className="modal-content">
                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => setIsOpen(false)}
                    ></button>
                    <Dialog.Title as="div" className="modal-header">
                        Add a Todo
                    </Dialog.Title>
                    <div className="modal-body">
                        <form onSubmit={onSubmit}>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <label className="form-label required">
                                            Title
                                        </label>
                                        <div>
                                            <input
                                                type="text"
                                                name="title"
                                                className="form-control"
                                                placeholder="Todo"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Description
                                        </label>
                                        <div>
                                            <textarea
                                                className="form-control"
                                                placeholder="Description"
                                                name="description"
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Categories
                                        </label>
                                        <div>
                                            <select
                                                className="form-select"
                                                name="category"
                                            >
                                                {todoCategories.length > 0 ? (
                                                    todoCategories.map(
                                                        (todoCategory) => (
                                                            <option
                                                                value={
                                                                    todoCategory.id
                                                                }
                                                            >
                                                                {
                                                                    todoCategory.categoryName
                                                                }
                                                            </option>
                                                        )
                                                    )
                                                ) : (
                                                    <option value="0">
                                                        Uncategorized
                                                    </option>
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Due Date
                                        </label>
                                        <Datetime
                                            closeOnSelect
                                            value={selectedDatetime}
                                            onChange={setSelectedDatetime}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Priority
                                        </label>
                                        <RadioGroup
                                            value={selectedPriority}
                                            onChange={setSelectedPriority}
                                        >
                                            {Object.entries(priorities).map(
                                                ([priorityName, priority]) => {
                                                    const Icon = priority.icon;
                                                    return (
                                                        <label className="form-colorinput list-inline-item">
                                                            <RadioGroup.Option
                                                                value={
                                                                    priorityName
                                                                }
                                                            >
                                                                {({
                                                                    checked,
                                                                }) => (
                                                                    <span
                                                                        className={`form-selectgroup-label ${
                                                                            checked
                                                                                ? "checked"
                                                                                : ""
                                                                        }`}
                                                                    >
                                                                        <Icon
                                                                            size={
                                                                                18
                                                                            }
                                                                        />
                                                                        {
                                                                            priorityName
                                                                        }
                                                                    </span>
                                                                )}
                                                            </RadioGroup.Option>
                                                        </label>
                                                    );
                                                }
                                            )}
                                        </RadioGroup>
                                    </div>
                                </div>
                                <div className="card-footer text-end">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Add Todo
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Dialog.Panel>
        </Dialog>
    );
}
