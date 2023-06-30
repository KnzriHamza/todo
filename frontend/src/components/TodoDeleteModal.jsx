import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { Dialog } from "@headlessui/react";

export default function TodoDeleteModal(props) {
    const { isOpen, setIsOpen, todo, getTodos } = props;

    const onDelete = () => {
        axiosClient.delete("/todos/" + todo.id).then(() => {
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
                            Do you really want to remove {todo.todoTitle}?
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
