// src/config/db.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config()

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.DB_URI);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;