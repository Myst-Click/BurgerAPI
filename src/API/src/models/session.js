'use strict'
// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const User = mongoose.model('User');
// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Session', new Schema({
    User : User.schema,
    token:{
        type : String,
        required : true,
    },
    dateStart:{
        type : String,
        required : true,
    }
}));

