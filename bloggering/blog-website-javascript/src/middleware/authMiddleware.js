const jwt = require('jsonwebtoken');
const sKey = 'a1b2c3d4e5f6g7';
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if(!token){
        return res.status(403).json({ message: 'Missing Token' });
    }
    try{
        const decoded = jwt.verify(token, sKey);
        req.user = decoded;
        next()
    }catch(err){
        return res.status(401).json({ message: 'Invalid Token' });
    }
};

module.exports = {
    verifyToken
};