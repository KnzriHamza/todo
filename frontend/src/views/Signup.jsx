import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";

export default function Signup() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const [errors, setErrors] = useState(null);

    const { setUser, setToken } = useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        };
        console.log(payload);
        axiosClient
            .post("/signup", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    };
    return (
        <div className="container container-tight py-4 ">
            <div className="text-center mb-4"></div>
            <div className="card card-md">
                <div className="card-body">
                    <div className="card-header">
                        <h2 className="h2 text-center mb-4">
                            Signup for an Account
                        </h2>
                    </div>
                    <div className={"card-header"}>
                        {errors && (
                            <div>
                                {Object.keys(errors).map((key) => (
                                    <p key={key}>{errors[key][0]}</p>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="card-body">
                        <form onSubmit={onSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Full Name</label>
                                <input
                                    ref={nameRef}
                                    className="form-control"
                                    placeholder="John Doe"
                                    autoComplete="off"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">
                                    Email address
                                </label>
                                <input
                                    ref={emailRef}
                                    type="email"
                                    className="form-control"
                                    placeholder="your@email.com"
                                    autoComplete="off"
                                />
                            </div>

                            <div className="mb-2">
                                <label className="form-label">Password</label>
                                <input
                                    ref={passwordRef}
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    autoComplete="off"
                                />
                            </div>
                            <div className="mb-2">
                                <input
                                    ref={passwordConfirmationRef}
                                    type="password"
                                    className="form-control"
                                    placeholder="Password Confirmation"
                                    autoComplete="off"
                                />
                            </div>
                            <div className="card-footer">
                                <button className="btn btn-primary w-100">
                                    Signup
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="hr-text">Or</div>
                <div className="card-body">
                    <div className="row">
                        <div className="col">
                            <Link className="nav-link btn w-100" to="/login">
                                Login to an existing Account
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center mb-4"></div>
        </div>
    );
}
