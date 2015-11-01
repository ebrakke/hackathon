var q = require('q');
var db = require('../helper/dbConnector');
var Transaction = {};

var TRANSACTION_NOT_FOUND = {code: 404, msg: 'Transaction not found'};
var DB_ERROR = {code: 500, msg: 'There was a DB error'};
Transaction.get = function(id) {
    return db.find('Transactions', {transactionId: id}).then(function(transaction) {
        if (transaction.length === 0) {
            return q.Reject(TRANSACTION_NOT_FOUND);
        }
        return transaction[0];
    });
};

Transaction.create = function(user, amount) {
    var transaction = {
        requester: user,
        amount: amount
    };
    return db.insert('Transactions', transaction).then(function(id) {
        if (id.length === 0) {
            return q.Reject(DB_ERROR);
        }
        transaction.id = id[0];
        return transaction;
    });
};

module.exports = User;
