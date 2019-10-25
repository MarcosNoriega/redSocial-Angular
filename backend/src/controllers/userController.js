const userController = {};
const User = require('../models/User');
const jwt = require('jsonwebtoken');

userController.login = async (req, res) => {
    const user = new User(req.body);
    user.password = await user.encriptpassword(user.password);

    // user.save();

    const token = await jwt.sign({id: user._id}, 'ark4Photo', {
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

    const validPassword = await user.comparePassword(password);
    if (!validPassword) {
        return res.status(401).json({auth: false, massaje: 'password incorrect'});
    }

    const token = await jwt.sign({id: user._id}, 'ark4Photo', {
        expiresIn: 60 * 60 * 24
    });

    
    return res.json({auth: true, user, token});

}





module.exports = userController;