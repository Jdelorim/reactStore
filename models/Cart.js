const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CartSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    products: [{
        aristName: {
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
        pricePerUnit: {
            type: String,
            required: true
        }
    }],
    timeStamp: {
        type: String,
        required: true,
        default: new DataCue(Date.now())
    }
});

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;
