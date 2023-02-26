const { validationResult } = require("express-validator")
const {request, response, next} = require('express')

const sumarProductos =async(req = request , res =response, next) =>{
    let totalCarrito = 0;
        const carritoUsuario = usuario.carrito
        for (let carritoProducto of carritoUsuario) {
            const producto = await Producto.findOne({ _id: carritoProducto })
            totalCarrito = totalCarrito + producto.precio
    
        }
        console.log(totalCarrito)
        const totalUsuario = await Usuario.updateOne(
            { _id: data.usuario },
            { total: totalCarrito  },
            { new: true }
        )
        next()
}

module.exports ={
    sumarProductos
}