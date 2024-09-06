const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    _id: String,
    user_id: String,
    product: String,
    amount: Number
});

module.exports = {
    orderSchema
}