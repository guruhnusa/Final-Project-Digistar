const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
    _id: String,
    name: String,
    email: String
});

// Define the order schema
const orderSchema = new mongoose.Schema({
    _id: Number,
    user_id: { type: mongoose.Schema.Types.String, ref: 'User' },
    product: String,
    amount: Number
});

module.exports = {
    userSchema,
    orderSchema
};