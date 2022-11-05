const express = require('express');
const router = express.Router();
const UserSchema = require('../models/User');
const DriverSchema = require('../models/Driver');
const { body, validationResult, check } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const dotenv = require('dotenv');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;


// Route 1: Registering A New Driver: POST: http://localhost:8181/api/driver/register. No Login Required
router.post("/register", [
    body('phone', "Please enter a correct mobile number.").isMobilePhone(),
    body('password', "Password should be at least 4 characters long.").isLength({ min: 4 }),
    body('name', "Name should be at least 3 characters long.").isLength({ min: 3 }),
    body('email', "Please enter a correct email address.").isLength({ min: 3 }),
    body('city', "Please enter a correct city.").isLength({ min: 3 }),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { phone, name, email, city, password } = req.body;

        const alreadyEmailExists = await DriverSchema.findOne({ email });
        if (alreadyEmailExists) {
            return res.status(403).json({ error: "A user with this email id already exists." });
        }

        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(password, salt);

        
        const newDriver = await DriverSchema.create({
            phone,
            name,
            email,
            city,
            password: hash,
        });

        let payload = {
            user: {
                id: newDriver.id
            }
        }
        const authtoken = jwt.sign(payload, JWT_SECRET);
        res.json({ authtoken });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});







// Route 2: Getting a specific driver details: GET: http://localhost:8181/api/driver/getdetails/:id. No Login Required
router.get("/getdetails/:id", async (req, res) => {

    try {
        const theDriver = await DriverSchema.findById(req.params.id);
        if (!theDriver) {
            return res.status(500).json({ error: "Driver Not Found!" });
        }
        return res.status(200).json(theDriver);
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});







// Route 3: Deleting a Driver Profile: DELETE: http://localhost:8181/api/driver/deletedriver/:id. No Login Required
router.delete("/deletedriver/:id", async (req, res) => {

    try {
        const theDriver = await DriverSchema.findById(req.params.id);
        if (!theDriver) {
            return res.status(500).json({ error: "Driver Not Found!" });
        }
        await theDriver.delete();
        return res.status(200).json(theDriver);
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router;