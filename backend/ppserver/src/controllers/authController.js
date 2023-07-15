const bcrypt = require("bcrypt");
const User = require("../models/User");
const validateRequest = require("../utils/validateRequest");
const { generateJwtSecret, generateToken } = require("../utils/secretUtils");

const registerUser = async (name, email, password) => {
    try {
        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return { success: false, message: "Email already exists" };
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create a jwtSecret for the user
        const jwtSecret = generateJwtSecret();

        // Create a new user
        const newUser = new User({
            email: email,
            password: hashedPassword,
            name: name,
            jwtSecret: jwtSecret,
            isAdmin: false,
            isActive: false,
        });

        // Save the user to the database
        await newUser.save();
        
        console.log("newUser: ", newUser);

        // Generate a JWT token for the newUser
        const token = await generateToken(newUser);

        console.log("token: ", token);

        return { success: true, token };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "An error occurred while registering the user",
        };
    }
};

const loginUser = async (email, password) => {
    try {
        invalidCredsMsg = "Invalid email or password";
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return { success: false, message: invalidCredsMsg };
        }
        
        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return { success: false, message: invalidCredsMsg };
        }

        // Generate a token for user
        const token = await generateToken(user);
        
        return { success: true, token };
    } catch (error) {
        console.error(error);
        return { success: false, message: "An error occurred while logging in the user" };
    }
};


const authController = {
    signup: async (req, res) => {
        try {
            // validate the request
            const allowedMethods = ["POST"];
            const parameterInfo = {};
            const headerInfo = {};
            const bodyInfo = {
                maxSize: 1000,
                allowedContentTypes: [
                    "application/json",
                    "application/x-www-form-urlencoded",
                ],
                fields: {
                    name: {
                        required: true,
                        maxLength: 50,
                        // allowedCharacters: a-z A-Z 0-9 and space
                        allowedCharacters: /^[A-Za-z ]+$/,
                    },
                    email: {
                        required: true,
                        maxLength: 100,
                        // allowedCharacters: a-z A-Z 0-9 - _ . @
                        allowedCharacters: /^[A-Za-z0-9\-_.@]+$/,
                    },
                    password: {
                        required: true,
                        maxLength: 100,
                        // allowedCharacters: a-z A-Z 0-9 - _ . @ ! # $ % ^ & * ( ) + = { } [ ] | \ : ; " ' < > , ? / ~ `
                        allowedCharacters:
                            /^[A-Za-z0-9\-_.@!#$%^&*()+={}\[\]|\\:;\"'<>,?/~`]+$/,
                    },
                },
            };
            const validationResult = validateRequest(
                req,
                allowedMethods,
                parameterInfo,
                headerInfo,
                bodyInfo
            );
            if (validationResult["valid"] === false) {
                console.log("validationResult: ", validationResult);
                return res
                    .status(400)
                    .json({ message: validationResult["message"] });
            } else {
                console.log("request body: ", req.body);
            }

            const { name, email, password } = req.body;

            // use registerUser function to register the user
            const result = await registerUser(name, email, password);

            if (result.success) {
                return res.status(200).json({ token: result.token });
            } else {
                return res.status(400).json({ message: result.message });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    },
    login: async (req, res) => {
        try {
            // validate the request
            const allowedMethods = ["POST"];
            const parameterInfo = {};
            const headerInfo = {};
            const bodyInfo = {
                maxSize: 1000,
                allowedContentTypes: [
                    "application/json",
                    "application/x-www-form-urlencoded",
                ],
                fields: {
                    email: {
                        required: true,
                        maxLength: 100,
                        // allowedCharacters: a-z A-Z 0-9 - _ . @
                        allowedCharacters: /^[A-Za-z0-9\-_.@]+$/,
                    },
                    password: {
                        required: true,
                        maxLength: 100,
                        // allowedCharacters: a-z A-Z 0-9 - _ . @ ! # $ % ^ & * ( ) + = { } [ ] | \ : ; " ' < > , ? / ~ `
                        allowedCharacters:
                            /^[A-Za-z0-9\-_.@!#$%^&*()+={}\[\]|\\:;\"'<>,?/~`]+$/,
                    },
                },
            };
            const validationResult = validateRequest(
                req,
                allowedMethods,
                parameterInfo,
                headerInfo,
                bodyInfo
            );
            if (validationResult["valid"] === false) {
                console.log("validationResult: ", validationResult);
                return res
                    .status(400)
                    .json({ message: validationResult["message"] });
            } else {
                console.log("request body: ", req.body);
            }

            // use loginUser function to login the user
            const { email, password } = req.body;
            const result = await loginUser(email, password);

            if (result.success) {
                return res.status(200).json({ token: result.token });
            } else {
                // if the error message is "Invalid email or password", set return code to 401 else 400
                var returnCode = 400;
                if (result.message === "Invalid email or password") {
                    returnCode = 401;
                }
                return res.status(returnCode).json({ message: result.message });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
            
    },
};

module.exports = authController
