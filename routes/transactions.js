var express = require('express');
var envelope = require('../middlewares/envelope');
var authorize = require('../middlewares/authorize');
var Transaction = require('../services/transactions');
var transactions = express.Router();

transactions.get('/search', authorize.auth, function(req, res, next) {
    var location = {
        lat: parseInt(req.query.lat),
        lng: parseInt(req.query.lng)
    };
    Transaction.search(res.locals.user, location).then(function(transaction) {
        res.locals.data = transaction;
        next();
    }).fail(function(err) {
       next(err);
    });
}, envelope);

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
    console.log(req.body);
    user.location = {lat: req.body.lat, lng: req.body.lng};
    Transaction.create(user, req.body.amount).then(function(transaction) {
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
