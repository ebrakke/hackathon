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
    amount:     Number,
    credit:     Number
});

var transactionSchema = new Schema({
    tID:            Number,
    requester:      String,
    fulfiller:      String,
    status:         String,
    amount:         Number,
    token:          Number
});

var vTokenSchema = new Schema({
    uID:   String,
    vToken: String
});
