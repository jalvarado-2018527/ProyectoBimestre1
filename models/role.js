const { Schema, model } = require("mongoose");

const RoleSchema = Schema({
    rol: {
        type: String,
        required: [true, 'el nombre es obligatorio']
    }
})

module.exports = model('Role', RoleSchema);

