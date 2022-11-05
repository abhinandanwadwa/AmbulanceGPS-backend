const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const VehicleSchema = new Schema({
    owner: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    vehicleName: {
        type: String,
        required: true
    },
    vehicleNo: {
        type: String,
        required: true
    },
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
    drivingLicense: {
        type: String,
        required: false
    },
    numberPlatePhoto: {
        data: Buffer,
        contentType: String,
        required: false
    },
    registeredCompany: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('vehicle', VehicleSchema);