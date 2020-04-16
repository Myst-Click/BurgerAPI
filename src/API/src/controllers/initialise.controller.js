'use strict'
const User = require('../models/user');
const CategorieUser = require('../models/categorie/categorieUser')
const CategorieProduit = require('../models/categorie/categorieProduit')
const CategorieMenu = require('../models/categorie/categorieMenu')
//const mongoose = require('mongoose');
class InitialiseController{

    async initialise(){
        await CategorieUser.findOne({
            name : "Admin"
        },function(err,result){
            if(result == null){
                const categoriUser1 = new CategorieUser({       
                    name : "Admin"
                });
                const categoriUser2 = new CategorieUser({          
                    name : "Customer"
                });
                const categoriUser3 = new CategorieUser({        
                    name : "Préparateur"
                });
                categoriUser1.save(function(err){
                    if(err) console.log(err);
                });
                categoriUser2.save(function(err){
                    if(err) console.log(err);
                });
                categoriUser3.save(function(err){
                    if(err) console.log(err);
                });
                
            }
        })
    

        await CategorieMenu.findOne({
            name : "Burger"
        },function(err,result){
            if(result == null){
                const categoriMenu1 = new CategorieMenu({
                    name : "Burger"
                });
                const categoriMenu2 = new CategorieMenu({
                    name : "Wrap"
                });
                const categoriMenu3 = new CategorieMenu({
                    name : "Vegetarien"
                });

                categoriMenu1.save(function(err){
                    if(err) throw err;
                });
                categoriMenu2.save(function(err){
                    if(err) throw err;
                });
                categoriMenu3.save(function(err){
                    if(err) throw err;
                });   
            }
        })

        await CategorieProduit.findOne({
            name : "Nourriture"
        },function(err,result){
            if(result == null){
                const categoriProduit1 = new CategorieProduit({
                    name : "Nourriture"
                });
                const categoriProduit2 = new CategorieProduit({
                    name : "Dessert"
                });
                const categoriProduit3 = new CategorieProduit({
                    name : "Boisson"
                });

                categoriProduit1.save(function(err){
                    if(err) throw err;
                });
                categoriProduit2.save(function(err){
                    if(err) throw err;
                });
                categoriProduit3.save(function(err){
                    if(err) throw err;
                });
                
            }
        })
    }
}
module.exports = new InitialiseController()