const Command = require('../models/commande');
const Produits = require('../models/produits');
const Menu = require('../models/menu');
var mongoose = require('mongoose')
const VerifyValueController = require('../controllers/verifyValue.controller')

class MenuController{

    async createMenu(name, price, promotion){
        this.menu = new Map();
        if(promo > 0){
            const newprice = (1-promotion)*price;
        }
        var newProduct = new Produits({
            name : name,
            produitsId : this.menu,
            prix : price,
            promotion : promotion,
            pricewithPromo : newPrice
        })
    }

    async addProduitToMenu(produitID,menuID){
        var produit = await this.getProduit(produitID);
        if(!produit){
            return null;
        }
        if(produitID in this.menu[menuID].produits){
            this.menu[menuID].produits[produitID] +=1;
        }
        else this.menu[menuID].produits[produitID] = 1;
        this.save(function(err){
            if(err) throw err;
        })
    }
    async changePrice(menuId, newPrice){
        var menu = await this.getMenu(menuId);
        menu.prix = newPrice;
        menu.save(function(err){
            if(err) throw err;
        })
    }

    async addPromotion(menuId, newPromo){
        var menu = await this.getMenu(menuId);
        menu.promotion = newPromo;
        menu.pricewithPromo = (1-newPromo)*price;
        menu.save(function(err){
            if(err) throw err;
        })
    }

    async getMenu(id){
        return await Menu.find({
            idMenu : id
        })
    }

    async getPromo(id){
        var menu = await Menu.find({
            idMenu : id
        })
        if(!menu){
            return null;
        }
        return menu.promotion;
    }

    async getMenusWithPromo(){
        return await Menu.find({
              promotion: { $gte: 1}
        })
    }
}
module.exports = new MenuController();
