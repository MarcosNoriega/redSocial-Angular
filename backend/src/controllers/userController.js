const userController = {};
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const md5 = require('md5');

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

userController.show = async (req, res) => {
    const {id} = req.params;
    const user = await User.findOne({_id: id}, {password: 0});
    const gravatar = md5(user.mail);

    res.json({"_id": user._id,
    "name": user.name,
    "surname": user.surname,
    "mail": user.mail,
    "seguidores": user.seguidores,
    gravatar});
}

userController.userAuth = async (req, res) => {
    const user = await User.findOne({_id: req.userId}, {password: 0});
    const gravatar = md5(user.mail);


    res.json({"_id": user._id,
    "name": user.name,
    "surname": user.surname,
    "mail": user.mail,
    "seguidores": user.seguidores,
    gravatar
});
}

userController.updatePassword = async (req, res) => {
    const {CurrentPassword, newPassword} = req.body;

    const user = await User.findById(req.userId);

    validpassword = await user.comparePassword(CurrentPassword, user.password);

    if (!validpassword) return res.status(401).json({massaje: 'password incorrect'});

    user.password = await user.encriptpassword(newPassword);
    await user.save();

    res.json({massaje: 'password changed successfully'});
}

userController.update = async (req, res) => {
    const {id} = req.params;
    const {name, surname, mail} = req.body;

    const user = await User.findById(id);

    user.name = name;
    user.surname = surname;
    user.mail = mail;
    await user.save();

    res.json({message: 'successfy', user});
}

userController.search = async (req, res) => {
    const {termino} = req.params;

    let users = [];
    let users1 = await User.find({name: { $regex: '.*' + termino + '.*' }}, {password: 0});
    let users2 = await User.find({surname: { $regex: '.*' + termino + '.*' }}, {password: 0});

    users1.push(...users2);

    users1.map(x => {
        let user = {
            _id: x._id,
            name: x.name,
            surname: x.surname,
            gravatar: md5(x.mail)
        }
        users.push(user);
    });

    return res.json(users);
}





module.exports = userController;