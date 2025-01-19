const { Schema, model, collection } = require('mongoose');

const MedicoSchema = Schema({
    nombre: {
        type: String,
        require: true
    },
    img: {
        type: String,
        require: false,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario'
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    }
}, { collection: 'medicos' }
);

MedicoSchema.method('toJSON', function () {
    const { __V, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Medico', MedicoSchema);