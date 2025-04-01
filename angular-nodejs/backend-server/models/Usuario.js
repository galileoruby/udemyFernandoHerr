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
}, {
    // toJSON: {
    //     virtuals: true,
    //     transform: function (doc, ret) {
    //         ret.id = ret._id;
    //         delete ret._id;
    //         delete ret.__v;
    //     }
    // },
    // toObject: {
    //     virtuals: true,
    //     transform: function (doc, ret) {
    //         ret.id = ret._id;
    //         delete ret._id;
    //         delete ret.__v;
    //     }
    // }
});

UsuarioSchema.method('toJSON', function () {
    const { __V, _id, password, ...object } = this.toObject();
    object.id = _id;
    return object;
});
module.exports = model('Usuario', UsuarioSchema);