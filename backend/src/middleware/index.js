const middleware = {}
const jwt = require('jsonwebtoken');

middleware.verifyToken = async (req, res, next) => {
    const token = req.headers['x-auth-token'];
    if (!token) {
        return res.status(401).json({
            auth: false,
            message: 'No token provided'
        });
    } 

    const decode =  jwt.verify(token, process.env.SECRET_KEY);

    req.userId = decode.id;
    next();

    
}

module.exports = middleware;