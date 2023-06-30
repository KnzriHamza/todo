import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { colors, icons } from "../constants.jsx";
import { Dialog, RadioGroup } from "@headlessui/react";

export default function TodoCategoryAddModal(props) {
    const { isOpen, setIsOpen, getTodoCategories } = props;
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedIcon, setSelectedIcon] = useState("");

    const onSubmit = (ev) => {
        ev.preventDefault();
        const form = ev.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        axiosClient
            .post("/todoCategories", {
                categoryName: formJson.name,
                categoryColor: selectedColor,
                categoryIcon: selectedIcon,
            })
            .then(() => {
                setIsOpen(false);
                getTodoCategories();
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
                className="modal-dialog modal-md modal-dialog-centered"
            >
                <div className="modal-content">
                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => setIsOpen(false)}
                    ></button>
                    <Dialog.Title as="div" className="modal-header">
                        Add a Category
                    </Dialog.Title>
                    <div className="modal-body">
                        <form onSubmit={onSubmit}>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <label className="form-label required">
                                            Name
                                        </label>
                                        <div>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="name"
                                                placeholder="Name"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Color
                                        </label>
                                        <RadioGroup
                                            value={selectedColor}
                                            onChange={setSelectedColor}
                                        >
                                            {colors.map((color) => (
                                                <label className="form-colorinput list-inline-item">
                                                    <RadioGroup.Option
                                                        value={color}
                                                    >
                                                        {({ checked }) => (
                                                            <span
                                                                className={`form-colorinput-color bg-${color} ${
                                                                    checked
                                                                        ? "checked"
                                                                        : ""
                                                                }`}
                                                            ></span>
                                                        )}
                                                    </RadioGroup.Option>
                                                </label>
                                            ))}
                                        </RadioGroup>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Icon
                                        </label>
                                        <RadioGroup
                                            value={selectedIcon}
                                            onChange={setSelectedIcon}
                                        >
                                            {Object.entries(icons).map(
                                                ([iconName, icon]) => {
                                                    const Icon = icon;
                                                    return (
                                                        <label className="form-colorinput list-inline-item">
                                                            <RadioGroup.Option
                                                                value={iconName}
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
                            </div>
                            <div className="card-footer text-end">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Dialog.Panel>
        </Dialog>
    );
}
