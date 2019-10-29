const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductsSchema = new Schema({
    artistName: {
        type: String,
        required: true
    },
    albumName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    catPrice: {
        type: String,
        required: true
    },
    markup: {
        type: String,
        required: true
    },
    imgRef: {
        type: String,
        required: true
    },
    timeStamp: {
        type: String,
        default: new Date(Date.now());
    }

});

const Products = mongoose.model('Products', ProductsSchema);
module.exports = Products;