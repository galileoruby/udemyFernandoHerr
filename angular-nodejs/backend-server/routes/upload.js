
/*
    Ruta : api/upload/{}
*/

const { Router } = require('express');

// check is obsoleted
const { body } = require('express-validator');

const { validarCamposGeneric } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-JWT');

const { uploadFile, retornaImagen } = require('../controllers/upload');
const expressuploadFile = require('express-fileupload');

const router = Router();

router.use(expressuploadFile());

router.put('/:tipo/:id',
    [validarJWT],
    uploadFile);

router.get('/:tipo/:foto',
    [validarJWT],
    retornaImagen);

module.exports = router