'use strict'
const AuthMiddleWare = require('../middlewares/auth.middleware');
const PanierMiddleWare = require('../middlewares/panier.middleware');
const CommandeController = require('../controllers').CommandeController;
const VerifyValueController = require('../controllers').VerifyValueController;
const ProduitsController = require('../controllers').ProduitsController;
var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());



//Produits
router.get('/produits/',AuthMiddleWare.auth(),async(req,res)=>{
    const produits = ProduitsController.getProduits(req.body.id)
    res.status(200).json({
        produits : produits
    })
})

router.post('/produits/',AuthMiddleWare.auth(),async(req,res)=>{
    const exists = await ProduitsController.getProduits(req.body.id);
    if(!exists){
        var produits = await ProduitsController.createProduit(req.params.name,
                                                              req.params.idCatégorie,
                                                              req.params.price,
                                                              req.params.stock);
        res.status(200).json({
            produits : produits
        })
    }
    else{
        res.status(400).json({
            message : `Le produit existe déjà et son id est : ${exists._id}`;
        })
    }
})

router.get('/produits/stock', AuthMiddleWare.auth(), async(req, res)=>{
  const stock = ProduitsController.verifStock(req.body.id)
  res.status(200).json({
      stock : stock
  })
})

router.put('/produits/stock', AuthMiddleWare.auth(), async(req, res)=>{
  const stock = ProduitsController.addtoStock(req.body.id, req.body.count);
  res.status(200).json({
      message : `Le stock a bien été mis à jour pour ce produit.`;
  })
})


//menus

router.put('/menu/price', AuthMiddleWare.auth(), async(req, res)=>{
  const stock = MenuController.changePrice(req.body.id, req.body.price);
  res.status(200).json({
      message : `Le stock a bien été mis à jour pour ce produit.`;
  })
})

router.post('/menu',AuthMiddleWare.auth(),async(req,res)=>{
    const exists = await Menu.getProduits(req.body.id);
    if(!exists){
        var menu = await MenuController.createMenu(req.params.name,
                                                   req.params.price
                                                   req.params.promotion);
        res.status(200).json({
            menu : menu
        })
    }
    else{
        res.status(400).json({
            message : `Le menu existe déjà et son id est : ${exists._id}`;
        })
    }
})

router.put('/menu/promotion', AuthMiddleWare.auth(), async(req, res)=>{
  const price = MenuController.addPromotion(req.body.id, req.body.promotion);
  res.status(200).json({
      message : `La promotion a bien été ajoutée.`;
  })
})


module.exports = router;
