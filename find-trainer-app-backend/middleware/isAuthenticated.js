const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config');

module.exports = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({
            message: 'Unauthorized request'
        });
    }
    let token = req.headers.authorization.split(' ')[1];
    if (token === null) {
        return res.status(401).json({
            message: 'Unauthorized request'
        });
    }
    let payload;
    try {
        payload = jwt.verify(token, CONFIG.JWT_KEY);
    } catch (TokenExpiredError) {
        return res.status(401).json({
            message: 'Unauthorized request. Token has expired!',
            expired: true
        });
    }
    if (!payload) {
        return res.status(401).json({
            message: 'Unauthorized request'
        });
    }

    req.user_id = payload.user_id;
    req.user_role = payload.user_role;

    next();
};
