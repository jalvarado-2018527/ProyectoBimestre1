const { Router } = require('express');
const { check } = require('express-validator');
const { PostCarrito } = require('../controller/categoriaController');
const { getUsuarios, PostUsuarios, PutUsuarios, DeleteUsuarios, putCarrito, 
    putProductoCaritto, VaciarCarrito, getCarrito, PostCliente, borrarCliente,PutCliente } = require('../controller/usarioController');
const { emailExiste, esRoleValido, existIdOfUser } = require('../helpers/db-validators');
const { sumarProductos } = require('../middlewares/total-actualizar');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');


const router = Router();


router.get('/mostrar', getUsuarios);


router.post('/agregar', [
    validarJWT,
    esAdminRole,
    check('nombre', 'el nombre es obligatorio para agregar').not().isEmpty(),
    check('password', 'el password es obligatorio').not().isEmpty(),
    check('password', 'la contrase;a minimo tienen que ser 6 caracteres').isLength({ min: 6 }),
    check('correo', 'El correo no es correcto').isEmail(),
    check('correo').custom(emailExiste),
    check('rol').custom(esRoleValido),
    validarCampos
], PostUsuarios);





router.post('/agregarCliente', [
    check('nombre', 'el nombre es obligatorio para agregar').not().isEmpty(),
    check('password', 'el password es obligatorio').not().isEmpty(),
    check('password', 'la contrase;a minimo tienen que ser 6 caracteres').isLength({ min: 6 }),
    check('correo', 'El correo no es correcto').isEmail(),
    check('correo').custom(emailExiste),
    validarCampos
], PostCliente);


router.put('/carrito', [
    validarJWT,
    
    validarCampos
], putCarrito);

router.get('/mostrarCarrito/:id', [
   
], getCarrito);

router.put('/carritoDelete/:id', [
    validarJWT,
    validarCampos
], putProductoCaritto);

router.put('/vaciarCarrito', [
    validarJWT,
    validarCampos
], VaciarCarrito);

router.put('/editar/:id', [
    esAdminRole,
    validarJWT,
    check('nombre', 'el nombre es obligatorio para agregar').not().isEmpty(),
    check('password', 'el password es obligatorio').not().isEmpty(),
    check('password', 'la contrase;a minimo tienen que ser 6 caracteres').isLength({ min: 6 }),
    check('correo', 'El correo no es correcto').isEmail(),
    check('rol').custom(esRoleValido),
    check('id', "no es un id valido").isMongoId(),
    check('id').custom(existIdOfUser),
    check('correo', 'El correo no es correcto').isEmail(),
    validarCampos
], PutUsuarios);
router.put('/editarCliente/:id', [

    validarCampos
], PutCliente);

router.delete('/delete/:id', [
    validarJWT,
    esAdminRole,
    check('id', "id de mongo no existe").isMongoId(),
    check('id').custom(existIdOfUser),
    validarCampos
], DeleteUsuarios)

router.put('/editar/:id', [
    check('nombre', 'el nombre es obligatorio para agregar').not().isEmpty(),
    check('password', 'el password es obligatorio').not().isEmpty(),
    check('password', 'la contrase;a minimo tienen que ser 6 caracteres').isLength({ min: 6 }),
    check('correo', 'El correo no es correcto').isEmail(),
    check('rol').custom(esRoleValido),
    check('id', "no es un id valido").isMongoId(),
    check('id').custom(existIdOfUser),
    check('correo', 'El correo no es correcto').isEmail(),
    check('correo').custom(emailExiste),
    validarCampos
], PutUsuarios);


router.delete('/deleteCuenta/:id', [
    validarJWT,
    check('id', "id de mongo no existe").isMongoId(),
    check('id').custom(existIdOfUser),
    validarCampos
], borrarCliente)



module.exports = router;