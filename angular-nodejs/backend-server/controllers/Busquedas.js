const { response } = require('express')
const Usuario = require('../models/Usuario');
const Medico = require('../models/Medico');
const Hospital = require('../models/Hospital');

const getTodo = async (req, res = response) => {
    const { search } = req.params;
    const regex = new RegExp(search, 'i');

    const [usuarios, medicos, hospitales] = await Promise.all(
        [
            Usuario.find({ "nombre": regex }, "nombre email role")
                .sort({ nombre: 'asc' })
            ,
            Medico.find({ "nombre": regex })
                .populate('usuario', 'nombre img')
                .sort({ nombre: 'asc' })
            ,
            Hospital.find({ "nombre": regex })
                .populate('usuario', 'nombre img')
                .sort({ nombre: 'asc' })

        ]).catch(error => {
            console.log('server:::', error);
            res.status(500).json({
                ok: false,
                msg: 'hable con administrador'
            })

        });

    try {
        res.status(200).json({
            ok: true,
            usuarios,
            medicos,
            hospitales
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'hable con administrador'
        });
    }
}

const getDocumentosColeccion = async (req, res = response) => {
    const { search, tabla } = req.params;
    const regex = new RegExp(search, 'i');
    const filter = {
        nombre: { $regex: regex },
        _id: { $ne: req.id }

    }
    let data = [];

    try {
        switch (tabla) {
            case 'medicos':
                data = await Medico.find({ "nombre": regex })
                    .populate('usuario', 'nombre img rol google')
                    .populate('hospital', 'nombre img')
                    .sort({ nombre: 'asc' });
                break;

            case 'hospitales':
                data = await Hospital.find({ "nombre": regex, notMe })
                    .sort({ nombre: 'asc' })
                    .populate('usuario', 'nombre img google  rol');
                break;

            case 'usuarios':
                data = await Usuario.find(filter, "nombre email rol img google")
                    .sort({ nombre: 'asc' });
                break;

            default:
                return res.status(400).json({
                    ok: false,
                    msg: ' Tablas permitidas: hospitales,medicos,usuarios'
                });
        }

        res.status(200).json({
            ok: true,
            query: data
        });
    } catch (erro) {
        res.status(500).json({
            ok: false,
            msg: 'hable con administrador',
            erro
        });
    }
}

module.exports = {
    getTodo,
    getDocumentosColeccion
}