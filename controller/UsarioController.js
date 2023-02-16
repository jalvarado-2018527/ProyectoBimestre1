const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuarioModel');
const { Promise } = require('mongoose');


const getUsuarios = async(req = request , res = response) =>{

    const query = {estado: true};

    const listaUsuarios = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
    ])

    res.json({
        msg: 'Get Api de Usuarios',
        listaUsuarios
    })


}
const PostUsuarios = async(req = request , res = response) =>{

    const {nombre, correo, password, rol} = req.body;
    const usuarioDB = new Usuario({nombre, correo, password, rol});

    const salt =bcryptjs.genSaltSync();
    usuarioDB.password = bcryptjs.hashSync(password, salt);


    await usuarioDB.save();

    res.status(201).json({
        msg: 'Post api',
        usuarioDB
    })

}
const PutUsuarios = async(req = request , res = response) =>{

    const {id} = req.params;

    const {_id, rol, estado, ...resto} = req.params;

    const usuarioEditar = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'Put api',
        usuarioEditar
        
    })

}
const DeleteUsuarios = async(req = request , res = response) =>{

    const {id} = req.params;

    const usuarioEditar = await Usuario.findByIdAndDelete(id);

    res.json({
        msg: 'Delete api',
        usuarioEditar
    })

}

module.exports = {
    
    getUsuarios,
    DeleteUsuarios,
    PostUsuarios,
    PutUsuarios

}