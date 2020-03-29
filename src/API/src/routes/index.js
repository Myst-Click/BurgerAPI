'use strict';

class RouterBuilder {
    build(app) {  
        app.use('/auth', require('./auth.route'));  
    }
}

module.exports = new RouterBuilder();