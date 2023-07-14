import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export const ShowAlertBox = ({ alertTypeClass, message, timeout=5000 }) => {
    const alertBoxes = document.querySelectorAll(".alert");
    alertBoxes.forEach(alertBox => {
        alertBox.remove();
    });
    const alertBox = document.createElement("div");
    alertBox.classList.add("alert", alertTypeClass, "fade-in-from-bottom");
    alertBox.innerHTML = message;
    document.body.appendChild(alertBox);
    setTimeout(() => {
        alertBox.remove();
    }, timeout);
}


// await userService.register(user);
// const alertBox = document.createElement("div");
// const alertBoxes = document.querySelectorAll(".alert");
// alertBoxes.forEach(alertBox => {
//     alertBox.remove();
// });
// alertBox.classList.add("alert", "alert-success");

// alertBox.innerHTML = `Successfully signed in as ${email}, redirecting to dashboard in a few seconds`;
// document.body.appendChild(alertBox);
