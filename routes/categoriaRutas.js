const { Router } = require('express');
const { check } = require('express-validator');
const {getCategoria, postCategoria, putCategoria, deleteCategoria}= require('../controller/categoriaController');
const { idCategoria } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

const router = Router();

router.get('/mostrar', getCategoria);

router.post('/agregar',[
    validarJWT,
    esAdminRole,
    check('nombre','el nombre es obligatorio para agregar').not().isEmpty(),
    check('descripcion','el  es obligatorio para agregar').not().isEmpty(),
    check('proveedor','el  es obligatorio para agregar').not().isEmpty(),
    validarCampos
], postCategoria);

router.put('/editar/:id',[
    validarJWT,
    esAdminRole,
    check('id', "no es un id valido").isMongoId(),
    check('id').custom( idCategoria),
    check('nombre','el nombre es obligatorio para agregar').not().isEmpty(),
    check('descripcion','el  es obligatorio para agregar').not().isEmpty(),
    check('proveedor','el  es obligatorio para agregar').not().isEmpty(),
    validarCampos
] , putCategoria);

router.delete('/delete/:id',[
    validarJWT,
    esAdminRole,
    check('id', "no es un id valido").isMongoId(),
    check('id').custom(idCategoria),
    validarCampos
] ,deleteCategoria)

module.exports = router;
