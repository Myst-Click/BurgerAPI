'use strict'
const AuthMiddleWare = require('../middlewares/auth.middleware');
const CommandeController = require('../controllers').CommandeController;
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
module.exports = router;