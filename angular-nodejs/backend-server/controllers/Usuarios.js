const { response } = require('express');
const Usuario = require('../models/Usuario');
const encriptadorJs = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async (req, res) => {
    const usuarios = await Usuario.find({}, "nombre email role password");

    res.json({
        usuarios,
        uid: req.id
    })
}


const crearUsuario = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        const existeUsuario = await Usuario.findOne({ email });

        if (existeUsuario) {
            return res.status(400).json({
                ok: false,
                msg: `El Correo ${email} ya existe. intentar con otro por favor.`
            })
        }

        const usuario = new Usuario(req.body);

        //encriptar contraseña
        const salt = encriptadorJs.genSaltSync();
        usuario.password = encriptadorJs.hashSync(password, salt);

        await usuario.save();
        const token = await generarJWT(usuario.id)

        res.json({
            ok: true,
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error Inesperado revisar log'
        })
    }
}

const actualizarUsuario = async (req, res = response) => {

    //todo:: validar token y revisar si usuario corresponde
    const uid = req.params.id;
    try {
        const usuarioDb = await Usuario.findById(uid);

        if (!usuarioDb) {
            return res.status(400).json({
                ok: true,
                msg: 'No existe usuario con este id'
            });
        }

        const { password, google, email, ...campos } = req.body;
        if (usuarioDb.email !== email) {
            const existeEmail = await Usuario.findOne({ email });

            if (existeEmail) {
                return res.status(400).json({
                    ok: true,
                    msg: 'Ya existe un usuario con ese email.'
                });
            }
        }

        campos.email = email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error iensperado'
        })
    }
}

const borrarUsuario = async (req, res = response) => {
    const id = req.params.id;

    try {
        const usuarioDb = await Usuario.findById(id);

        if (!usuarioDb) {
            return res.status(400).json({
                ok: false,
                msg: `Usuario con este identificador no existe.`
            })
        }

        await Usuario.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg:'Usuario borrado exitosamente'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error iensperado al borrar usuario'
        })
    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}