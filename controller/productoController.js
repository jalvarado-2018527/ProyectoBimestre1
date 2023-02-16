const { response, request } = require('express');

const Producto = require('../models/productoModel');
const { Promise } = require('mongoose');


const GetProducto = async(req = request , res = response) =>{


    const listaProductos = await Promise.all([
        Producto.countDocuments(),
        Producto.find()
    ])

    res.json({
        msg: 'Get Api de productos',
        listaProductos
    })


}
const PostProducto = async(req = request , res = response) =>{

    const {nombre, precio, stok} = req.body;
    const productosDB = new Producto({nombre, precio, stok});

    await productosDB.save();

    res.status(201).json({
        msg: 'Post api',
        productosDB
    })

}
const PutProducto = async(req = request , res = response) =>{

    const {id} = req.params;

    const {_id, estado, ...resto} = req.params;

    const productoEditar = await Producto.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'Put api',
        productoEditar
        
    })

}
const DeleteProducto = async(req = request , res = response) =>{

    const {id} = req.params;

    const productoborrar = await Producto.findByIdAndDelete(id);

    res.json({
        msg: 'Delete api',
        productoborrar
    })

}

module.exports = {
    
    GetProducto,
    DeleteProducto,
    PostProducto,
    PutProducto

}