const express = require('express');
const app = express();
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const RouteBuilder = require('./routes');
const config = require('./db');
const PORT = 4000;
const client = mongodb.MongoClient;

mongoose.connect(config.DB,{
    useNewUrlParser: true,
   useUnifiedTopology: true,
},function(err,db){
    if(err){
        console.log('database is not connected');
        throw(err);
    }
    else{
        console.log('connected!!');
    }
})


RouteBuilder.build(app);

app.listen(PORT, function(){
    console.log('Your burgerAPI server is running on PORT:',PORT);
});