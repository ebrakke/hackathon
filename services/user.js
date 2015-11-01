var q = require('q');
var db = require('../helper/dbConnector');
var util = require('../helper/utilities');
var bcrypt = require('bcrypt');
var USER_NOT_FOUND = {code: 404, msg: 'User not found'};
var EMAIL_IN_USE = {code: 400, msg: 'Email already in use by a user'};

var User = {};

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

            //Object.defineProperty(user, "pHash", hash);
            user.pHash = hash;
            var genID = util.createId(user.email, 'sha256');
            //Object.defineProperty(user, "userID", genID);
            user.userID = genID;

            return db.insert('users', user).then(function(user) {
                User.get(genID);
            });
        }
    });
};

User.login = function(userData) {
    /* TODO: implement this with the DB
       Get the user based on the email and compare the password hash with the
       given password.  Return the user object (minus the password) if success
     */
    var user = {
        userId: 'some id',
        email: 'valid@email.com'
    };
    return user;
};

User.goOnline = function(user, amount) {
    /* TODO: implement this function with the DB
       Put the user into an online state in the DB for the specified amount
     */
    return true;
};
//console.log(User.create({"name" : "Wheres Waldo", "email" : "hereiam@xyz.com", "pHash" : "poplo", "phoneNum" : 12434543, "accepting" : true, "amount" : 45, "credit" : 67, "location" : { "latitude" : 9, "longitude" : 22 } }));

module.exports = User;
