const rateLimit = require("express-rate-limit");

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    // max: 5,
    max: 100,
    message: {
        success: false,
        message: "Too many login attempts. Please try again later."
    },
    standardHeaders: true,
    legacyHeaders: false
});

const securityLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    // max: 3,
    max: 100,
    message: {
        success: false,
        message: "Too many OTP requests. Please try again later."
    },
    standardHeaders: true,
    legacyHeaders: false
});

module.exports = {
    authLimiter,
    securityLimiter
};