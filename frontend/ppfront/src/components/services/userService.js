import http from "./httpService";
// import { apiUrl } from "../config.json";

// const signupUrl = apiUrl + "/auth/signup";

const signupUrl = "https://backend.myhttpaddress.com/api/auth/signup";
// const signupUrl = "http://65.108.220.54:5001/api/auth/signup";
const loginUrl = "https://backend.myhttpaddress.com/api/auth/login";
// const loginUrl = "http://65.108.220.54:5001/api/auth/login";

export async function register(user) {
    const response = await http.post(signupUrl, {
        email: user.email,
        password: user.password,
        name: user.name,
    });
    // select token from response, parsing it as json
    const token = response.data.token;

    // add token to user object, remove password from user object and save user object to local storage
    user.token = token;
    delete user.password;
    localStorage.setItem("user", JSON.stringify(user));
}

export async function login(user) {
    const response = await http.post(loginUrl, {
        email: user.email,
        password: user.password,
    });
    // select token from response, parsing it as json
    const token = response.data.token;

    // add token to user object, remove password from user object and save user object to local storage
    user.token = token;
    delete user.password;
    localStorage.setItem("user", JSON.stringify(user));    
}

export function logout() {
    localStorage.removeItem("user");
    return true;
}