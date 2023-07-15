const jwt = require("jsonwebtoken");
const { jwtExpiration } = require("../config/config");

const generateToken = (user) => {
    return jwt.sign({
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    }, user.jwtSecret, {
        expiresIn: jwtExpiration,
    });
};

const generateJwtSecret = () => {
    // generate a random string of 64 characters
    var jwtSecret = "";
    var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < 64; i++) {
        jwtSecret += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return jwtSecret;
};

module.exports = {
    generateToken,
    generateJwtSecret,
};