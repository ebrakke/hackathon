var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name:       String,
    email:      String,
    pHash:      String,
    userID:     String,
    phoneNum:   Number,
    location: {
        latitude:   Number,
        longitude:  Number
    },
    accepting:  Boolean,
    amount:     Number
});

var transactionSchema = new Schema({
    requester:     String,
    fulfiller:     String,
    status:        String,
    amount:        Number
});

var vTokenSchema = new Schema({
    user:   String,
    vToken: String
});
