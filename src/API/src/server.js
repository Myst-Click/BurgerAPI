require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const RouteBuilder = require('./routes');
const config = require('./db');
const PORT = process.env.PORT || 4000;;
const InitialiseController = require('./controllers/initialise.controller');
const User = require('./models/user');
//const swaggerUi = require('swagger-ui-express');
//const specs = require('./swagger');

mongoose.connect(config.DB,{
    useNewUrlParser: true,
   useUnifiedTopology: true,
},function(err,db){
    if(err){
        console.log('database is not connected');
        throw(err);
    }
    else{
        console.log("Connected");
        //console.log(db.collections.users.find())
        var resultInitialise = InitialiseController.initialise(mongoose);
        // console.log(resultInitialise);

    }
})


RouteBuilder.build(app);

//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs.default));
app.listen(PORT, function(){
    console.log('Your burgerAPI server is running on PORT:',PORT);
});
