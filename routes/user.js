const express = require('express');
const router = express.Router();
const UserSchema = require('../models/User');
const { body, validationResult, check } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const dotenv = require('dotenv');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;



// Route 1: Registering A New User: POST: http://localhost:8181/api/user/register. No Login Required
router.post("/register", [
    body('phone', "Please enter a correct mobile number.").isMobilePhone(),
    body('name', "Name should be at least 3 characters long.").isLength({ min: 3 }),
    body('email', "Please enter a correct email address.").isLength({ min: 3 }),
    body('city', "Please enter a correct city.").isLength({ min: 3 }),
    body('address', "Please enter correct address.").isLength({ min: 10 }),
    body('ownVehicle', "Please select if you wish to offer your own vehicle or not.").isEmpty(),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { phone, name, email, city, address, ownVehicle } = req.body;
        const newUser = await UserSchema.create({
            phone,
            name,
            email,
            city,
            address,
            ownVehicle
        });
        if (!newUser) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.status(200).json(newUser);
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});








// Route 2: Getting user details: GET: http://localhost:8181/api/auth/getdetails/:id. No Login Required
router.get("/getdetails/:id", async (req, res) => {

    try {
        const theUser = await UserSchema.findById(req.params.id);
        if (!theUser) {
            return res.status(400).json({ error: "No such user exist" });
        }
        return res.status(200).json({ theUser });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});








// Route 3: Deleting a user: DELETE: http://localhost:8181/api/auth/deleteuser/:id. No Login Required
router.delete("/deleteuser/:id", async (req, res) => {

    try {
        const theUser = await UserSchema.findById(req.params.id);
        if (!theUser) {
            return res.status(400).json({ error: "No such user exist" });
        }
        await theUser.delete();
        return res.status(200).json({ success: "The user has been successfully deleted!" });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});








// Route 4: Updating user details: PUT: http://localhost:8181/api/auth/updateuser/:id. No Login Required
router.put("/updateuser/:id", [
    body('name', "Name should be at least 3 characters long.").isLength({ min: 3 }),
    body('email', "Please enter a correct email address.").isLength({ min: 3 }),
    body('city', "Please enter a correct city.").isLength({ min: 3 }),
    body('address', "Please enter correct address.").isLength({ min: 10 }),
    body('ownVehicle', "Please select if you wish to offer your own vehicle or not.").isEmpty(),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const theUser = await UserSchema.findById(req.params.id);
        if (!theUser) {
            return res.status(400).json({ error: "No such user exist" });
        }
        const { name, email, city, address, ownVehicle } = req.body;
        await theUser.updateOne({ name, email, city, address, ownVehicle });
        return res.status(200).json({ success: "The user details has been successfully updated!" });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router;