'use strict'
// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Commande', new Schema({
    menusId:{
        type : Map,
        required : true
    },
    produitsId:{
        type : Map,
        required : true
    },
    idUser:{ 
        type : String,
        required : false,
    },
    isDone:{
        type : Boolean,
        default : false,
    }
    
}));

