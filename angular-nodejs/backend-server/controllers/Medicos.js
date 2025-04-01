const { response } = require('express');
const encriptadorJs = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const Medico = require('../models/Medico');
const Hospital = require('../models/Hospital');

const getMedicos = async (req, res) => {
    try {
        const medicos = await Medico
            .find({})
            .populate('usuario', 'nombre')
            .populate('hospital', 'nombre');

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

        //validar si existe el hospital

        console.log('hospital req:', req.body);
        console.log('hospital params:', req.params);

        const hospitalCurrent = await Hospital.findById(req.body.hospital);

        if (!hospitalCurrent){

         return    res.status(404).json({
                ok: false,
                msg: `No existe hospital seleccionado. ${req.body.hospital}`
            });
        }

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
    const idMedico = req.params.id;
    const hospitalId = req.body.hospital;

    try {
        const medicoDb = await Medico.findById(idMedico);

        if (!medicoDb) {
            return res.status(404).json({
                ok: false,
                msg: 'Medico no encontrado.'
            });
        }

        const hospitalDb = await Hospital.findById(hospitalId);

        if (!hospitalDb) {
            return res.status(404).json({
                ok: true,
                msg: 'no existe hospital con ese registro.'
            });
        }

        const cambiosMedico = {
            ...req.body
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(idMedico, cambiosMedico, { new: true });

        res.status(200).json({
            ok: true,
            msg: ' actualizarMedico',
            medico: medicoActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: true,
            msg: 'Error al actualizar medicos, hable con administrador'
        });
    }
}

const borrarMedico = async (req, res = response) => {
    const idMedico = req.params.id;
    try {
        const medicoDb = await Medico.findById(idMedico);

        if (!medicoDb) {
            return res.status(404).json({
                ok: false,
                msg: 'Medico no encontrado.'
            });
        }
        await Medico.findByIdAndDelete(idMedico);

        return res.status(201).json({
            ok: false,
            msg: 'Medico borrado.'
        });
    } catch (error) {
        res.status(500).json({
            ok: true,
            msg: 'Error al borrar Medico, hable con administrador.'
        });
    }
}
const getMedicoById = async (req, res = response) => {
    const idMedico = req.params.id;
    try {
        const medico = await Medico.findById(idMedico)
        .populate('usuario', 'nombre')
        .populate('hospital', 'nombre');

        if (!medico) {
            return res.status(404).json({
                ok: false,
                msg: 'Medico no encontrado.'
            });
        }
        
        

        return res.status(200).json({
            ok: true,
            msg: 'Obtenido exitosamente',
            medico

        });
    } catch (error) {
        res.status(500).json({
            ok: true,
            msg: 'Error al borrar Medico, hable con administrador.'
        });
    }
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
    getMedicoById
}