const User = require("../models/User");
const jwt = require("jsonwebtoken");

const userController = {
    upload: async (req, res) => {
        // console.log(req);
        try {
            // Check if the request content type is not multipart/form-data
            if (!req.is("multipart/form-data")) {
                return res.status(400).json({ message: "Bad request" });
            } else {
                // Print all files and key-value pairs
                console.log(req.files);
                console.log(req.body);
                return res.status(200).json({ message: "OK", files: req.files });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server Error" });
        }
    },
    dashboard: async (req, res) => {
        try {
            // Read x-auth-token header, if it doesn't exist, return 401
            const token = req.header("x-auth-token");
            if (!token) {
                return res
                    .status(401)
                    .json({ message: "No token, authorization denied" });
            }
            // first get user data inside the token and print it, without verifying, just read it
            const decoded_raw = jwt.decode(token);
            // if decoded_raw is null or undefined or not a valid json object, return 401
            if (
                !decoded_raw ||
                typeof decoded_raw !== "object" ||
                Object.keys(decoded_raw).length === 0
            ) {
                return res.status(401).json({ message: "Token is not valid" });
            }
            console.log("decoded_raw: ", decoded_raw);
            // look up the user in the database based on the decoded_raw.user.id
            real_user = await User.findById(decoded_raw.id);
            // if the user is not found, return 401
            if (!real_user) {
                return res.status(401).json({ message: "Token is not valid" });
            }
            console.log("real_user: ", real_user);
            // if the user is found, now verify the token with the secret key from user object found in the database
            const decoded = jwt.verify(token, real_user.jwtSecret);
            console.log("decoded: ", decoded);
            // console.log("decoded len: ", Object.keys(decoded).length);
            // console.log("decoded_raw len: ", Object.keys(decoded_raw).length);
            // console.log("type of decoded is: ", typeof decoded, " and type of decoded_raw is: ", typeof decoded_raw);
            // if stringified decoded is equal to decoded_raw, then the token is valid
            if (JSON.stringify(decoded) === JSON.stringify(decoded_raw)) {
                res.status(200).json({ message: "Token is valid" });
                console.log("Token is valid");
            } else {
                res.status(401).json({ message: "Token is not valid" });
                console.log("Token is not valid");
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server Error" });
        }
    },
    getUsers: async (req, res) => {
        try {
            // x-auth-token header is required to get here
            const users = await User.find();
            res.json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server Error" });
        }
    },
};

module.exports = userController;
