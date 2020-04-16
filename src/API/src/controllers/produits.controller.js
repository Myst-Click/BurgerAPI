const Produits = require('../models/produits');
const Menu = require('../models/menu');
var mongoose = require('mongoose')

class ProduitsController{

    async createProduit(name,idCatégorie,prix, stock){
        var newProduct = new Produits({
            name : name,
            idCatégorie : idCatégorie,
            prix : prix,
            stock : stock
        })

        newProduct.save(function(err){
            if(err) throw err;
        });

        return newProduct;
    }

    async getProduits(id){
        return await Produits.findOne({
            _id : id
        })
    }

    async getByName(name){
        return await Produits.findOne({
            name : name
        })
    }

    async verifStock(id){
        var prod = this.getProduits(id)
        if(!prod){
            return null;
        }
        return prod.stock;
    }

    async addtoStock(id, count){
        var prod = this.getProduit(id);
        if(!prod){
            return null;
        }
        prod.stock =+ count;
        prod.save(function(err){
            if(err) throw err;
        })
        return prod.stock;
    }
}
module.exports = new ProduitsController();
