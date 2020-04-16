const CommandeController = require('../controllers').CommandeController;

class PanierMiddleWare {

    static logPanier(panier) {
        return async function(req, res, next) {
            const idPanier = req.headers['panier'];
            if(!idPanier){
                var id = await CommandeController.createPanier()
                req.panierId = id;
                next();
            }
            else if (idPanier in panier){
                req.panierId = idPanier;
                next();
            }  
            else{
                var id = await CommandeController.createPanier()
                req.panierId = id;
                next();
            }
        };
    }
}

module.exports = PanierMiddleWare;