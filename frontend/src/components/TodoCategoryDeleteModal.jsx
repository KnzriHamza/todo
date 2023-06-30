import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { Dialog } from "@headlessui/react";

export default function TodoCategoryDeleteModal(props) {
    const { isOpen, setIsOpen, todoCategory } = props;
    const navigate = useNavigate();

    const onDelete = () => {
        axiosClient.delete("/todoCategories/" + todoCategory.id).then(() => {
            setIsOpen(false);
            navigate("/dash/categories");
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
                className="modal-dialog modal-sm modal-dialog-centered"
            >
                <div className="modal-content">
                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => setIsOpen(false)}
                    ></button>
                    <div className="modal-status bg-danger"></div>

                    <div className="modal-body text-center py-4">
                        <h3>Are you sure?</h3>
                        <div className="text-muted">
                            {todoCategory.todos_count > 0
                                ? `This category has ${todoCategory.todos_count} todos. They will be uncategorized! Do you really want to proceed ${todoCategory.todoTitle}?`
                                : `Do you really want to proceed ${todoCategory.todoTitle}?`}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <div className="w-100">
                            <div className="row">
                                <div className="col">
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="btn w-100"
                                    >
                                        Cancel
                                    </button>
                                </div>
                                <div className="col">
                                    <button
                                        onClick={() => onDelete()}
                                        className="btn btn-danger w-100"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog.Panel>
        </Dialog>
    );
}
