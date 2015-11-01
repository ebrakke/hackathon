var express = require('express');
var envelope = require('../middlewares/envelope');
var authorize = require('../middlewares/authorize');
var Transaction = require('../services/transactions');
var transactions = express.Router();

transactions.get('/:id', authorize.auth, function(req, res, next) {
    Transaction.get(req.params.id).then(function(transaction) {
        res.locals.data = transaction;
        next();
    }).fail(function(err) {
        next(err);
    });
}, envelope);

transactions.post('/', authorize.auth, function(req, res, next) {
    var user = res.locals.user;
    //console.log(user);
    user.location = {lat: res.body.lat, lng: res.body.lng};
    Transaction.create(user, res.body.amount).then(function(transaction) {
        res.locals.data = transaction;
        next();
    }).fail(function(err) {
        next(err);
    });
}, envelope);

transactions.post('/:id/accept', authorize.auth, function(req, res, next) {
    Transaction.accept(req.params.id, res.locals.user).then(function(transaction) {
        res.locals.data = transaction;
        next();
    }).fail(function(err) {
        next(err);
    });
}, envelope);

transactions.post('/:id/verify', authorize.auth, function(req, res, next) {
    Transaction.verify(req.body.code, req.params.id).then(function() {
        res.locals.data = {msg: 'Success'};
        next();
    }).fail(function(err) {
        console.log('mess');
        next(err);
    });
}, envelope);

transactions.delete('/:id', authorize.auth, function(req, res, next) {
    Transaction.del(req.params.id).then(function() {
        res.locals.data = {msg: 'Success'};
        next();
    }).fail(function(err) {
        next(err);
    });
}, envelope);


module.exports = transactions;
