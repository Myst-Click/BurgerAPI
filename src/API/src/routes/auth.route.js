'use strict'
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
var express = require('express');
const User = require('../models/user')
const UserController = require('../controllers').UserController;
const VerifyValueController = require('../controllers').VerifyValueController;
var bodyParser = require('body-parser');
var router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//Create User
router.post('/signin',async(req,res)=>{
    const result = await VerifyValueController.availableValueForUser(req.body.idCategorie,req.body.name,req.body.email,req.body.birth,req.body.phone);
    
    if(false in result){
        res.status(400).json({
            success : false,
            message : result[false]
            });
    }
    else{
        await User.findOne({
            email : req.body.email
        },function(err,result){
        if(result) res.json({
            success : false,
            message : "Email déja utilisé"
            });
        else{
            const cryptedPassword = bcrypt.hashSync(req.body.password,5);
            const p = UserController.createUser(req.body.idCategorie,req.body.name,cryptedPassword,req.body.birth,req.body.email,req.body.adresse,req.body.phone,0); 
              if(p === undefined) res.json({
                success : false,
                message : "Impossible de creer cet utilisateur, veuillez vérifier la syntaxe"
                });
              else res.sendStatus(201).end();
            }
        })
    }
})
module.exports = router;