const { Router } = require('express')
const router = Router();

const { loginUser, logingGoogle } = require('../controllers/auth')
const { validarCampos } = require('../middlewares/validar-campos');
const { check, body } = require('express-validator');

router.post('/',
    [
        check('password', 'Password es requerido').not().isEmpty(),
        check('email', 'email es requerido').isEmail(),
        validarCampos
    ], loginUser)

router.post('/google',
    [
        body('token', 'El token de google es requerido').not().isEmpty(),
        validarCampos
    ], logingGoogle)

module.exports = router;