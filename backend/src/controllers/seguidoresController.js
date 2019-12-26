const seguidoresController = {};
const Seguidores = require('../models/Seguidores');
const User = require('../models/User');
const md5 = require('md5');

seguidoresController.create = async (req, res) => {
    const {idUser, idSeguidor} = req.body;
    const seguidor = await Seguidores.findOne({idUser});

    if (seguidor) {
        seguidor.seguidores.map(x => {
            if (x === idSeguidor) return res.status(406).json("fallo");
        });
        seguidor.seguidores.push(idSeguidor);
        await seguidor.save();
    } else {
        const seguidor = new Seguidores({idUser, seguidores: [idSeguidor]});
        await seguidor.save();
    }

    const user = await User.findById(idUser);
    user.seguidores += 1;
    await user.save();

    res.json("ok");
}

seguidoresController.delete = async (req, res) => {
    const {idSeguidor} = req.params;
    let seguidor = await Seguidores.findOne({idUser: idSeguidor});

    seguidor.seguidores = seguidor.seguidores.filter(x => x !== req.userId);
    await seguidor.save();

    let user = await User.findById(idSeguidor);
    user.seguidores -= 1;
    await user.save();

    res.json('ok');
}

seguidoresController.index = async (req, res) => {
    const seguidor = await Seguidores.findOne({idUser: req.userId});

    if (!seguidor) return res.json({message: 'no followers'});

    let users = [];
    for (let id of seguidor.seguidores) {
        let user = await User.findById(id);
        user = {
            _id: user._id,
            name: user.name,
            surname: user.surname,
            mail: user.mail,
            gravatar: md5(user.mail)
        }
        users.push(user);
    }
    res.json(users);
}

module.exports = seguidoresController;