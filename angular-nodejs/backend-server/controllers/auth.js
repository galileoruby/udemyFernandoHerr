const { response } = require('express');
const Usuario = require('../models/Usuario');
const encriptadorJs = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const loginUser = async (req, res = response) => {

    const { email, password } = req.body;
    try {
        const usuarioDb = await Usuario.findOne({ email });

        if (!usuarioDb) {
            res.status(404).json({
                ok: true,
                msg: 'email no valido'
            });
        }

        //verificar contraseña
        const validPassword = encriptadorJs.compareSync(password, usuarioDb.password);

        if (!validPassword) {
            res.status(400).json({
                ok: true,
                msg: 'Contraseña no valida'
            });

        }

        //genera token jwt 
        const token = await generarJWT(usuarioDb.id)

        res.status(200).json({
            ok: true,
            msg: 'login exitoso',
            adicional: token
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hubo Error al realizar login. contate dadministrador'
        })
    }
}

module.exports = {
    loginUser
}