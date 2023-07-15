const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
        type: String,
        required: [true, "Please provide an Email!"],
        unique: [true, "Email Exist"],
    },
    
    password: {
        type: String,
        required: [true, "Please provide a password!"],
        unique: false,
    },
    
    name: {
        type: String,
        required: [true, "Please provide a name!"],
        unique: false,
    },

    isAdmin: {
        type: Boolean,
        required: false,
        default: false,
    },

    isActive: {
        type: Boolean,
        required: false,
        default: false,
    },

    jwtSecret: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        required: false,
        default: Date.now,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
