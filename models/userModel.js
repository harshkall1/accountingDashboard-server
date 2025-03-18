const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        default: 0
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

