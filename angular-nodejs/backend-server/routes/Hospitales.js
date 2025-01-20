const { Router } = require('express');
const router = Router();
const { check, param, body } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-JWT');
const { validarCampos } = require('../middlewares/validar-campos');

const {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
} = require('../controllers/Hospitales');

router.get('/',
    [validarJWT],
    getHospitales);

router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre de hospital es requerido').not().isEmpty(),
        validarCampos
    ], crearHospital);

router.put('/:id',
    [
        validarJWT,
        param('id', 'el Id es requerido')
            .isMongoId()
            .withMessage('El id proporcionado no es un identificador valido'),
        body('nombre', 'El nombre de hospital es requerido').not().isEmpty(),
        validarCampos
    ],
    actualizarHospital);

router.delete('/:id',
    [
        validarJWT,
        param('id', 'el Id es requerido')
        .isMongoId()
        .withMessage('El id proporcionado no es un identificador valido'),
        validarCampos
    ],
    borrarHospital);

module.exports = router;