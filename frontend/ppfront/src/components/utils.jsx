import 'bootstrap/dist/css/bootstrap.min.css';

const ShowAlertBox = ({ alertTypeClass, message, timeout=5000 }) => {
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

export default {
    ShowAlertBox,
};