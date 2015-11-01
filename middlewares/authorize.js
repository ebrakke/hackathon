var Auth = require('../services/auth');
var User = require('../services/user');

var UNAUTHORIZED = {msg: 'User is not authorized', code: 401};
var DB_FAILURE = {msg: 'An unknown issue has ocurred', code: 500};
exports.auth = function(req, res, next) {
    var authToken = req.get('authorization');
    if (!authToken) {
        next(UNAUTHORIZED);
        return;
    }
    var auth = new Auth();
    res.locals.user = auth.validateAuthToken(authToken);
    next();
};

exports.createAuth = function(req, res, next) {
    var auth = new Auth();
    res.locals.data.authToken = auth.createAuth(res.locals.data.uid, res.locals.updateAuth);
    next();
};
