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



// Route 1: Registering A New User: POST: http://localhost:8181/api/auth/register. No Login Required
router.post("/register", [
    body('name', "Full Name should be at least 3 characters.").isLength({ min: 3 }),
    body('email', "Please Enter a Vaild Email").isEmail(),
    body('role', "Please Enter a Vaild Role").notEmpty(),
    body('institute', "Please Enter a Vaild Institute").notEmpty(),
    body('password', "Password Should Be At Least 8 Characters.").isLength({ min: 8 }),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router;