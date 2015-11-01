var q = require('q');
var db = require('../helper/dbConnector');
var bcrypt = require('bcrypt');
var User = {};

var INVALID_USERNAME_OR_PASSWORD = {code: 401, msg: 'Invalid Username or Password'};
var DB_ERROR = {code: 401, msg: 'DB error'};
User.get = function(userID) {

    var user = {userID: userID, email: 'test@email.com'};
    return user;
};

User.create = function(User) {
    /* TODO: */
    return User;
};

User.login = function(userData) {
    return db.gets('users', {email: userData.email}).then(function(user) {
        if (!bcrypt.compareSync(userData.password, user.pHash) || user.length === 0) {
            return q.Reject(INVALID_USERNAME_OR_PASSWORD);
        }
        delete user.pHash;
        return user;
    });
};

User.goOnline = function(user, amount) {
    return db.gets('users', {userID: user.userID}).then(function(u) {
        u.amount = amount;
        u.location = user.location;
        u.online = true;
        return db.insert('users', u).then(function() {
            return u;
        })
    }).fail(function() {
        return q.Reject(DB_ERROR);
    });
};

User.goOffline = function(user) {
    return db.gets('users', {userID: user.userID}).then(function(u) {
        u.online = false;
        return db.insert('users', u).then(function() {
            return u;
        });
    }).fail(function() {
        return q.Reject(DB_ERROR);
    });
};


module.exports = User;
