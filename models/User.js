const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const UserSchema = new Schema({
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
    address: {
        type: String,
        required: true
    },
    ownVehicle: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('user', UserSchema);