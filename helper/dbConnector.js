var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var Schema = require('mongoose').schema;
var mp = require('mongodb-promise');

//var schm  = require('./schema');
//var schems = schm[0];
//console.log(schems);
//var User = mongoose.model('User', schems['user']);
//var Transaction = mongoose.model('Transaction', schems['transaction'])
//var vToken = mongoose.model('vToken', schems['vToken'])

var connectionString = "mongodb://dev:winteriscoming@ds052408.mongolab.com:52408/moneymoneymoneycash";
//var connectionString = "mongodb://localhost/nodetest1";

/*
 var connect = function() {
 mongoose.connect('mongodb://localhost/test');
 var db = mongoose.connection;
 db.on('error', console.error.bind(console, 'connection error:'));
 db.once('open', function(callback) {
 // yay!
 });
 };
 */

exports.gets = function(sch, query, params) {
    mp.MongoClient.connect(connectionString)
        .then(function(db){
            return db.collection(sch)
                .then(function(col) {
                    return col.find(query, params).toArray()
                        .then(function(items) {
                            console.log(items);
                            db.close();
                            return items;
                        })
                })
        })
};

exports.insert = function(col, doc) {
    mp.MongoClient.connect(connectionString)
        .then(function(db){
            return db.collection(col)
                .then(function(col) {
                    return col.insert(doc).then(function(err, doc)
                    {
                        console.log("successful save");
                    })
                })
        })
};

exports.remove = function(col, doc) {
    mp.MongoClient.connect(connectionString)
        .then(function(db){
            return db.collection(col)
                .then(function(col) {
                    return col.remove(doc, {justOne: true}).then(function(err, doc)
                    {
                        console.log("successful delete" + doc);
                    })
                })
        })
};