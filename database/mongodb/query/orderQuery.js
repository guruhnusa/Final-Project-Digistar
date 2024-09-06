const mongoose = require('mongoose');
const schema = require('../schema/orderSchema');

const Orders = mongoose.model('Orders', schema.orderSchema);

async function getOrders() {
    return await Orders.aggregate([{
        $lookup: {
            from: 'users',
            localField: 'user_id',
            foreignField: '_id',
            as: 'user_info'
        }
    }]);
}

async function createOrder(order) {
    return await Orders.create(order);
}

async function updateOrder(id, order) {
    return await Orders.findByIdAndUpdate(id, order, {
        new: true
    });
}

async function deleteOrder(id) {
    return await Orders.findByIdAndDelete(id);
}

async function findOrderByName(product) {
    return await Orders.find({
        product: product
    });
}

async function findOrderByUserId(user_id) {
    return await Orders.find({
        user_id: user_id
    });
}
async function findMyOrder(id) {
    return await Orders.find({
        user_id: id
    });
}

module.exports = {
    getOrders,
    createOrder,
    updateOrder,
    deleteOrder,
    findOrderByName,
    findOrderByUserId,
    findMyOrder
};