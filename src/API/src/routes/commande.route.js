'use strict'
const AuthMiddleWare = require('../middlewares/auth.middleware');
const CommandeController = require('../controllers').CommandeController;
const VerifyValueController = require('../controllers').VerifyValueController;
var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());



//Get Commandes
router.get('/',AuthMiddleWare.auth(),async(req,res)=>{
    const commandes = CommandeController.getCommandes(req.user._id)
    res.status(200).json({
        commandes : commandes
    }) 
})
router.get('/menus',async(req,res)=>{
    const menus = await CommandeController.getMenus();
    var menusInStock = [];
    menus.forEach(element => {
        let isInStock = true;
        element.produitsId.forEach(id=>{
            if(!VerifyValueController.isProduitInStock(id)){
                isInStock = false;
                return;
            }
            if(isInStock) menusInStock.push(element);
        })
    });
    res.status(200).json({
        menus : menusInStock
    })
})
router.get('/produits',async(req,res)=>{
    const produits = await CommandeController.getProduits();
    res.status(200).json({
        produits : produits
    })
})
router.get('/promotions',async(req,res)=>{

})
router.get('/panier',async(req,res)=>{
    res.status(200).json({
        panier : CommandeController.panier
    })
})
//Ajouter Panier
router.post('/produit',async(req,res)=>{
    const produit = await CommandeController.getProduit(req.body.id);
    if(produit){
        CommandeController.addProduitToPanier(req.body.id);
        res.status(200).json({
            panier : CommandeController.panier
        })
    }
    else{
        res.status(400).json({
            message : "produit introuvable"
        })
    }
})
router.delete('/produit',async(req,res)=>{
    await CommandeController.delProduitToPanier(req.body.id,req.body.count);
    res.status(200).json({
        panier : CommandeController.panier
    })
})
router.post('/menu',async(req,res)=>{
    const menu = await CommandeController.getMenu(req.body.id);
    if(menu){
        CommandeController.addMenutoPanier(req.body.id);
        res.status(200).json({
            panier : CommandeController.panier
        })
    }
    else{
        res.status(400).json({
            message : "menu introuvable"
        })
    }
})
router.delete('/menu',async(req,res)=>{
    await CommandeController.delMenuToPanier(req.body.id,req.body.count);
    res.status(200).json({
        panier : CommandeController.panier
    })
})

module.exports = router;