var validator = require('validator');

var INVALID_USER_FIELDS = {code: 400, msg: 'Invalid User Fields'};
var INVALID_LOGIN_FIELDS = {code: 400, msg: 'Not an email or password'};

exports.user = function(req, res, next) {
    var user = req.body;
    var valid = validator.isEmail(user.email) &&
            !!user.password &&
            !!user.phoneNumber &&
            !!user.name;
    if (valid) {
        next();
    } else {
        next(INVALID_USER_FIELDS);
    }
};

exports.checkLogin = function(req, res, next) {
    var user = req.body;
    var valid = validator.isEmail(user.email) &&
        validator.isLength(user.password, 6);
    if (valid) {
        next();
    } else {
        next(INVALID_LOGIN_FIELDS);
    }
};
