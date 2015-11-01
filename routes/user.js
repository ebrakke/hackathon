var express = require('express');
var envelope = require('../middlewares/envelope');
var validate = require('../middlewares/validate');
var authorize = require('../middlewares/authorize');
var User = require('../services/user');
var user = express.Router();

user.get('/:id', function(req, res, next) {
    var id = req.params.id;
    User.get(id).then(function(user) {
        delete user.pHash;
        res.locals.data = user;
        next();
    }).fail(function(err) {
        next(err);
    });

}, envelope);

user.post('/', validate.user, function(req, res, next) {
    User.create(req.body).then(function(userInfo) {
        delete userInfo.pHash;
        res.locals.data = userInfo;
        next();
    });

}, envelope);


user.post('/auth', validate.checkLogin, function(req, res, next) {
    var userInupt = req.body;
    User.login(userInupt).then(function(user) {
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

    User.goOnline(user, amount).then(function(userMod) {
        res.locals.data = userMod;
        next();
    }).fail(function(err) {
        next(err);
    });

}, envelope);

user.post('/:id/offline', authorize.auth, function(req, res, next) {
    var user = res.locals.user;
    User.goOffline(user).then(function(userMod) {
        res.locals.data = userMod;
        next();
    }).fail(function(err) {
        next(err);
    });

}, envelope);

user.post('/authorize', authorize.auth, function(req, res, next) {
    var venmoToken = req.body.venmoToken;
    var user = res.locals.user;
    User.authorize(user, venmoToken).then(function(result){
        res.locals.data = result;
        next();
    }).fail(function(err) {
        next(err);
    });
}, envelope);

module.exports = user;
