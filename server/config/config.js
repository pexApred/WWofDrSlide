require('dotenv').config({ path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development' });

module.exports = {
    PORT: process.env.PORT || 3001,
    JWT_SECRET: process.env.JWT_SECRET,
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/wwofdrslide',
    EMAIL: process.env.EMAIL,
    PASSWORD: process.env.PASSWORD
}