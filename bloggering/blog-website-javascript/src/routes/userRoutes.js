const express = require('express');
const router = express.Router();

const UserController = require('../controller/userController');

//Routes
//Create a new User
router.post('/users', UserController.createUser);


//Get all Users
router.get('/users', async (req, res) => {
    try{
        const users = await UserController.getAllUsers(req, res);
        return res.status(200).json(users);
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

//Update User by ID
router.put('/users/:id', async (req, res) => {
    const id = req.params.id;
    const userInfo = req.body;
    try{
        await UserController.updateUser(id, userInfo);
        res.status(204).send();
    }catch(err) {
        res.status(500).json({error: err.message});
    }
});

//Delete User by ID
router.delete('/users/:id', async (req, res) => {
    const id = req.params.id;
    try{
        await UserController.deleteUser(id);
        res.status(204).send();
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

module.exports = router;