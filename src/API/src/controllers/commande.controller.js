const Command = require('../models/commande');
const Produits = require('../models/produits');
const Menu = require('../models/menu');
const UserController = require('../controllers/user.controller')
var mongoose = require('mongoose')
const VerifyValueController = require('../controllers/verifyValue.controller')

class CommandeController{
    constructor(){
        this.id = 0;
        this.panier = new Map();
    }
    async createCommande(panierId){
        var command = new Command({
            menusId : Object.entries(this.panier[panierId].menusId),
            produitsId : Object.entries(this.panier[panierId].produitsId),
            idUser : this.panier[panierId].user
        })

        command.save(function(err){
            if(err) throw err;
        })
    }
    async createPanier(){
        this.panier[this.id] = new Object();
        this.panier[this.id].menusId = new Map();
        this.panier[this.id].produitsId = new Map();
        this.panier[this.id].user = String;
        
        this.id ++;
        return (this.id - 1);
    }
    async addProduitToPanier(produitID,panierId){
        var produit = await this.getProduit(produitID);
        produit.stock -= 1;
        produit.save(function(err){
            if(err) throw err;
        })
        if(produitID in this.panier[panierId].produitsId){
            this.panier[panierId].produitsId[produitID] +=1;
        }
        else{
            this.panier[panierId].produitsId[produitID] = 1;
        } 
    }
    async addMenutoPanier(menu,panierId){
        if(menu in this.panier[panierId].menusId){
            this.panier[panierId].menusId[menu] +=1;
        }
        else this.panier[panierId].menusId[menu] = 1;
    }
    async addProduitToStock(produitId,count){
        console.log(" produit stock ",produitId,count)
        var produit = await this.getProduit(produitId)
        produit.stock += count;
        produit.save(function(err){
            if(err) throw err;
        })
    }
    async delProduitToPanier(produitId, count,panierId){
        if(produitId in this.panier[panierId].produitsId){
            if(count >= this.panier[panierId].produitsId[produitId])
            {
                this.addProduitToStock(produitId,this.panier[panierId].produitsId[produitId])
                delete this.panier[panierId].produitsId[produitId]
            }
            else {
                this.addProduitToStock(produitId,count)
                this.panier[panierId].produitsId[produitId] -=count;
            }
        }
    }
    async delMenuToPanier(menuId, count,panierId){
        if(menuId in this.panier[panierId].menusId){
            const menu = await this.getMenu(menuId);
            for (const [produitId, stock] of menu.produitsId) {
                this.addProduitToStock(produitId,stock)
            }
            if(count >= this.panier[panierId].menusId[menuId])
            {
                delete this.panier[panierId].menusId[menuId]
            }
            else this.panier[panierId].menusId[menuId] -=count;
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
    async checkout(panierId,user){
        const panier = this.panier[panierId];
        panier.user = user._id;
        var bill = 0;
        for(let menuId of Object.keys(panier.menusId)){
            const menu = await this.getMenu(menuId)
            bill += menu.prix * panier.menusId[menuId];
        }
        for(let produitId of Object.keys(panier.produitsId)){
            const produit = await this.getProduit(produitId)
            bill += produit.prix * panier.produitsId[produitId];
        }
        const succes = await UserController.checkout(bill,user);
        if(succes !="Commande non validée"){
            this.createCommande(panierId);
            return succes;
        }
        return succes;
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