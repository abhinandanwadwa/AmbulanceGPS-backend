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
    // Application,
    category: {
        type: String,
        required: false
    },
    isEMTtrained: {
        type: Boolean,
        // default: false
        required: false
    },
    EVOC: {
        type: Boolean,
        // default: false
        required: false
    },
    vehicleNo: {
        type: String,
        required: false
    },
    drivingLicense: {
        type: String,
        required: false
    },
    numberPlatePhoto: {
        data: Buffer,
        contentType: String,
        required: false
    }
}, {timestamps: true});

module.exports = mongoose.model('user', UserSchema);