const { response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario =  require('../models/Usuario');

const validarJWT = (req, res = response, next) => {

    //leer el token
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la solicitud'
        })
    }

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        req.id = id;
        next();
    } catch (err) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }
}

const validarAdminRole = async(req, res = response, next) =>{
        const id= req.id;
        try{
            const usuarioDb = await Usuario.findById(id);
            if (!usuarioDb){
                return res.status(404).json({
                    ok: false,
                    msg: 'Usuario no existe.'
                });
            }

            if (usuarioDb.rol !== 'ADMIN_ROLE'){
                return res.status(403).json({
                    ok: false,
                    msg: 'No tiene privilegios para  para realizar esta accion.'
                });
            }
            next();
        }catch(err){
                console.log('validarAdminRole:', err);
            return res.status(500).json({
                ok: false,
                msg: 'Hable con el administador'
            });
        }
}

const validarAdminRole_mismoUsuario = async(req, res = response, next) =>{     
    const id= req.id;
    const idParams= req.params.id;
    try
    {
        const usuarioDb = await Usuario.findById(id);
        if (!usuarioDb){
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe.'
            });
        }

        if (usuarioDb.rol === 'ADMIN_ROLE' ||  uid !== idParams){
            next();

        }else{
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para  para realizar esta accion.'
            });
        }
    }catch(err){
            console.log('validarAdminRole:', err);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administador'
        });
    }
}

module.exports = {
    validarJWT,
    validarAdminRole,
    validarAdminRole_mismoUsuario
}