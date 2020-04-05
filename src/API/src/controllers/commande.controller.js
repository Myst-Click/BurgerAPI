const Command = require('../models/commande');
const Produits = require('../models/produits');
const Menu = require('../models/menu');
var mongoose = require('mongoose')
const VerifyValueController = require('../controllers/verifyValue.controller')

class CommandeController{
    constructor(){
        this.panier = new Object();
        this.panier.menusId = new Map();
        this.panier.produitsId = new Map();
        this.panier.user = String;
        this.panier.isDone = false;
    }

    async addProduitToPanier(produitID){
        var produit = await this.getProduit(produitID);
        produit.stock -= 1;
        produit.save(function(err){
            if(err) throw err;
        })
        if(produitID in this.panier.produitsId){
            this.panier.produitsId[produitID] +=1;
        }
        else{
            this.panier.produitsId[produitID] = 1;
        } 
    }
    async addMenutoPanier(menu){
        if(menu in this.panier.menusId){
            this.panier.menusId[menu] +=1;
        }
        else this.panier.menusId[menu] = 1;
    }
    async addProduitToStock(produitId,count){
        console.log(" produit stock ",produitId,count)
        var produit = await this.getProduit(produitId)
        produit.stock += count;
        produit.save(function(err){
            if(err) throw err;
        })
    }
    async delProduitToPanier(produit, count){
        if(produit in this.panier.produitsId){
            if(count >= this.panier.produitsId[produit])
            {
                this.addProduitToStock(produit,this.panier.produitsId[produit])
                delete this.panier.produitsId[produit]
            }
            else {
                this.addProduitToStock(produit,count)
                this.panier.produitsId[produit] -=count;
            }
        }
    }
    async delMenuToPanier(menuId, count){
        if(menuId in this.panier.menusId){
            const menu = await this.getMenu(menuId);
            for (const [produitId, stock] of menu.produitsId) {
                this.addProduitToStock(produitId,stock)
            }
            if(count >= this.panier.menusId[menuId])
            {
                delete this.panier.menusId[menuId]
            }
            else this.panier.menusId[menuId] -=count;
        }
    }
    async getCommandes(id){
        return await Command.find({
            idUser : id
        })
    }
    async getCommandesInProgress(id){
        return await Command.find({
            idUser : id,
            isDone : false
        })
    }
    async getCommandesDone(id){
        return await Command.find({
            idUser : id,
            isDone : true
        })
    }
    isTrue(){
        return true;
    }

    async getMenus(){
        return await Menu.find();
    }
    async getProduits(){
        return await Produits.find({
            stock: { $gte: 1}
        })
    }
    async getProduit(id){
        return await Produits.findOne({
            _id : id
        })
    }
    async getMenu(id){
        return await Menu.findOne({
            _id : id
        })
    }
}
module.exports = new CommandeController();