const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { jwtSecret, jwtExpiration } = require('../config/config');

const generateToken = (user) => {
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
            console.log('request body: ' + req.body.name + ' ' + req.body.email + ' ' + req.body.password);
            return res.status(400).json({ message: 'All fields are required: name, email, password' });
        }
      const { name, email, password } = req.body;

      // Check if the email is already registered
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });

      // Save the user to the database
      await newUser.save();

      // Generate JWT token
      const token = generateToken(newUser);

      // Send the response with the token
      console.log('Successfully signed up, token: ' + token);
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
            console.log('request body: ' + req.body.email + ' ' + req.body.password);
            return res.status(400).json({ message: 'All fields are required: email, password' });
        }
        // validate whether there is no other fields
        if (Object.keys(req.body).length > 2) {
            // log which field is missing
            console.log('request body: ' + req.body.email + ' ' + req.body.password);
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
      return res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};

module.exports = authController;
