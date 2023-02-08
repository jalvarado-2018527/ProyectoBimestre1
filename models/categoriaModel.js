const { Schema, model } = require("mongoose")

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'el nombre es obligatorio'],
        unique: true

    },
    descripcion: {
        type: String,
        required: [true, 'la descripcion es obligatorio']
    },
    proveedor: {
        type: String,
        required: [true, 'el proveedor es obligatorio']
    },
    
    estado: {
        type: Boolean,
        default: true
    }
})

module.exports = model('Categoria', CategoriaSchema)