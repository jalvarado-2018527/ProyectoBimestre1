const { response, request } = require('express');

const Producto = require('../models/productoModel');
const { Promise } = require('mongoose');


const GetProducto = async (req = request, res = response) => {

    const listaProductos = await Promise.all([
        Producto.countDocuments(),
        Producto.find().
        populate('usuario', "nombre").
        populate('categoria', "nombre")
    
    ])

    res.json({
        msg: 'Get Api de productos',
        listaProductos
    })


}
const GetProductoMasVendidos = async(req = request , res = response) =>{
   
 
    let listaProductos = await Producto.find().sort({stok: 1})
       

    res.json({
        msg: 'Productos mas vendidos',
        listaProductos
    })


}
const GetProductoAgotado = async(req = request , res = response) =>{
   

    const query = { stok : 0 };
     const listaProductos = await Promise.all([
         Producto.countDocuments(query),
         Producto.find(query)
     ])
 
     res.json({
         msg: 'Productos',
         listaProductos
     })
 
 
 }

const getProductoId = async (req = request, res = response) => {

    const { id } = req.params;
    const producto = await Producto.findById(id).
    populate('usuario','nombre').
    populate('categoria', "nombre")

    res.json({
        msg: 'Get Api de categoria',
        producto
    })
}
const PostProducto = async (req = request, res = response) => {

    const { estado, usuario, ...body } = req.body;
    const productosDB = await Producto.findOne({ nombre: body.nombre });

    if (productosDB) {
        return res.status(400).json({
            msg: `el producto ${productosDB.nombre}. ya esxiste en la base de datos`
        })
    }
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }


    const producto = new Producto(data)

    await producto.save()

    res.status(201).json({
        msg: 'Post api',
        producto
    })

}
const PutProducto = async (req = request, res = response) => {


    const { id } = req.params;

    const { _id, usuario, ...data } = req.body;

    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.usuario._id

    //edicion de producto 

    const editarProducto = await Producto.findByIdAndUpdate(id, data, { new: true });



    res.json({
        msg: "api para editar",
        editarProducto
    })

}

const DeleteProducto = async (req = request, res = response) => {

    const { id } = req.params;

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