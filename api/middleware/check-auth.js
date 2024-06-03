const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const decoded = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_KEY);
        next();
    } catch (error) {
        return res.status(401).json({message: 'Auth failed'});
    }
};