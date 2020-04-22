const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    api: ['./routes/*.js'],
    basePath : '/',
    swaggerDefinition: {
      info:{
        description : 'Burger API documentation',
        swagger: '2.0',
        title : 'BurgerAPI',
        version: '1.0.0'
      }
    }
}

const specs = swaggerJsDoc(options);

module.export = specs;
