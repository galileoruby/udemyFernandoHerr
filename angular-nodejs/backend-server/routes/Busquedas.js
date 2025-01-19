
/*
    Ruta : api/todo
*/
const { Router } = require('express');

// check is obsoleted
const { body } = require('express-validator');
const { validarCamposGeneric } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-JWT');

const { getTodo, getDocumentosColeccion } = require('../controllers/Busquedas');
const router = Router();

router.get('/:search',
    [validarJWT],
    getTodo);

router.get('/coleccion/:tabla/:search',
    [validarJWT],
    getDocumentosColeccion);

module.exports = router