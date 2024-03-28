const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/new?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to Mongo Successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        // You might want to throw the error here or handle it in some other way
    }
};

module.exports = connectToMongo;
