import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/RegLogForm.css';
import auth from "../services/authService"
import utils from "../utils";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email === "" || password === "") {
            utils.ShowAlertBox({ alertTypeClass: "alert-danger", message: "Please fill all fields" });
            return;
        }
        // Perform login request and handle response
        const user = {
            email: email,
            password: password
        };
        try {
            await auth.login(user);
            utils.ShowAlertBox({ alertTypeClass: "alert-success", message: `Successfully signed in as ${email}, redirecting to dashboard in a few seconds` });

            // clear all input fields
            setEmail(""); setPassword("");

            // redirect to home page after 7 seconds
            setTimeout(() => {
                window.location.href = "/";
            }, 5000);
        }
        catch (ex) {
            let errorMessage = "Error";
            if (ex.response) {
                errorMessage = ex.response.data.message;
                if (!ex.response.status === 401) {
                    errorMessage = "There is a problem with the server, please try again later";
                }
                errorMessage = "Error message from server: " + errorMessage;
            } else {
                errorMessage = "Server is not resolved, please try again later";
            }
            utils.ShowAlertBox({ alertTypeClass: "alert-danger", message: errorMessage });
            
            // clear password input
            setPassword("");
            // logout user
            auth.logout();            
        }

    };



    return (
        <div className="reglog-form-container">
            <form onSubmit={handleSubmit} className="reglog-form">
                <div className="mb-3">
                    <label htmlFor="formEmail" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="formEmail"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="formPassword" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="formPassword"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary btn-green-glow">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
