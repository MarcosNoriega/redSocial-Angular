const siguiendoController = {};
const Siguiendo = require('../models/Siguiendo');
const User = require('../models/User');
const md5 = require('md5');

siguiendoController.create = async (req, res) => {
    const {idUser, idSiguiendo} = req.body;
    const siguiendo = await Siguiendo.findOne({idUser});

    if (siguiendo) {
        siguiendo.siguiendo.map(x => {
            if (x === idSiguiendo) return res.status(406).json("fallo");
        });
        siguiendo.siguiendo.push(idSiguiendo);
        await siguiendo.save();
    } else {
        const siguiendo = new Siguiendo({idUser, siguiendo: [idSiguiendo]});
        await siguiendo.save();
    }

    return res.json('ok');

}

siguiendoController.index = async (req, res) => {
    const siguiendo = await Siguiendo.findOne({idUser: req.userId});

    if (!siguiendo) return res.json({message: 'not following'})

    let users = [];

    for (let id of siguiendo.siguiendo) {
        let user = await User.findById(id);
        user = {
            _id: user._id,
            name: user.name,
            surname: user.surname,
            mail: user.mail,
            gravatar: md5(user.mail)
        }
        users.push(user)
    }

    res.json(users);
}

siguiendoController.delete = async (req, res) => {
    const {idSiguiendo} = req.params;

    let siguiendo = await Siguiendo.findOne({idUser: req.userId});

    siguiendo.siguiendo = siguiendo.siguiendo.filter(x => x !== idSiguiendo);
    await siguiendo.save();

    res.json({message: 'successfy'});
}

siguiendoController.validarSiguiendo = async (req, res) => {
    const {idSiguiendo} = req.params;

    const siguiendo = await Siguiendo.findOne({idUser: req.userId});

    siguiendo.siguiendo.map(x => {
        if (x === idSiguiendo) return res.json(true);
    });

    return res.json(false);
}

module.exports = siguiendoController;