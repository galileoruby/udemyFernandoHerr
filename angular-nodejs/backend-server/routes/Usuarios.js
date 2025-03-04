const { Router } = require('express');
const router = Router();
const { check, param } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-JWT');

const {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
} = require('../controllers/Usuarios');
const { validarCampos } = require('../middlewares/validar-campos');

/*
    api: ruta/(s7arjsoij)
*/

router.get('/',
    [validarJWT],
    getUsuarios);

router.post('/',
    [        
        check('nombre', 'Nombre es requerido').not().isEmpty(),
        check('password', 'Password es requerido').not().isEmpty(),
        check('email', 'email es requerido').isEmail(),
        validarCampos
    ], crearUsuario);

router.put('/:id',
    [
        validarJWT,
        param('id', 'el Id es requerido')
            .exists({ checkNull: true }).bail()
            // .notEmpty()
            //     .notEmpty()
            //     .withMessage('El id no puede estar vacio')
            //     .bail()
            .isMongoId()
            .withMessage('El id proporcionado no es un identificador valido').bail(),
        check('nombre', 'Nombre es requerido').not().isEmpty(),
        check('email', 'email es requerido').isEmail(),
        check('rol', 'Rol es obligatorio').not().isEmpty(),
        validarCampos
    ], actualizarUsuario);

router.delete('/:id', [
    validarJWT,
    param('id', 'el Id es requerido')
        .isMongoId()
        .withMessage('El id proporcionado no es un identificador valido'),
    validarCampos
],
    borrarUsuario);

module.exports = router;