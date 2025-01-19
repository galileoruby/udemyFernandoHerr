const { response } = require('express');
const Hospital = require('../models/Hospital');
const encriptadorJs = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const getHospitales = async (req, res) => {
    // const usuarios = await Hospital.find({}, "nombre email role password");
    try {
        const hospitales = await Hospital
                        .find({})
                        .populate('usuario','nombre img');

        res.status(500).json({
            ok: true,
            hospitales
        });

    } catch (error) {
        res.status(500).json({
            ok: true,
            msg: 'Error al obtener listado de hospitales, hablar con administrador'
        });
    }
}


const crearHospital = async (req, res = response) => {
    try {        
        const idUsuario = req.id;
        const currentHospitalDb = new Hospital({
            usuario: idUsuario,
            ...req.body
        });

        await currentHospitalDb.save();
        res.json({
            ok: true,
            hospital: currentHospitalDb
        });
    } catch (error) {    
        res.status(500).json({
            ok: false,
            msg: 'Error al crear hospital'
        });
    }
}

const actualizarHospital = async (req, res = response) => {
    res.json({
        ok: true,
        msg: ' actualizarHospital'
    });
}

const borrarHospital = async (req, res = response) => {
    res.json({
        ok: true,
        msg: ' borrarHospital'
    });
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}