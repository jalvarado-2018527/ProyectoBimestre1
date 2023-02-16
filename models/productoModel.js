const { Schema, model } = require("mongoose")

const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'el nombre es obligatorio'],
        unique: true

    },
    precio: {
        type: Number,
        required: [true, 'la descripcion es obligatorio']
    },
    stok: {
        type: Number,
        required: [true, 'el stock es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true
    }
})

module.exports = model('Producto', ProductoSchema)
