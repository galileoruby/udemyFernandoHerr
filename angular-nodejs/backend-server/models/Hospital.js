const { Schema, model, collection } = require('mongoose');

const HospitalSchema = Schema({
    nombre: {
        type: String,
        require: true
    },

    img: {
        type: String,
        require: false,
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }

}, { collection: 'hospitales' }
);

HospitalSchema.method('toJSON', function () {
    const { __V, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});


module.exports = model('Hospital', HospitalSchema);