'use strict'
const AuthMiddleWare = require('../middlewares/auth.middleware');
const PanierMiddleWare = require('../middlewares/panier.middleware');
const CommandeController = require('../controllers').CommandeController;
const VerifyValueController = require('../controllers').VerifyValueController;
const MenuController = require('../controllers').MenuController;
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
// Get Working Commandes
router.get('/inprogress',AuthMiddleWare.auth(),async(req,res)=>{
    const commandes = CommandeController.getCommandesInProgress(req.user._id)
    res.status(200).json({
        commandes : commandes
    })
})
// Get Done Commandes
router.get('/done',AuthMiddleWare.auth(),async(req,res)=>{
    const commandes = CommandeController.getCommandesDone(req.user._id)
    res.status(200).json({
        commandes : commandes
    })
})
router.get('/menus',async(req,res)=>{
    const menus = await CommandeController.getMenus();
    let menusInStock = [];
    let menuProcessed = 0
    menus.forEach(async(menu) => {
        menuProcessed ++;
        let isInStock = true;
        for (const [produitId, stock] of menu.produitsId) {
            isInStock = await VerifyValueController.isProduitInStock(produitId,stock);
            if(!isInStock){
                break;
            }
        }
        if(isInStock){
            menusInStock.push(menu);
        }
        if(menuProcessed === menus.length){
            res.status(200).json({
                menus : menusInStock
            })
        }
    })
})
router.get('/produits',async(req,res)=>{
    const produits = await CommandeController.getProduits();
    res.status(200).json({
        produits : produits
    })
})
router.get('/promotions',async(req,res)=>{
    const menu = await MenuController.getMenusWithPromo();
    res.status(200).json({
        menu : menu
    })
})
router.get('/panier',PanierMiddleWare.logPanier(CommandeController.panier),async(req,res)=>{
    console.log('pass',req.panierId)
    res.status(200).json({
        panier : CommandeController.panier[req.panierId],
        idPanier : req.panierId
    })
})
//Ajouter Panier
router.post('/produits',PanierMiddleWare.logPanier(CommandeController.panier),async(req,res)=>{
    const produit = await CommandeController.getProduit(req.body.id);
    if(produit && produit.stock > 0){
        await CommandeController.addProduitToPanier(req.body.id,req.panierId);
        res.status(200).json({
            panier : CommandeController.panier[req.panierId],
            idPanier : req.panierId
        })
    }
    else{
        res.status(400).json({
            message : "produit introuvable"
        })
    }
})
router.delete('/produits',PanierMiddleWare.logPanier(CommandeController.panier),async(req,res)=>{
    await CommandeController.delProduitToPanier(req.body.id,req.body.count,req.panierId);
    res.status(200).json({
        panier : CommandeController.panier[req.panierId],
        idPanier : req.panierId
    })
})
router.post('/menus',PanierMiddleWare.logPanier(CommandeController.panier),async(req,res)=>{
    const menu = await CommandeController.getMenu(req.body.id);
    if(menu){
        let isInStock = true;
        for (const [produitId, stock] of menu.produitsId) {
            isInStock = await VerifyValueController.isProduitInStock(produitId,stock);
            if(!isInStock) {
                res.status(400).json({
                    message : "Produit non disponible"
                });
            }
        }
        if(isInStock){
            for (const [produitId, stock] of menu.produitsId) {
                const produitInStock = await CommandeController.getProduit(produitId);
                produitInStock.stock -= stock;
                produitInStock.save(function(err){
                    if(err) throw err;
                })
            }

            await CommandeController.addMenutoPanier(req.body.id,req.panierId);
            res.status(200).json({
                panier : CommandeController.panier[req.panierId],
                idPanier : req.panierId
            })
        }

    }
    else{
        res.status(400).json({
            message : "Produit introuvable"
        })
    }
})
router.delete('/menus',PanierMiddleWare.logPanier(CommandeController.panier),async(req,res)=>{
    await CommandeController.delMenuToPanier(req.body.id,req.body.count,req.panierId);
    res.status(200).json({
        panier : CommandeController.panier[req.panierId],
        idPanier : req.panierId
    })
})

module.exports = router;
