const { response } = require('express');
const encriptadorJs = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const Medico = require('../models/Medico');;

const getMedicos = async (req, res) => {
    try {
        const medicos = await Medico
            .find({})
            .populate('usuario','nombre')
            .populate('hospital','nombre');

        res.status(200).json({
            ok: true,
            medicos
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener medicos, hable con usuario administrador.'
        });
    }
}

const crearMedico = async (req, res = response) => {
    try {
        const currentDbMedico = new Medico({
            usuario: req.id,
            ...req.body
        });

        await currentDbMedico.save();

        res.json({
            ok: true,
            medico: currentDbMedico
        });
    } catch (err) {        
        res.status(500).json({
            ok: false,
            msg: 'Error al crear medico, consulte administrador'
        });
    }
}

const actualizarMedico = async (req, res = response) => {
    res.json({
        ok: true,
        msg: ' actualizarMedico'
    });
}

const borrarMedico = async (req, res = response) => {
    res.json({
        ok: true,
        msg: ' borrarMedico'
    });
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}