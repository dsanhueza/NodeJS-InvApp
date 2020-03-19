const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    rutUsuario: { type: String, required: true },
    nombreUsuario : { type: String, required: true },
    contrasenaUsuario: { type: String, required: true },
    fechaHoraCreacion: { type: Date, default: Date.now }
});

module.exports = model('User', UserSchema);