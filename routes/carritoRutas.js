const { Router } = require('express');
const { check } = require('express-validator');
const { GetCarrito, PostCarrito, PutCarrito, DeleteCarrito } = require('../controller/CarritoController');
const { idCarrito } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');


const router = Router();




router.post('/agregar',[
    validarJWT,
    validarCampos
], PostCarrito);

router.put('/editar/:id',[
], PutCarrito);

router.delete('/delete/:id',[
    
] ,DeleteCarrito)


module.exports = router;