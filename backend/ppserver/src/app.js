const express = require('express');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const bodyParser = require('body-parser');

const { port } = require('./config/config');
console.log('port: ' + port);
const { MONGO_CONNECTION_STRING } = require('./config/config');
console.log('MONGO_CONNECTION_STRING: ' + MONGO_CONNECTION_STRING);

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Routes
app.use('/api/auth', authRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
