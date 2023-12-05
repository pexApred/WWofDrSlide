const mongoose = require("mongoose");
const config = require('./config');

const connectDatabase = async () => {

    await mongoose.connect(config.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    mongoose.connection.once('open', () => {
        console.log('Connected to Database');
    });

    mongoose.connection.on('error', (err) => {
        console.error('Database connection error:', err);
        process.exit(1);
    });
};

module.exports = connectDatabase;