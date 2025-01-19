const { Router } = require('express');
const router = Router();
const { check, param } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-JWT');

const {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
} = require('../controllers/Medicos');

const { validarCampos } = require('../middlewares/validar-campos');

router.get('/',
    [validarJWT],
    getMedicos);

router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre de medico es requerido').not().isEmpty(),
        check('hospital', 'El hospital es requerido').not().isEmpty(),
        check('hospital', 'El hospital debe ser valido').isMongoId(),
        validarCampos
    ], crearMedico);

router.put('/:id',
    [validarJWT],
    actualizarMedico)

router.delete('/:id',
    [validarJWT],
    borrarMedico);

module.exports = router;