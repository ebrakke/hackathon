var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name:       String,
    email:      String,
    pHash:      String,
    userID:     String,
    phoneNum:   Number
});

var transactionSchema = new Schema({

});