const { Router } = require('express');
const { check } = require('express-validator');
const { GetProducto, PostProducto, PutProducto, DeleteProducto } = require('../controller/productoController');
const { idProducto } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

const router = Router();

router.get('/mostrar', GetProducto);

router.post('/agregar',[
validarJWT,
    esAdminRole,
    check('nombre','el nombre es obligatorio para agregar').not().isEmpty(),
    check('precio','tienes que colocar un numero para el precio').isNumeric(),
    check('stok','tienes que coloar un numero para el stok').isNumeric(),
    validarCampos
], PostProducto);

router.put('/editar/:id',[
    validarJWT,
    esAdminRole,
    check('nombre','el nombre es obligatorio para agregar').not().isEmpty(),
    check('precio','tienes que colocar un numero para el precio').isNumeric(),
    check('stok','tienes que coloar un numero para el stok').isNumeric(),
    check('id', "id de mongo no existe").isMongoId(),
    check('id').custom( idProducto),
    validarCampos,
], PutProducto);

router.delete('/delete/:id',[
    validarJWT,
    esAdminRole,
    check('id', "id de mongo no existe").isMongoId(),
    check('id').custom( idProducto),
    validarCampos
] ,DeleteProducto)


module.exports = router;