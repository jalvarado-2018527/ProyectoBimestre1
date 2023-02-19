
const {request, response,} = require('express')
const jwt = require('jsonwebtoken')

const Usuario = require('../models/usuarioModel');

const validarJWT =async (req =request, res = response , next) =>{

    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({
            msg: "no hay token en la peticion"
        })
    }

    try {

        const {uid} = jwt.verify(token, process.env.SECERT_OR_PRIVATE_KEY)

        // leer al usuario que corresponda el uid
        const usuario = await Usuario.findById(uid)

        //verificar el uid del usuario si no existeria
        if(!usuario){
            return res.status(404).json({
                msg: "token no valido no existe en la base de datos"
            })
        }

    req.usuario = usuario;
    next();
        


    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: "token no valido"
        })
    }
   

}

module.exports ={
    validarJWT
}