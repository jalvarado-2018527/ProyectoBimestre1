const { Schema, model } = require("mongoose")

const CarritoSchema = Schema({

    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
      
    },

    producto: [{
      
    }],
   
})

module.exports = model('Carrito', CarritoSchema)
