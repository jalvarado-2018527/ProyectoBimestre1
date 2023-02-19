const { request, response } = require('express')
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuarioModel');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async(req = request, res = response) => {
    const { correo, password } = req.body;

    try {
          // si el usuario esta activo 
        const usuario = await Usuario.findOne({correo})
        if (!usuario) {
            return res.status(400).json({
                msg: "correo usuario no existe en la base de datos 404"
            })
        }
        if(usuario.estado === false){
            return res.status(400).json({
                msg: "correo usuario esta inactivo"
            })
        }
        const validarPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validarPassword) {
            return res.status(400).json({
                msg: "la password no es correcta"
            })
        }
        
        const token = await generarJWT(usuario.id)

        res.json({
            msg: "Login auth funciona",
            correo, 
            password,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "hable con el admin"
        })
    }

}


module.exports = {
    login
}