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

    async addProduitToPanier(produit){
        if(produit in this.panier.produitsId){
            this.panier.produitsId[produit] +=1;
        }
        else{
            console.log("not pass")
            this.panier.produitsId[produit] = 1;
        } 
    }
    async addMenutoPanier(menu){
        if(menu in this.panier.menusId){
            this.panier.menusId[menu] +=1;
        }
        else this.panier.menusId[menu] = 1;
    }
    async delProduitToPanier(produit, count){
        if(produit in this.panier.produitsId){
            if(count >= this.panier.produitsId[produit])
            {
                delete this.panier.produitsId[produit]
            }
            else this.panier.produitsId[produit] -=count;
        }
    }
    async delMenuToPanier(menu, count){
        if(menu in this.panier.menusId){
            if(count >= this.panier.menusId[menu])
            {
                delete this.panier.menusId[menu]
            }
            else this.panier.menusId[menu] -=count;
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