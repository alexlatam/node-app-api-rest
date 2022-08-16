const { Schema, model } = require('mongoose')

const ProductSchema = Schema({
    title: {
        type: String,
        required: [true, 'El titulo es obligatorio'],
        unique: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    price: {
        type: Number,
        default: 0,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    description: { type: String },
    available: { type: Boolean, default: false },
});

// Metodo para quitar los campos '__v' y 'password' de la respuesta del modelo
// El metodo toJSON es el que se encarga de obtener los datos de cada registro en la coleccion 'users'
// Aca estamos sobreescribiendo el metodo, polimorfismo
ProductSchema.methods.toJSON = function() {
    const { __v, _id, ...product } = this.toObject();

    product.id = _id;

    return product;
}


// Aca exportamos la clase del modelo
// Al mismo tiempo definimos cual sera la 'coleccion' de mongoDB que va a usar
// model( 'Collection_name', ModelName);
// Con este metodo, propio de mongoose, se enlazan la coleccion con el modelo
module.exports = model( 'Product', ProductSchema);