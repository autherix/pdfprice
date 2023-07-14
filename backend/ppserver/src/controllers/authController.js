const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { jwtExpiration } = require("../config/config");
const validateRequest = require("../utils/validateRequest");

const generateToken = (user) => {
    // first get the user's jwtSecret
    var jwtSecret = user.jwtSecret;
    console.log('jwtSecret for user: "' + user.name + '" is: ', jwtSecret);
    return jwt.sign({
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    }, jwtSecret, {
        expiresIn: jwtExpiration,
    });
};

const generateJwtSecret = () => {
    // generate a random string of 64 characters
    var jwtSecret = "";
    var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < 64; i++) {
        jwtSecret += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return jwtSecret;
};

const registerUser = async (name, email, password) => {
    try {
        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return { success: false, message: "Email already exists" };
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate a JWT secret
        const jwtSecret = generateJwtSecret();

        // Create a new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            jwtSecret,
        });

        // Save the user to the database
        await newUser.save();

        // Generate a JWT token for the user
        const token = await generateToken(newUser);

        // Send the response with the token
        console.log(
            "Successfully signed up User \nname: " +
                name +
                " \nemail: " +
                email +
                " \npassword: " +
                password +
                " \njwtSecret: " +
                jwtSecret +
                " \ntoken: " +
                token
        );

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
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return { success: false, message: "Invalid email or password" };
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return { success: false, message: "Invalid email or password" };
        }

        // Generate a token
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

module.exports = authController;
