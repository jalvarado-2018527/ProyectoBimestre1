const { response, request } = require('express');
const Carrito = require('../models/CarritoModel');
const Producto = require('../models/productoModel');

const { Promise } = require('mongoose');


const getCarrito = async (req = request, res = response) => {

    const query = {estado: true}

    const listaCarritos = await Promise.all([
        Carrito.countDocuments(query),
        Carrito.find(query).
        populate('usuario', "nombre").
        populate('categoria', "nombre")
    
    ])

    res.json({
        msg: 'Get Api de Carritos',
        listaCarritos
    })


}

const getCarritoId = async (req = request, res = response) => {

    const { id } = req.params;
    const Carrito = await Carrito.findById(id).
    populate('usuario','nombre').
    populate('categoria', "nombre")

    res.json({
        msg: 'Get Api de categoria',
        Carrito
    })
}
const PostCarrito = async (req = request, res = response) => {


    const { estado, usuario, total, ...body } = req.body;
    const producto = req.body.producto
    const numero = Producto.precio
    let dato1 = 0

    for (let i = 0; i >= producto.length; i++) {
         req.body.total =   dato1 + numero
    }
    
   
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }


    const CarritoComr = new Carrito(data)

    await CarritoComr.save()

    res.status(201).json({
        msg: 'Post api',
        Carrito
    })

}
const PutCarrito = async (req = request, res = response) => {


    const { id } = req.params;

    const { _id, estado, usuario, ...data } = req.body;

    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.usuario._id

    //edicion de categoria 

    const editarCarrito = await Carrito.findByIdAndUpdate(id, resto, { new: true });



    res.json({
        msg: "api para editar",
        editarCarrito
    })

}

const DeleteCarrito = async (req = request, res = response) => {

    const { id } = req.params;

    const Carritoborrar = await Carrito.findByIdAndDelete(id);

    res.json({
        msg: 'Delete api',
        Carritoborrar
    })

}

module.exports = {

    getCarrito,
    DeleteCarrito,
    PostCarrito,
    PutCarrito

}