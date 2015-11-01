var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var Schema = require('mongoose').schema;
var mp = require('mongodb-promise');

var connectionString = 'mongodb://dev:winteriscoming@ds052408.mongolab.com:52408/moneymoneymoneycash';

exports.gets = function(sch, query, params) {
    return mp.MongoClient.connect(connectionString).then(function(db) {
        return db.collection(sch).then(function(col) {
            return col.find(query, params).toArray().then(function(items) {
                db.close();
                return items;
            });
        });
    });
};

exports.insert = function(col, doc) {
    return mp.MongoClient.connect(connectionString).then(function(db) {
        return db.collection(col).then(function(col) {
            return col.insert(doc).then(function(err, doc) {
                console.log('successful save');
            });
        });
    });
};

exports.remove = function(col, doc) {
    return mp.MongoClient.connect(connectionString).then(function(db) {
        return db.collection(col).then(function(col) {
            return col.remove(doc, {justOne: true}).then(function(err, doc) {
                console.log('successful delete' + doc);
            });
        });
    });
};
