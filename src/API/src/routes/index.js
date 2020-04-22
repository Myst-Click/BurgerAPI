'use strict';

class RouterBuilder {
    build(app) {
        app.use('/auth', require('./auth.route'));
        app.use('/commandes',require('./commande.route'));
        app.use('/produits', require('./produits.route'));
        app.use('/admin', require('./admin.route'));
        app.use('/preparateur', require('./preparateur.route'));
    }
}

module.exports = new RouterBuilder();
