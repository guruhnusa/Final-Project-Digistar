const mongoose = require('mongoose');
const schema = require('../schema/userSchema');
const bcrypt = require('bcrypt');

const Users = mongoose.model('Users', schema.userSchema);

async function getUsers() {
    return await Users.find();
}

async function createUser(user) {
    user.password = await bcrypt.hash(user.password, 10);
    return await Users.create(user);
}

async function updateUser(id, user) {
    user.password = await bcrypt.hash(user.password, 10);
    return await Users.findByIdAndUpdate(id, user, {
        new: true
    });
}

async function deleteUser(id) {
    return await Users.findByIdAndDelete(id);
}

async function findUserByName(name) {
    return await Users.find({
        name: name
    });
}

async function findUserByEmail(email) {
    return await Users.findOne({
        email: email
    });
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    findUserByName,
    findUserByEmail
};