const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuarioModel');
const Producto = require('../models/productoModel');
const { Promise } = require('mongoose');


const getUsuarios = async (req = request, res = response) => {

    const query = { estado: true };

    const listaUsuarios = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
    ])

    res.json({
        msg: 'Get Api de Usuarios',
        listaUsuarios
    })

}
const PostUsuarios = async (req = request, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuarioDB = new Usuario({ nombre, correo, password, rol });


    const salt = bcryptjs.genSaltSync();
    usuarioDB.password = bcryptjs.hashSync(password, salt);
    await usuarioDB.save();



    res.status(201).json({
        msg: 'Post api',
        usuarioDB
    })

}




const PutUsuarios = async (req = request, res = response) => {

    const { id } = req.params;

    const { _id, rol, estado, ...resto } = req.params;

    const usuarioEditar = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'Put api',
        usuarioEditar

    })

}

const DeleteUsuarios = async (req = request, res = response) => {
    
    const { id } = req.params;
    
    const usuarioEditar = await Usuario.findByIdAndDelete(id);

    res.json({
        msg: 'Delete api',
        usuarioEditar
    })

}

const putCarrito = async (req = request, res = response) => {
    const data = {
        usuario: req.usuario._id
    }

    const agregarProducto = await Usuario.updateOne(
        { _id: data.usuario },
        { $push: { carrito: req.body.producto } },
        { new: true }
    )

    let totalCarrito = 0;
    const usuario = await Usuario.findOne({ _id: data.usuario })
    const carritoUsuario = usuario.carrito
    for (let carritoProducto of carritoUsuario) {
        const producto = await Producto.findOne({ _id: carritoProducto })
        totalCarrito = totalCarrito + producto.precio

    }
    console.log(totalCarrito)
    const totalUsuario = await Usuario.updateOne(
        { _id: data.usuario },
        { total: totalCarrito },
        { new: true }
    )

    res.status(201).json({
        msg: 'Post api',
        agregarProducto,
        totalUsuario
    })

}
const putProductoCaritto = async (req = request, res = response) => {
    // obtener el id 
    const productoId = req.params.id;
    // obtener el id del usuario
    const data = {
        usuario: req.usuario._id
    }
    // obtener el arreglo del carrito
    const usuario = await Usuario.findOne({ _id: data.usuario });
    const carritoProductos = usuario.carrito

    // eliminar el producto
    let actualizarCarrito
   console.log(carritoProductos)
    for (let carritoProducto of carritoProductos) {
        actualizarCarrito = await Usuario.updateOne(
            { _id: data.usuario },
            { $pull: { carrito: productoId } },
            
        )
    }
    let totalCarrito = 0;
    const usuarios = await Usuario.findOne({ _id: data.usuario })
    const carritoUsuario = usuarios.carrito
    for (let carritoProducto of carritoUsuario) {
        const producto = await Producto.findOne({ _id: carritoProducto })
        totalCarrito = totalCarrito + producto.precio

    }
    console.log(totalCarrito)
    const totalUsuario = await Usuario.updateOne(
        { _id: data.usuario },
        { total: totalCarrito },
        { new: true }
    )

    res.json({
        msg: 'Delete api',
        actualizarCarrito,
        totalUsuario
    })
}


    const VaciarCarrito = async (req = request, res = response) => {
        const { id } = req.params;
       
        const data = {
            usuario: req.usuario._id
        }
        // obtener el arreglo del carrito
        const usuario = await Usuario.findOne({ _id: data.usuario });

        let vaciarCarrito = await Usuario.findOneAndUpdate(
                {_id: data.usuario},
                {carrito: []},
                {new: true}
        )
        let totalCarrito = 0;
        const usuarios = await Usuario.findOne({ _id: data.usuario })
        const carritoUsuario = usuarios.carrito
        for (let carritoProducto of carritoUsuario) {
            const producto = await Producto.findOne({ _id: carritoProducto })
            totalCarrito = totalCarrito + producto.precio
    
        }
        console.log(totalCarrito)
        const totalUsuario = await Usuario.updateOne(
            { _id: data.usuario },
            { total: totalCarrito },
            { new: true }
        )
    
        res.json({
            msg: 'Put api',
            vaciarCarrito,
            totalUsuario
        })
    
        
    }
    const getCarrito = async (req = request, res = response) => {

        const { id } = req.params
        
        const usuario = await Usuario.findOne({ _id: id }).populate('carrito','nombre')
        const carritoProductos = usuario.carrito
        const totalCarrito = usuario.total
    
        
        res.json({
            carritoProductos,
            totalCarrito
        })
    }

module.exports = {

    getUsuarios,
    DeleteUsuarios,
    PostUsuarios,
    PutUsuarios,
    putCarrito,
    putProductoCaritto,
    VaciarCarrito,
    getCarrito

}