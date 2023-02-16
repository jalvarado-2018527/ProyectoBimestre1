const { Schema, model } = require("mongoose")

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'el nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'el corre es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'el contraseña es obligatorio']
        
    },
    img: {
        type: String
      
    },
    rol: {
        type: String,
        required: true,
        enum:['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true,
      
    },
    google: {
        type: Boolean,
        required: false,
        
    },
})

module.exports = model('Usuario', UsuarioSchema);


