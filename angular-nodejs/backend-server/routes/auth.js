const { Router } = require('express')
const router = Router();

const { loginUser } = require('../controllers/auth')
const { validarCampos } = require('../middlewares/validar-campos');
const { check, param } = require('express-validator')

router.post('/', [
    check('password', 'Password es requerido').not().isEmpty(),
    check('email', 'email es requerido').isEmail(),
    validarCampos
], loginUser)

module.exports = router;