'use strict'
// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', new Schema({ 
    idCategorieUser:{ 
        type : Number,
        required : true,
    },
    name:{
        type : String,
        required : true,
    },
    password:{
        type : String,
        required : true,
    },
    birth:{
        type : String,
        required : true,
    },
    email: {
        type : String,
        required : true,
    },
    adresse:{
        type : String,
        required : true,
    },
    phone:{
        type : String,
        required : true,
    },
    monnaie:{
        type : Number,
        required : true,
    }
}));