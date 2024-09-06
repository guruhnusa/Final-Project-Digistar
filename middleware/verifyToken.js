const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userQuery = require('../database/mongodb/query/userQuery');

module.exports = {
    isLogin: async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            const token = authHeader && authHeader.split(' ')[1];
            if (!token) {
                return res.status(401).json({
                    message: 'Token is required'
                });
            }

            jwt.verify(token, 'default_secret_key', (err, user) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Token is invalid'
                    });
                }
                req.user = user;
                next();
            });
        } catch (err) {
            next(err);

        }
    },
    isAdmin: async (req, res, next) => {
        try{
            const authHeader = req.headers.authorization;
            const token = authHeader && authHeader.split(' ')[1];
            if (!token) {
                return res.status(401).json({
                    message: 'Token is required'
                });
            }

            jwt.verify(token, 'default_secret_key', (err, user) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Token is invalid'
                    });
                }
                if(user.role != 'ADMIN'){
                    return res.status(403).json({
                        message: 'You are not authorized'
                    });
                }

                req.user = user;
                next();
            });
        } catch(err){
            next(err);

        }
    }
}