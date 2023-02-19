const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, PostUsuarios, PutUsuarios, DeleteUsuarios } = require('../controller/UsarioController');
const { emailExiste, esRoleValido, existIdOfUser } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');


const router = Router();


router.get('/mostrar', getUsuarios);


router.post('/agregar',[
    check('nombre','el nombre es obligatorio para agregar').not().isEmpty(),
    check('password','el password es obligatorio').not().isEmpty(),
    check('password','la contrase;a minimo tienen que ser 6 caracteres').isLength({min: 6}),
    check('correo', 'El correo no es correcto').isEmail(),
    check('correo').custom( emailExiste ),
    check('rol').custom( esRoleValido ),
    validarCampos
], PostUsuarios);

router.put('/editar/:id',[
    check('nombre','el nombre es obligatorio para agregar').not().isEmpty(),
    check('password','el password es obligatorio').not().isEmpty(),
    check('password','la contrase;a minimo tienen que ser 6 caracteres').isLength({min: 6}),
    check('correo', 'El correo no es correcto').isEmail(),
    check('rol').custom( esRoleValido ),
    check('id', "no es un id valido").isMongoId(),
    check('id').custom( existIdOfUser),
    check('correo', 'El correo no es correcto').isEmail(),
    check('correo').custom( emailExiste ),
    validarCampos
], PutUsuarios);

router.delete('/delete/:id',[
    validarJWT,
    esAdminRole,
    check('id', "id de mongo no existe").isMongoId(),
    check('id').custom( existIdOfUser),
    validarCampos
], DeleteUsuarios)


module.exports = router;