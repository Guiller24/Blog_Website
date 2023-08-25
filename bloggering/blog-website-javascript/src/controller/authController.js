
const authService = require('../service/authService');

const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    try{
        const user = await authService.authenticateUser(email, password);
        const token = authService.generateToken(user);
        console.log(token);
        res.json({ token });
    }catch(err){
        
        res.status(401).json({error: err.message});
    }
};

module.exports = { login }; 