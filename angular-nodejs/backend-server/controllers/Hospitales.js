const { response } = require('express');
const Hospital = require('../models/Hospital');
const encriptadorJs = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const getHospitales = async (req, res) => {
    // const usuarios = await Hospital.find({}, "nombre email role password");
    try {
        const hospitalesData = await Hospital
            .find({})
            .populate('usuario', 'nombre img')
            .sort({nombre:'asc'})
            .lean();

            const hospitales = hospitalesData.map(item => {
                return {
                  ...item,
                  id: item._id, // Asignar _id principal a id
                  usuario: {
                    ...item.usuario,
                    id: item.usuario?._id, // Asignar _id de usuario a id
                  }
                };
              });

              hospitales.forEach(item => {
                delete item._id;
                if (item.usuario) {
                  delete item.usuario._id;
                }
              });
                  
        res.status(200).json({
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
    const hospitalId = req.params.id;
    const idUsuario = req.uid;

    try {
        const hospitalDb = await Hospital.findById(hospitalId);

        if (!hospitalDb) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado.'
            });
        }

        const cambiosHospital = {
            ...req.body,
            usuario: idUsuario
        };

        const hospitalActualizado = await Hospital.findByIdAndUpdate(hospitalId, cambiosHospital, { new: true });


        return res.json({
            ok: true,
            msg: ' actualizarHospital',
            hospital: hospitalActualizado
        });

    } catch (error) {
        console.log('Error al actualizar Hospital', error)
        res.status(500).json({
            ok: false,
            msg: ' actualizarHospital'
        });

    }
}

const borrarHospital = async (req, res = response) => {
    const hospitalId = req.params.id;

    try {
        const hospitalDb = await Hospital.findById(hospitalId);

        if (!hospitalDb) {
            return res.status(404).json({
                ok: true,
                msg: 'no existe hospital con ese registro.'
            });
        }

        await Hospital.findByIdAndDelete(hospitalId);

        return res.json({
            ok: true,
            msg: 'Hospital borrado'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: true,
            msg: 'Error al borrar hospital, hable con administrador.'
        });
    }
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}