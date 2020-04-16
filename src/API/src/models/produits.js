'use strict'
// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Produits', new Schema({
    name:{
        type : String,
        required : true
    },
    idCatégorie:{
        type : String,
        required : true
    },
    prix:{
        type : Number,
        required : true,
    }  ,
    stock:{
        type : Number,
        required : true,
    }  
}));