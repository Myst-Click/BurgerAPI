'use strict'
// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Commande', new Schema({
    menusId:{
        id : Number,
        count : Number
    },
    produitsId:{
        id : Number,
        count : Number
    },
    idUser:{ 
        type : Schema.Types.ObjectId,
        required : true,
    },
    isDone:{
        type : Boolean,
        required : true,
    }
    
}));

