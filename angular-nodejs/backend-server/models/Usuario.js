const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    img: {
        type: String,
        require: false,
    },
    rol: {
        type: String,
        require: true,
        default: 'USER_ROLE'
    },
    google: {   
        type: Boolean,
        default: false
    }
});

UsuarioSchema.method('toJSON', function () {
    const { __V, _id, password, ...object } = this.toObject();
    object.id= _id;    
    return object;
});


module.exports = model('Usuario', UsuarioSchema);