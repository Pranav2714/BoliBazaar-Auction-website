const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://chrome:stonks123@cluster0.3bghcpe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
