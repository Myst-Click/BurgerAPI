'use strict'
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
var express = require('express');
const AuthMiddleWare = require('../middlewares/auth.middleware')
const User = require('../models/user')
const Session = require('../models/session');
const UserController = require('../controllers').UserController;
const VerifyValueController = require('../controllers').VerifyValueController;
var bodyParser = require('body-parser');
var router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//Create User
router.post('/monnaie',AuthMiddleWare.auth(),async(req,res)=>{
    const monnaieToAdd = req.body.monnaie;
    const idUser = req.user._id;
    console.log(await UserController.getById(idUser));
    const result = await UserController.setMonnaie(monnaieToAdd,idUser);
    if(result){
        res.status(200).json({
            message : "Porte monnaie mis à jour"
        })
    }
    else{
        res.status(400).json({
            message : "Erreur lors de l'ajout du nouveau porte monnaie"
        })
    }
})
router.get('/',AuthMiddleWare.auth(),async(req,res)=>{
    const user = await UserController.getById(req.user._id);
    if(user){
        res.status(200).json({
            user : user
        })
    }
    else{
        res.status(400).json({
            message : "Erreur lors de la récuperation des données"
        })
    }
})

module.exports = router;