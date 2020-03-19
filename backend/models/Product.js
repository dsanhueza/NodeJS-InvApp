const {Schema, model} = require('mongoose');

const productSchema = new Schema({
    idProducto: { type: String, required: true },
    nombreProducto: { type: String, required: true },
    descripcionProducto: { type: String, required: true },
    fechaPublicacion: { type: Date, required: false },
    precioProducto: { type: Number, required: true },
    rutUsuario: { type:String, required: true }
});

module.exports = model('Product', productSchema);

