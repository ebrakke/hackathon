var express = require('express');
var envelope = require('../middlewares/envelope');
var authorize = require('../middlewares/authorize');
var transactions = express.Router();

transactions.get('/:id', authorize.auth, function(req, res, next) {
    var stubbedData = { name : 'Rick Sanchez',
                        email : 'wubbalubbadubdub@earth.com',
                        userID : '00000001',
                        phoneNum : 1111111111,
                        accepting : true,
                        amount : 100,
                        credit: 30,
                        location : {
                            latitude : 100,
                            longitude : 23 } };
    res.locals.data = stubbedData;
    next();
}, envelope);

transactions.post('/', authorize.auth, function(req, res, next) {
    var stubbedData = { receiver : '00000002',
                        fulfiller : '00000001',
                        amount : 40,
                        status : 'pending'
                        }; /* HERE */
    res.locals.data = stubbedData;
    next();
}, envelope);

transactions.post('/:id/verify', authorize.auth, function(req, res, next) {
    var stubbedData = { message : 'success' }; /* HERE */
    res.locals.data = stubbedData;
    next();
}, envelope);

transactions.delete('/:id', authorize.auth, function(req, res, next) {
    var stubbedData = { message : 'success'}; /* HERE */
    res.locals.data = stubbedData;
    next();
}, envelope);

module.exports = transactions;
