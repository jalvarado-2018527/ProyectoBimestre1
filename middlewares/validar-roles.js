const { request, response } = require('express')



const esAdminRole = ( req = request, res= response, next ) =>{

    if (!req.usuario) {
        return res.status(500).json({
            msg : "error del server"
        })
    }
    const {rol, nombre} =req.usuario
    if (rol !== 'ADMIN') {
        return res.status(401).json({
            msg : `${nombre} no es profesor no puede hacer eso`
        })
    }
    next()
}

module.exports ={
    esAdminRole
}