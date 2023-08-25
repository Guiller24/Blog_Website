const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../database/db');
const Users = require('../models/Users')
const sKey = 'a1b2c3d4e5f6g7';

const authenticateUser = async (email, password) => {
    const userInstance = await Users.findOne({
        where: { email }
    });
    
    if(!userInstance) {
        throw new Error('User not found');
    }
    const isPasswordCorrect = await bcrypt.compare(password, userInstance.password);

    if(!isPasswordCorrect) {
        throw new Error('Invalid password');
    }
    const user = userInstance.dataValues;
    console.log(user.userId);
    return user;
};
const generateToken = (user) => {
    return jwt.sign(
        {
            userId: user.userId,
            firstName:user.firstName,
            lastName: user.lastName,
            email: user.email
        },
        sKey,
        { expiresIn: '3h' },
    );
};

module.exports = {
    authenticateUser,
    generateToken
}
