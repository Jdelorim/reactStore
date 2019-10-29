const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CustomerSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    timeStamp: {
        type: String,
        default: new Date(Date.now())
    }
});

const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;
