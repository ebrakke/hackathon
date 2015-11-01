var q = require('q');
var db = require('../helper/dbConnector');
var utilities = require('../helper/utilities');
var Transaction = {};

var TRANSACTION_NOT_FOUND = {code: 404, msg: 'Transaction not found'};
var DB_ERROR = {code: 500, msg: 'There was a DB error'};
var INSUFFICIENT_CREDIT = {code: 400, msg: 'User has insufficient credit to request cash'};
var INVALID_VERIFICATION_CODE = {code: 400, msg: 'The verification code is incorrect'};

Transaction.get = function(id) {
    return db.gets('transactions', {tID: id}).then(function(transaction) {
        if (transaction.length === 0) {
            return q.reject(TRANSACTION_NOT_FOUND);
        }
        console.log(transaction[0]);
        return transaction[0];
    });
};

Transaction.create = function(user, amount) {
    if (user.credit < parseInt(amount)) {
        return q.reject(INSUFFICIENT_CREDIT);
    }
    var transaction = {
        requester: user,
        amount: parseInt(amount),
        status: 'pending'
    };
    transaction.tID = utilities.createId({r: Math.random().toString(32)});
    return db.insert('transactions', transaction).then(function() {
        return db.update('')
        return transaction;
    }).fail(function() {
        q.reject(DB_ERROR);
    });
};

Transaction.accept = function(tID, user) {
    return Transaction.get(tID).then(function(transaction) {
        transaction.fulfiller = user.userID;
        transaction.status = 'accepted';
        transaction.code = (Math.random() * 100000).toString().slice(0,5);
        return db.update('transactions', {tID: transaction.tID}, transaction).then(function() {
            transaction.fulfiller = user;
            return transaction;
        }).fail(function(err) {
            console.log(err);
        });
    }).fail(function() {
        q.reject(DB_ERROR);
    });
};

Transaction.verify = function(code, tID) {
    return Transaction.get(tID).then(function(transaction) {
        if (transaction.code !== code) {
            return q.reject(INVALID_VERIFICATION_CODE);
        }
        return db.update('transactions', {tID: transaction.tID}, {status: 'complete'}).then(function() {
            return db.update('user', {userID: transaction.fulfiller}, {$inc: {amount: (-1 * parseInt(transaction.amount))}});
        });
    });
};

Transaction.search = function(user, loc) {
    return db.update('users', {userID: user.userID}, {location: loc}).then(function() {
        return db.gets('transactions', {
            $and : [
                {status: 'pending'},
                {amount: {$lte: 100}}]}).then(function(transactions) {
            console.log(transactions);
            if (transactions.length !== 0) {
                return transactions[0];
            }
        }).fail(function(err) {
            console.log(err);
        });
    });
};

Transaction.del = function(trID) {
    return db.remove('transactions', {tID: trID}).then(function() {
        return true;
    });
};


module.exports = Transaction;
