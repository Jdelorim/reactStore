const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let OrdersSchema = new Schema({
    orderNo: {
        type: String,
        required: true
    },
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
    totalPrice: {
        type: String,
        required: true
    },
    timeStamp: {
        type: String,
        required: true,
        default: new DataCue(Date.now())
    }

});

const Orders = mongoose.model('Orders', OrdersSchema);
module.exports = Orders;