const express = require('express');
const bodyParser = require('body-parser');

const mongodb = require('./database/mongodb/db');
const helperAuth = require('./helper/auth');
const userQuery = require('./database/mongodb/query/userQuery');
const orderQuery = require('./database/mongodb/query/orderQuery');
const verifyToken = require('./middleware/verifyToken');

const PORT = 3000;

mongodb.connectDB();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.get('/users', verifyToken.isAdmin, (req, res) => {
    userQuery.getUsers().then((data) => {
        res.status(200).send(data);
    }).catch((error) => {
        res.status(500).send(error);
    });
});

app.post('/users', verifyToken.isAdmin, (req, res) => {
    const user = req.body;
    userQuery.createUser(user).then((data) => {
        res.status(201).send(data);
    }).catch((error) => {
        res.status(500).send(error);
    });
});

app.put('/users/:id', verifyToken.isAdmin, (req, res) => {
    const {
        id
    } = req.params;
    const user = req.body;
    userQuery.updateUser(id, user).then((data) => {
        res.status(200).send(data);
    }).catch((error) => {
        res.status(500).send(error);
    });
});

app.delete('/users/:id', verifyToken.isAdmin, (req, res) => {
    const {
        id
    } = req.params;
    userQuery.deleteUser(id).then((data) => {
        res.status(200).send(data);
    }).catch((error) => {
        res.status(500).send(error);
    });
});

app.get('/users/search', verifyToken.isAdmin, (req, res) => {
    const {
        name
    } = req.query;
    if (!name) {
        return res.status(400).send('Name is required');
    }
    userQuery.findUserByName(name).then((data) => {
        res.status(200).send(data);
    }).catch((error) => {
        res.status(500).send(error);
    });
});


app.get('/orders', verifyToken.isAdmin, (req, res) => {
    orderQuery.getOrders().then((data) => {
        res.status(200).send(data);
    }).catch((error) => {
        res.status(500).send(error);
    });
});

app.post('/orders', verifyToken.isLogin, (req, res) => {
    const {_id, product, amount} = req.body;
    const order = {
        _id,
        user_id: req.user.id,
        product,
        amount
    };
    orderQuery.createOrder(order).then((data) => {
        res.status(201).send(data);
    }).catch((error) => {
        res.status(500).send(error);
    });
});

app.put('/orders/:id', verifyToken.isAdmin, (req, res) => {
    const {
        id
    } = req.params;
    const order = req.body;
    orderQuery.updateOrder(id, order).then((data) => {
        res.status(200).send(data);
    }).catch((error) => {
        res.status(500).send(error);
    });
});

app.delete('/orders/:id', verifyToken.isAdmin, (req, res) => {
    const {
        id
    } = req.params;
    orderQuery.deleteOrder(id).then((data) => {
        res.status(200).send(data);
    }).catch((error) => {
        res.status(500).send(error);
    });
});

app.get('/orders/search', verifyToken.isAdmin, (req, res) => {
    const {
        product
    } = req.query;
    if (!product) {
        return res.status(400).send('Product is required');
    }
    orderQuery.findOrderByName(product).then((data) => {
        res.status(200).send(data);
    }).catch((error) => {
        res.status(500).send(error);
    });
});

app.get('/orders/my', verifyToken.isLogin, (req, res) => {
    const {
        id
    } = req.user;
    orderQuery.findMyOrder(id).then((data) => {
        res.status(200).send(data);
    }).catch((error) => {
        res.status(500).send(error);
    });
});

app.get('/orders/user/:user_id', verifyToken.isAdmin, (req, res) => {
    const {
        user_id
    } = req.params;
    orderQuery.findOrderByUserId(user_id).then((data) => {
        res.status(200).send(data);
    }).catch((error) => {
        res.status(500).send(error);
    });
});

app.post('/auth/register', (req, res) => {
    const user = req.body;
    userQuery.createUser(user).then((data) => {
        res.status(201).send(data);
    }).catch((error) => {
        res.status(500).send(error);
    });
});

app.post('/auth/login', async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body
        const payload = {
            email,
            password
        }
        const token = await helperAuth.login(payload);
        res.status(200).send({
            message: 'Login successfully',
            token
        });
    } catch (error) {
        res.status(500).send(error);
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});