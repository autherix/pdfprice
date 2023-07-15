import http from "./httpService";
import jwtDecode from "jwt-decode";
// import { apiUrl } from "../config.json";

// const signupUrl = apiUrl + "/auth/signup";

const signupUrl = "https://backend.myhttpaddress.com/api/auth/signup";
const loginUrl = "https://backend.myhttpaddress.com/api/auth/login";

const tokenKey = "token";

http.setJwt(getJwt());

async function register(user) {
    const response = await http.post(signupUrl, {
        email: user.email,
        password: user.password,
        name: user.name,
    });
    const token = response.data.token;

    localStorage.setItem(tokenKey, JSON.stringify(token));
}

async function login(user) {
    const response = await http.post(loginUrl, {
        email: user.email,
        password: user.password,
    });

    // now define user object with response data
    const token = response.data.token;

    localStorage.setItem(tokenKey, JSON.stringify(token));
}

function logout() {
    localStorage.removeItem(tokenKey);
}

function getCurrentUser() {
    try {
        const jwt = getJwt();
        return jwtDecode(JSON.parse(jwt));
    } catch (ex) {
        return null;
    }
}

function getJwt() {
    return localStorage.getItem(tokenKey);
}

const authService = {
    register,
    login,
    logout,
    getCurrentUser,
    getJwt,
};

export default authService;
