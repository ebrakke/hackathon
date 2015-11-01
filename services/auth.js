var db = require('../helper/dbConnector');
var _ = require('lodash');
var q = require('q');
var generateToken = require('../helper/utilities').generateToken;
var Auth = function() {};

INVALID_AUTH_TOKEN = {code: 401, msg: 'Invalid Auth Token'};

Auth.validateAuthToken = function(authToken) {
    return db.gets('users', {authToken: authToken}, {pHash:0, _id:0}).then(function(user) {
        if (user.length === 0) {
            return q.reject(INVALID_AUTH_TOKEN);
        }
        return user[0];
    });
};

Auth.prototype.createAuth = function(uid, update) {
    var authToken = generateToken();
    return authToken;
};

module.exports = Auth;
