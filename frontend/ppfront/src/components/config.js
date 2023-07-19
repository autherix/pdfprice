const apiUrl = "http://65.108.220.54:5001/api";
const apiEndpoints = {
    signupEndpoint: "/auth/signup",
    loginEndpoint: "/auth/login",
};

const redirectPathAfterLogin = "/dashboard";

const redirectPathUnauthenticated = "/login";

const config = {
    apiUrl,
    apiEndpoints,
    redirectPathAfterLogin,
    redirectPathUnauthenticated,
};

export default config;