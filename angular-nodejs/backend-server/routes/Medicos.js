const { Router } = require('express');
const router = Router();
const { check, param, body } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-JWT');

const {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
    getMedicoById
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
    [validarJWT,
        param('id', 'el Id es requerido')
            .isMongoId()
            .withMessage('El id proporcionado no es un identificador valido'),
        body('nombre', 'El nombre de medico es requerido').not().isEmpty(),
        body('hospital', 'El hospital es requerido').not().isEmpty(),
        validarCampos
    ],
    actualizarMedico)

router.delete('/:id',
    [validarJWT,
        param('id', 'el Id es requerido')
            .isMongoId()
            .withMessage('El id proporcionado no es un identificador valido'),
        validarCampos
    ],
    borrarMedico);

router.get ('/:id',
    [validarJWT,
        param('id', 'el Id es requerido')
            .isMongoId()
            .withMessage('El id proporcionado no es un identificador valido'),
        validarCampos
    ],
    getMedicoById);

module.exports = router;