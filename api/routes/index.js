var express = require('express');
var envelope = require('../middlewares/envelope');
var index = express.Router();
var db = require('../helper/dbConnector');

index.get('/', function(req, res, next) {
    res.locals.data = {msg: 'Hello cruel World!'};
    next();
}, envelope);

module.exports = index;
