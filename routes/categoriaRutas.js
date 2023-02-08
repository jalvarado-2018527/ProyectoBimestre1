const { Router } = require('express');
const {getCategoria, postCategoria, putCategoria, deleteCategoria}= require('../controller/categoriaController')

const router = Router();

router.get('/mostrar', getCategoria);

router.post('/agregar', postCategoria);

router.put('/editar/:id', putCategoria);

router.delete('/delete/:id', deleteCategoria)

module.exports = router;
