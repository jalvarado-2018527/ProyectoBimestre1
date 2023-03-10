const Usuario = require('../models/usuarioModel')
const Categoria = require('../models/categoriaModel')
const Producto = require('../models/productoModel')
const Role = require('../models/role')

const emailExiste = async(correo = '') =>{
    // verificar si el correo existe
    const existeEmailDeUsuario = await Usuario.findOne({correo})
    if (existeEmailDeUsuario ) {
        throw new Error(`el correo ${correo}, ya existe`)
    }
        
}

const esRoleValido =async(rol = '') =>{
    
    const existeRol = await Role.findOne({rol});
    if (!existeRol) {
        throw new Error(`el rol ${rol}, no existe en la db`)
    }
}

const existIdOfUser = async(id)=>{
    const existIdOfUser = await Usuario.findById(id)
    if (!existIdOfUser) {
        throw new Error(`el id ${id}, no existe en la db`)  
    }
}
const idCategoria = async(id)=>{
    const idCategoria = await Categoria.findById(id)
    if (!idCategoria) {
        throw new Error(`el id ${id}, no existe en la db`)  
    }
}
const idProducto = async(id)=>{
    const idProducto = await Producto.findById(id)
    if (!idProducto) {
        throw new Error(`el id ${id}, no existe en la db`)  
    }
}


module.exports ={
    emailExiste,
    esRoleValido,
    existIdOfUser,
    idCategoria,
    idProducto,
  
}