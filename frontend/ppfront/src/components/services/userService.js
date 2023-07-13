import http from "./httpService";
// import { apiUrl } from "../config.json";

// const signupUrl = apiUrl + "/auth/signup";

const signupUrl = "http://65.108.220.54:5001/api/auth/signup";
const loginUrl = "http://65.108.220.54:5001/api/auth/login";

export function register(user) {
    return http.post(signupUrl, {
        email: user.email,
        password: user.password,
        name: user.name,
    });
}

export function login(user) {
    return http.post(loginUrl, {
        email: user.email,
        password: user.password,
    });
}
