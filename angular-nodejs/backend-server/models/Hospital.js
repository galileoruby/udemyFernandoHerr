const { Schema, model, collection } = require('mongoose');

const {mongoose}= require('mongoose');
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


// // Crear un virtual para id
// HospitalSchema.virtual('id').get(function () {
//     return this._id.toHexString();
//   });
  
//   // Asegurarse de que el virtual se incluya en las respuestas JSON
//   HospitalSchema.set('toJSON', {
//     virtuals: true,
//   });


module.exports = model('Hospital', HospitalSchema);