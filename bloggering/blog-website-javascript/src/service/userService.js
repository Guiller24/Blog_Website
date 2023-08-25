const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const saltRounds = 10; 
//Service
//Get all users
const getAllUsers = () => Users.findAll();

// Create user
const createUser = async (userInfo) => {
    const { password } = userInfo;

    try{
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        userInfo.password = hashedPassword
        console.log(userInfo);
        Users.create(userInfo);
    }
    catch(err){
        console.error(err);
    }
    
}

//Update User by ID
const updateUser = (userId, userInfo) => {
    return Users.update(userInfo, {
        where: {
            id: userId
        }
    });
};

//Delete User by ID
const deleteUser = (userId) => {
    return Users.destroy({
        where: {
            id: userId
        }
    });
};


module.exports = {
    createUser,
    getAllUsers,
    updateUser,
    deleteUser
}


