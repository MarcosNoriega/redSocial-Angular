const userController = {};
const User = require('../models/User');
const jwt = require('jsonwebtoken');

userController.register = async (req, res) => {
    const user = new User(req.body);
    user.password = await user.encriptpassword(user.password);

    await user.save();

    const token = await jwt.sign({id: user._id}, process.env.SECRET_KEY, {
        expiresIn: 60 * 60 * 24
    });
    

    return res.json({auth: true, user, token});
}

userController.auth = async (req, res) => {
    const {mail, password} = req.body;
    const user = await User.findOne({mail});

    if(!user) {
        return res.status(401).json({auth: false, massaje: 'user no found'});
    } 

    const validPassword = await user.comparePassword(password, user.password);
    if (!validPassword) {
        return res.status(401).json({auth: false, massaje: 'password incorrect'});
    }

    const token = await jwt.sign({id: user._id}, process.env.SECRET_KEY, {
        expiresIn: 60 * 60 * 24
    });

    
    return res.json({auth: true, user, token});

}

userController.logout = (req, res) => {
    jwt.sign({id: req.userId}, process.env.SECRET_KEY, {
        expiresIn: 0
    });

    return res.json({auth: false, messaje: 'user logout'});
}





module.exports = userController;