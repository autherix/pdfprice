const express = require('express');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');

const { port } = require('./config/config');
console.log('port: ' + port);
const { MONGO_CONNECTION_STRING } = require('./config/config');
console.log('MONGO_CONNECTION_STRING: ' + MONGO_CONNECTION_STRING);
const { CORS_ORIGIN_ALLOW } = require('./config/config');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
    origin: CORS_ORIGIN_ALLOW,
    methods: ['GET', 'POST']
  }));
  

// Routes
app.use('/api/auth', authRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
