const { Router } = require('express');
const { GetProducto, PostProducto, PutProducto, DeleteProducto } = require('../controller/productoController');

const router = Router();


router.get('/mostrar', GetProducto);


router.post('/agregar', PostProducto);

router.put('/editar/:id', PutProducto);

router.delete('/delete/:id', DeleteProducto)


module.exports = router;