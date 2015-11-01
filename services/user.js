var q = require('q');
var db = require('../helper/dbConnector');
var User = {};

User.get = function(userID) {

    var user = {userID: userID, email: 'test@email.com'};
    return user;
};

User.create = function(User) {
    /* TODO: */
    return User;
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

module.exports = User;
