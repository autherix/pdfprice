import utils from "../utils";
import auth from "../services/authService";

const Logout = () => {

    auth.logout();

    utils.ShowAlertBox({ alertTypeClass: "alert-success", message: `Successfully logged out, redirecting to home page in a few seconds` });

    // redirect to home page after 7 seconds
    setTimeout(() => {
        window.location.href = "/";
    }, 3000);

    return null;
}

export default Logout;