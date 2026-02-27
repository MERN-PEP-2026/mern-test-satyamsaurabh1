require("dotenv").config();
const mongoose = require("mongoose");

// Simple script to test DB connection manually
// Usage: node src/test-db.js

async function testConnection() {
    console.log("Connecting to:", process.env.MONGO_URI);
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connection successful!");
        process.exit(0);
    } catch (err) {
        console.error("DB connection failed:", err.message);
        process.exit(1);
    }
}

testConnection();
