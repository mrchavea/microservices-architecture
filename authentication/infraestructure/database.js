const mongoose = require("mongoose");

const DB_HOST = process.env.DATABASE_HOST || "localhost";
const DB_PORT = process.env.DATABASE_PORT || "27017";

const mongodbConnection = `mongodb://${DB_HOST}:${DB_PORT}`;

// Connect to mongoose database
mongoose.connect(mongodbConnection);
const database = mongoose.connection;

module.exports = database;
