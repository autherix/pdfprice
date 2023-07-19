import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    useLocation,
} from "react-router-dom";
import { UserContext } from "./components/contexts/UserContext";
import RegisterForm from "./components/routes/RegisterForm";
import LoginForm from "./components/routes/LoginForm";
import Home from "./components/routes/Home";
import About from "./components/routes/About";
import NotFound from "./components/routes/NotFound";
import Logout from "./components/routes/Logout";
import { MyNavbar } from "./components/navbar";
import auth from "./components/services/authService";
import utils from "./components/utils";
import Dashboard from "./components/routes/dashboard/Dashboard";
import ProtectedRoute from "./components/routes/protectedRoutes";
import "bootstrap/dist/css/bootstrap.min.css";
import "./components/styles/App.scss";

function App() {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const user = auth.getCurrentUser();
        setUser(user);
    }, []);
    
    const AppTitle = () => {
        const { pathname } = useLocation();
        utils.useAppTitle(pathname);
    };

    return (
        <div className="App">
            <Router>
                <AppTitle />
                <MyNavbar />
                <AppContent />
            </Router>
        </div>
    );
}

function AppContent() {
    return (
        <Routes>
            <Route
                path="dashboard"
                element={
                    <ProtectedRoute redirectPath="/login">
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
            <Route path="register" element={<RegisterForm />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="logout" element={<Logout />} />
            <Route path="about" element={<About />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
