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

    estado: {
        type: Boolean,
        default: true
    },

    stok: {
        type: Number,
        required: [true, 'el stock es obligatorio']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
  
    descripcion: {
        type: String,},

        
   
})

module.exports = model('Producto', ProductoSchema)
