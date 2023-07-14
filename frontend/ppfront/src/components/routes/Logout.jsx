import React from 'react';
import * as utils from "../utils";

const Logout = () => {

    // remove user from local storage
    localStorage.removeItem('user');

    utils.ShowAlertBox({ alertTypeClass: "alert-success", message: `Successfully logged out, redirecting to home page in a few seconds` });

    // redirect to home page after 7 seconds
    setTimeout(() => {
        window.location.href = "/";
    }, 3000);

    return null;
}

export default Logout;