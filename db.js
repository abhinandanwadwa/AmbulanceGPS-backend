const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const mongoURI = process.env.mongodbURI;

const connectToMongo = () => {
    mongoose.connect(mongoURI, { dbName: 'HelpOnWheels' }, (err) => {
        console.log("Connected To Mongo Successfully!!");
        console.log(err);
    });
}

module.exports = connectToMongo;