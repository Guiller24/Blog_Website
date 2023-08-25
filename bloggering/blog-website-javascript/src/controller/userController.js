const db = require('../database/db');
const userService = require('../service/userService');

const createUser = async (req, res) => {
    try {
        const userInfo = req.body;
        await userService.createUser(userInfo);
        res.status(200).json({message: 'User Successfuly Created'});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// Read all Users
const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: err.message});
  }
};

//update a user
const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const userInfo = req.body;
        await userService.updateUser(userId, userInfo);
        res.status(200).json({message: 'User Successfuly Updated'});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}

const deleteUser = async (req, res) => {
    const { userId } = req.params;

    try {
        await userService.deleteUser(userId);
        res.status(200).json({message: 'User Successfuly Deleted'});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}


module.exports = {
    createUser,
    getAllUsers,
    updateUser,
    deleteUser,
};