var express = require('express');
var envelope = require('../middlewares/envelope');
var authorize = require('../middlewares/authorize');
var transactions = express.Router();

transactions.get('/:id', authorize.auth, function(req, res, next) {
    var stubbedData = {}; /* HERE */
    res.locals.data = stubbedData;
    next();
}, envelope);

transactions.post('/', authorize.auth, function(req, res, next) {
    var stubbedData = {}; /* HERE */
    res.locals.data = stubbedData;
    next();
}, envelope);

transactions.post('/:id/verify', authorize.auth, function(req, res, next) {
    var stubbedData = {}; /* HERE */
    res.locals.data = stubbedData;
    next();
}, envelope);

transactions.delete('/:id', authorize.auth, function(req, res, next) {
    var stubbedData = {}; /* HERE */
    res.locals.data = stubbedData;
    next();
}, envelope);

module.exports = transactions;
