'use strict'
// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Commande', new Schema({
    menusId:{
        id : String,
        count : Number
    },
    produitsId:{
        id : String,
        count : Number
    },
    idUser:{ 
        type : String,
        required : false,
    },
    isDone:{
        type : Boolean,
        required : true,
    }
    
}));

