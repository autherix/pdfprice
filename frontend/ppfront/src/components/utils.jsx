import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import {UserContext} from './contexts/UserContext';
import config from './config';
import 'bootstrap/dist/css/bootstrap.min.css';

const ShowAlertBox = ({ alertTypeClass, message, timeout = 5000 }) => {
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

const NavigateTo = (to, from = window.location.pathname) => {
    const navigate = useNavigate();
    navigate(to, { state: { from: from } });
    return <Navigate to={to} state={{ from: from }} />;
};

const useAppTitle = (pathname) => {
    useEffect(() => {
        if (pathname === '/') {
            document.title = "Home";
        } else {
            const title = pathname.substring(1);
            document.title = title;
        }
    }, [pathname]);
};

const NavigateToDashboardIfLoggedIn = () => {
    const {user} = useContext(UserContext);
    const navigate = useNavigate();
    if (user) {
        const redirectUtl = config.redirectPathAfterLogin;
        navigate(redirectUtl);
    }
};

const utils = {
    ShowAlertBox,
    NavigateTo,
    useAppTitle,
    NavigateToDashboardIfLoggedIn
};

export default utils;