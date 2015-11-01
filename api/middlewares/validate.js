var validator = require('validator');

var INVALID_USER_FIELDS = {code: 400, msg: 'Invalid User Fields'};
exports.user = function(req, res, next) {
    var user = req.body;
    var valid = validator.isEmail(user.email) &&
            validator.isLength(user.password, 6) &&
            validator.isMobilePhone(user.phoneNumber, 'en-US') &&
            !!user.name;
    if (valid) {
        next();
    } else {
        next(INVALID_USER_FIELDS);
    }
};
