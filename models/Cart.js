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
        id: {
            type: String,
            required: true
        },
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
        pricePerUnit: {
            type: String,
            required: true
        },
        imgReg: {
            type: String,
            required: true
        }
    }],
    timeStamp: {
        type: String,
        required: true,
        default: new Date(Date.now())
    }
});


module.exports = Cart = mongoose.model('Cart', CartSchema);
