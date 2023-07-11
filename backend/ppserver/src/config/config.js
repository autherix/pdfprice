const crypto = require('crypto');
const fs = require('fs');
const env = require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3001,
    jwtSecret: process.env.JWT_SECRET || generateJwtSecret(),
    jwtExpiration: process.env.JWT_EXPIRATION || '7d',
    MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
};

function generateJwtSecret() {
    const jwt_secret_key = crypto.randomBytes(64).toString('hex');
    // add it to .env file if not already there, use fs
    const env_file = '/app/ppserver/.env';
    const env_file_content = fs.readFileSync(env_file, 'utf8');
    if (!env_file_content.includes('JWT_SECRET')) {
        fs.appendFileSync(env_file, '\nJWT_SECRET=' + jwt_secret_key);    
    }
    return jwt_secret_key;
}