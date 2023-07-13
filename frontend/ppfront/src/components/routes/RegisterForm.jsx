import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/RegLogForm.css';
import * as userService from "../services/userService"

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
        const alertBox = document.createElement("div");
        alertBox.classList.add("alert", "alert-danger");
        alertBox.innerHTML = "Please fill all fields";
        document.body.appendChild(alertBox);
        setTimeout(() => {
            alertBox.remove();
        }, 10000);
        return;
    }
    const user = {
        name: name,
        email: email,
        password: password
    };
    // Perform registration request and handle response
    try {
        const response = await userService.register(user);
        const alertBox = document.createElement("div");
        alertBox.classList.add("alert", "alert-success");
        
        // select token from response, parsing it as json
        const token = response.data.token;

        // add token to user object, remove password from user object and save user object to local storage
        user.token = token;
        delete user.password;
        localStorage.setItem("user", JSON.stringify(user));
        
        alertBox.innerHTML = `Successfully signed in as ${email}, redirecting to dashboard in a few seconds`;
        document.body.appendChild(alertBox);
        // clear all input fields
        setName(""); setEmail(""); setPassword("");
        setTimeout(() => {
            alertBox.remove();
        }, 5000);
        // redirect to home page after 7 seconds
        setTimeout(() => {
            window.location.href = "/";
        }, 7000);
    }
    catch (ex) {
        if (ex.response && ex.response.status === 400) {
            const errorMessage = ex.response.data.message;
            const alertBox = document.createElement("div");
            alertBox.classList.add("alert", "alert-danger");
            alertBox.innerHTML = "Error message from server: " + errorMessage;
            document.body.appendChild(alertBox);
            setTimeout(() => {
                alertBox.remove();
            } , 5000);
            // clear password input
            setPassword("");
            // remove user object from local storage if it exists
            localStorage.removeItem("user");
        }
    }
};

  return (
    <div className="reglog-form-container">
      <form onSubmit={handleSubmit} className="reglog-form">
        <div className="mb-3">
          <label htmlFor="formName" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="formName"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

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

        <button type="submit" className="btn btn-primary btn-green-glow">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
