var q = require('q');
var db = require('../helper/dbConnector');
var util = require('../helper/utilities');
var bcrypt = require('bcryptjs');

var USER_NOT_FOUND = {code: 404, msg: 'User not found'};
var EMAIL_IN_USE = {code: 400, msg: 'Email already in use by a user'};

var User = {};

var INVALID_USERNAME_OR_PASSWORD = {code: 401, msg: 'Invalid Username or Password'};
var DB_ERROR = {code: 401, msg: 'DB error'};

User.get = function(userID) {
    //var user = {userID: userID, email: 'test@email.com'};
    //return user;
    return db.gets('users', {userID: userID}).then(function(user) {
        if (user.length === 0) {
            return q.Reject(USER_NOT_FOUND);
        }
        console.log(user[0]);
        return user[0];
    });
};

User.create = function(user) {
    var emailCheck = db.gets('users', {email: user.email}).then(function(found_user) {
        if (found_user.length !== 0) {
            console.log("Found user with that email!");
            return q.Reject(EMAIL_IN_USE);
        } else {
            var salt = bcrypt.genSaltSync(10);
            var pw = user.pHash;
            console.log("The password not hashed: " + pw);
            var hash = bcrypt.hashSync(pw, salt);
            console.log("The password hashed: " + hash);
            var token = util.generateToken();
            Object.defineProperty(user, "authToken", token);
            user.pHash = hash;
            var genID = util.createId(user.email, 'sha256');
            //Object.defineProperty(user, "userID", genID);
            user.userID = genID;

            return db.insert('users', user).then(function(user) {
                return User.get(genID);
            });
        }
    });
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
        });
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
//console.log(User.create({"name" : "Jenny Jenny", "email" : "something@xyz.com", "pHash" : "wololo", "phoneNum" : 8675309, "accepting" : true, "amount" : 45, "credit" : 67, "location" : { "latitude" : 9, "longitude" : 22 } }));


module.exports = User;
