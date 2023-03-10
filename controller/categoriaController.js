const { response, request } = require('express');

const Categoria = require('../models/categoriaModel');
const Producto = require('../models/productoModel');
const { Promise } = require('mongoose');

const getCategoria = async (req = request, res = response) => {

   
    const query = {estado: true}

    const listaCategoria = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query).populate('usuario','nombre')
    ]);

    res.json({
        msg: 'Get Api de categoria',
        listaCategoria
    })
}

const getCategoriaId = async (req = request, res = response) => {

    const { id } = req.params;
    const categoria = await Categoria.findById(id).populate('usuario','nombre')

    res.json({
        msg: 'Get Api de categoria',
        categoria
    })
}

const postCategoria = async (req = request, res = response) => {
    const  nombre  = req.body.nombre.toUpperCase()
    
    const categoriaDb = await Categoria.findOne({nombre});
    
    if (categoriaDb) {
        return res.status(400).json({
            msg: `la categoria ${categoriaDb.nombre}, ya existe en la db`
        })
    }

    const data ={
        nombre,
        usuario: req.usuario._id
    }

    const categoriaAgregada = new Categoria(data);

    await categoriaAgregada.save()

    res.status(201).json({
        msg: 'Post api',
        categoriaAgregada,
        
    })

}

const putCategoria = async (req = request, res = response) => {
    const { id } = req.params;

    const { _id, estado , usuario , ...resto } = req.body;

    resto.nombre = resto.nombre.toUpperCase()
    resto.usuario = req.usuario._id

    //edicion de categoria 
    const editarCategoria = await Categoria.findByIdAndUpdate(id, resto,{new:true});

    res.json({
        msg: "api para editar",
        editarCategoria
    })
}

const deleteCategoria = async (req = request, res = response) => {
    
    const { id } = req.params;
    let defaultCategoria = await Categoria.findOne({nombre: 'Default'});
    if(defaultCategoria._id == id) return res.send({message: 'Default categoria '});
    
    let udateproducto = await Producto.updateMany(
        {categoria: id}, 
        {categoria: defaultCategoria._id }
    );
    console.log(udateproducto)
    let deleteCategoria = await Categoria.findOneAndDelete({_id: id});

    res.json({
        msg: "api para borrar",
        deleteCategoria
    })
}
const defaultCategoria = async(req = request, res = response) =>{

    let data = {
        nombre: 'Default',
        descripcion: 'Default categoria',
        usuario:  ""
    }
    let existeCategoria = await Categoria.findOne({nombre: 'Default'});
    if(existeCategoria) return console.log('Default category already createad');
    let defCategoria = new Categoria(data);
    await defCategoria.save();
    return console.log('Default category created');
}


module.exports = {
    getCategoria,
    postCategoria,
    putCategoria,
    deleteCategoria,
    getCategoriaId,
    defaultCategoria
    
}