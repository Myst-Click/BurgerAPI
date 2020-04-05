'use strict'
// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Menu', new Schema({
    idCatégorie:{
        type : String,
        required : true
    },
    name:{
        type : String,
        required : true
    },
    produitsId:{
        type : Map,
        of : Number
    },
    prix:{
        type : Number,
        required : true,
    }  
}));