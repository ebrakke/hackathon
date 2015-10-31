var express = require('express');
var envelope = require('../middlewares/envelope');
var index = express.Router();

index.get('/', function(req, res, next) {
    res.locals.data = {msg: 'Hello World!'};
    next();
}, envelope);

module.exports = index;