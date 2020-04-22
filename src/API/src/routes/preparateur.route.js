'use strict'
const AuthMiddleWare = require('../middlewares/auth.middleware');
const PanierMiddleWare = require('../middlewares/panier.middleware');
const CommandeController = require('../controllers').CommandeController;
const VerifyValueController = require('../controllers').VerifyValueController;
const ProduitsController = require('../controllers').ProduitsController;
const PreparateurController = require('../controllers').PreparateurController;
var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/commandes',AuthMiddleWare.auth(),async(req,res)=>{
    const commandes = PreparateurController.getCommandes();
    res.status(200).json({
        commandes : commandes
    })
})

router.put('/commandeDone', AuthMiddleWare.auth(), async(req, res)=>{
    const done = PreparateurController.setCommandeDone(req.body.id);
    if(done){
        res.status(200).json({
            message : "La commande a été préparée."
        })
    }else{
      res.status(404).json({
          message : "La commande n'existe pas."
      })
    }
})


module.exports = router;
