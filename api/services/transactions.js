var q = require('q');
var db = require('../helper/dbConnector');
var Transaction = {};

Transaction.get = function(id) {
    return {
        id: id,
        requester: 'some ID',
        fulfiller: 'another ID',
        amt: 50,
        status: 'accepted'
    };
};

module.exports = User;
