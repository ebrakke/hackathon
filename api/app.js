var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var errorHandle = require('./middlewares/error');

var index = require('./routes/index');
var user = require('./routes/user');
var transactions = require('./routes/transactions');
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

// Route declaration
app.use('/', index);
app.use('/user', user);
app.use('/transaction', transactions);

// For error handling
app.use(errorHandle);

var port = 3000;

app.listen(port);

console.log('Web server is listening on port ' + port);

module.exports = app;
