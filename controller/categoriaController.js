const { response, request } = require('express');

const Categoria = require('../models/categoriaModel');
const { Promise } = require('mongoose');

const getCategoria = async (req = request, res = response) => {

   
    

    const listaCategoria = await Promise.all([
        Categoria.countDocuments(),
        Categoria.find()
    ]);

    res.json({
        msg: 'Get Api de categoria',
        listaCategoria
    })
}


const postCategoria = async (req = request, res = response) => {
    const { nombre, descripcion, proveedor } = req.body;
    const categoriaDb = new Categoria({nombre, descripcion, proveedor});

    await categoriaDb.save();

    res.status(201).json({
        msg: 'Post api',
        categoriaDb
    })

}

const putCategoria = async (req = request, res = response) => {
    const { id } = req.params;

    const { _id, estado , ...resto } = req.body;

    const editarCategoria = await Categoria.findByIdAndUpdate(id, resto);


    res.json({
        msg: "api para editar",
        editarCategoria
    })
}

const deleteCategoria = async (req = request, res = response) => {
    const { id } = req.params;

    const eliminarCategoria = await Categoria.findByIdAndDelete(id)


    res.json({
        msg: "api para borrar",
        eliminarCategoria
    })
}


module.exports = {
    getCategoria,
    postCategoria,
    putCategoria,
    deleteCategoria
}