'use strict'
const Attraction = require('../models/user')
const Parcours = require('../models/user')
const Produits = require('../models/produits');
const CategorieUser = require('../models/categorie/categorieUser')
class verifyValueController{

    async availableValueForUser(idCategorie,name,email,birth,phone){
        var result = new Object()
        const typeName = typeof name;
        const typeMail = typeof email;
        const typeBirth = typeof birth;
        const typePhone = typeof phone;
        const categoriUser = await CategorieUser.findOne({
            _id : idCategorie
        });
        if(categoriUser == null){
            result[false] = "La variable idCategorie n'existe pas";
        }
        else if (typeMail !== "string" 
            ||typeName !== "string"
            ||typeBirth !== "string"
            ||typePhone !== "string") result[false] = "Format des variables incorrects";
        else if(!email.includes('@')) result[false] = "La variable email attend un email au format valide";
        else{
            try{
                const dateBirth = Date.parse(birth);
            }
            catch(error){
                result[false] = error;
            }
        }
        
        return result;
    }

    async isProduitInStock(idProduit,count){
        var produit = await Produits.findOne({
            _id : idProduit
        })
        if(produit.stock >= count) return true;
        return false;
    }
}
module.exports = new verifyValueController()