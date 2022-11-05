const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const DriverSchema = new Schema({
    phone: {  // To be verified using OTP
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('driver', DriverSchema);