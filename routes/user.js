var express = require('express');
var envelope = require('../middlewares/envelope');
var validate = require('../middlewares/validate');
var authorize = require('../middlewares/authorize');
var User = require('../services/user');
var user = express.Router();

user.get('/:id', function(req, res, next) {
    var id = req.params.id;
    var found_user = User.get(id).then(function(user) {
        delete user.pHash;
        res.locals.data = user;
        next();
    }).fail(function(err) {
        next(err);
    })

}, envelope);

user.post('/', validate.user, function(req, res, next) {
    var user = req.body;
    var user_out = User.create(req.body).then(function(user_info) {
        delete user_info.pHash;
        res.locals.data = user_info;
        next();
    });

}, envelope);

user.post('/auth', validate.checkLogin, function(req, res, next) {
    var userInupt = req.body;
    var userData = User.login(userInupt).then(function(user){
        delete user.pHash;
        res.locals.data = user;
        next();
    }).fail(function(err) {
        next(err);
    });
}, envelope);

user.post('/:id/online', authorize.auth, function(req, res, next) {
    var user = res.locals.user;
    var amount = req.body.amount;

    var userOnline = User.goOnline(user, amount).then(function(userMod) {
        res.locals.data = userMod;
        next();
    }).fail(function(err) {
        next(err);
    });

}, envelope);

user.post('/:id/offline', authorize.auth, function(req, res, next) {
    var user = res.locals.user;
    var userOnline = User.goOffline(user).then(function(userMod) {
        res.locals.data = userMod;
        next();
    }).fail(function(err) {
        next(err);
    });

}, envelope);

module.exports = user;
