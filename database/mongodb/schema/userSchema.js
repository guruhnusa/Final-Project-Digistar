const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: String,
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: 'USER',
        enum: ['USER', 'ADMIN']
    }
});

module.exports = {
    userSchema
}