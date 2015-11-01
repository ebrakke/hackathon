var express = require('express');
var envelope = require('../middlewares/envelope');
var authorize = require('../middlewares/authorize');
var Transaction = require('../services/transactions');
var transactions = express.Router();

transactions.get('/:id', authorize.auth, function(req, res, next) {
    var stubbedData = {
        receiver : '00000002',
        fulfiller : '00000001',
        amount : 100,
        status : 'accepted'
    };
    res.locals.data = stubbedData;
    next();
}, envelope);

transactions.post('/', authorize.auth, function(req, res, next) {
    var stubbedData = {
        receiver : '00000002',
        fulfiller : '00000001',
        amount : 40,
        status : 'pending'
    };
    res.locals.data = stubbedData;
    next();
}, envelope);

transactions.post('/:id/verify', authorize.auth, function(req, res, next) {
    var stubbedData = {message : 'success'};
    res.locals.data = stubbedData;
    next();
}, envelope);

transactions.delete('/:id', authorize.auth, function(req, res, next) {
    var stubbedData = {message : 'success'};
    res.locals.data = stubbedData;
    next();
}, envelope);

module.exports = transactions;
