const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { jwtSecret, jwtExpiration } = require('../config/config');

const generateToken = (user) => {
    // first get the user's jwtSecret
    var jwtSecret = user.jwtSecret;
    console.log('jwtSecret for user: "' + user.name + '" is: ', jwtSecret);
    return jwt.sign({ id: user._id, isAdmin: user.isAdmin }, jwtSecret, {
        expiresIn: jwtExpiration,
    });
};

const authController = {
    signup: async (req, res) => {
        try {
            // validate the request whether there is name, email, password
            if (!req.body.name || !req.body.email || !req.body.password) {
                // log which field is missing
                console.log('request body:\nname: ' + req.body.name + '\nemail: ' + req.body.email + '\npassword: ' + req.body.password);
                return res.status(400).json({ message: 'All fields are required: name, email, password' });
            }
            // validate whether there is no other fields
            if (Object.keys(req.body).length > 3) {
                // log body
                console.log('request body: ' + req.body);
                return res.status(400).json({ message: 'Only name, email and password are required' });
            }
            const { name, email, password } = req.body;

            // Check if the email is already registered
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already exists' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // genereate a long random string as jwtSecret using crypto
            const crypto = require('crypto');
            const jwtSecret = crypto.randomBytes(64).toString('hex');
        
            // Create a new user
            const newUser = new User({
                name,
                email,
                password: hashedPassword,
                jwtSecret,
            });

            // Save the user to the database
            await newUser.save();

            // Generate JWT token
            const token = generateToken(newUser);

            // Send the response with the token
            console.log('Successfully signed up User \nname: ' + name + ' \nemail: ' + email + ' \npassword: ' + password + ' \njwtSecret: ' + jwtSecret + ' \ntoken: ' + token);
            return res.status(200).json({ token });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    login: async (req, res) => {
        try {
            // validate the request whether there is email, password
            if (!req.body.email || !req.body.password) {
                // log which field is missing
                console.log('request body: \nemail: ' + req.body.email + ' \npassword: ' + req.body.password);
                return res.status(400).json({ message: 'All fields are required: email, password' });
            }
            // validate whether there is no other fields
            if (Object.keys(req.body).length > 2) {
                // log body
                console.log('request body: ', req.body);
                return res.status(400).json({ message: 'Only email and password are required' });
            }
            const { email, password } = req.body;

            // Check if the user exists
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            // Verify the password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            // Generate JWT token
            const token = generateToken(user);

            // Send the response with the token
            console.log('Successfully logged in User \nname: ' + user.name + ' \nemail: ' + user.email + ' \npassword: ' + password + ' \njwtSecret: ' + user.jwtSecret + ' \ntoken: ' + token);
            return res.status(200).json({ token });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },
};

module.exports = authController;
