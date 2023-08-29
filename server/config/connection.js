const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/wwofdrslide");

module.exports = mongoose.connection;