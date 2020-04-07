'use strict';

class RouterBuilder {
    build(app) {  
        app.use('/auth', require('./auth.route'));  
        app.use('/commandes',require('./commande.route'));
        app.use('/user',require('./user.route'));
    }
}

module.exports = new RouterBuilder();