const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('./config');


const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //   useCreateIndex: true,
            //   useFindAndModify: false,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = connectDB;

