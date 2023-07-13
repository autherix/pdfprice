import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    useLocation,
    useNavigate,
} from "react-router-dom";
import "./components/rootComponents/App.css";
import RegisterForm from "./components/routes/RegisterForm";
import LoginForm from "./components/routes/LoginForm";
import Home from "./components/routes/Home.jsx";
import About from "./components/routes/About.jsx";
import NotFound from "./components/routes/NotFound.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarHead from "./components/navbar.jsx";
import { TransitionGroup, CSSTransition } from "react-transition-group";

function App() {
    return (
        <div className="App">
            <h3>PDF Price</h3>
            <Router>
                <NavbarHead />
                <AppContent />
            </Router>
        </div>
    );
}

function AppContent() {
    const location = useLocation();
    useEffect(() => {
        let c_pathname = location.pathname;
        if (c_pathname === "/") {
            document.title = "pdfprice";
        } else if (c_pathname.charAt(0) === "/") {
            c_pathname = c_pathname.slice(1);
            document.title = `pdfprice - ${c_pathname}`;
        } else {
            document.title = "pdfprice";
        }
    }, [location]);
    return (
        <Routes>
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/about" element={<About />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NavigateToNotFound />} />
        </Routes>
    );
}

function NavigateToNotFound() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/not-found");
    }, [navigate]);

    return null;
}

export default App;
