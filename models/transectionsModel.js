const mongoose = require('mongoose');

const transectionSchema = new mongoose.Schema({
    amount: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Transection = mongoose.model('Transection', transectionSchema);

module.exports = Transection;