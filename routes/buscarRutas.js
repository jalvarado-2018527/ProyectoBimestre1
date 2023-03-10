const { Router } = require('express');
const { buscar } = require('../controller/buscadorController');

const router = Router();

//Manejo de rutas
router.get('/:coleccion/:termino' ,buscar);


module.exports = router;