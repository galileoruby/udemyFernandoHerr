const { Router } = require('express');
const router = Router();
const { check, param } = require('express-validator');
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
    [validarJWT],
    actualizarHospital);


router.delete('/:id',
    [],
    borrarHospital);

module.exports = router;