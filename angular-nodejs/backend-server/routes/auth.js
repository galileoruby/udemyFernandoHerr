const { Router } = require('express');
const router = Router();
const { loginUser, logingGoogle, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { check, body } = require('express-validator');

const { validarJWT } = require('../middlewares/validar-JWT');

router.post('/',
    [
        check('password', 'Password es requerido').not().isEmpty(),
        check('email', 'email es requerido').isEmail(),
        validarCampos
    ], loginUser);

router.post('/google',
    [
        body('token', 'El token de google es requerido').not().isEmpty(),
        validarCampos
    ], logingGoogle);

router.get('/renew',
    [validarJWT],
    renewToken);

module.exports = router;