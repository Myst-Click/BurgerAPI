'use strict'
const Attraction = require('../models/user')
const Parcours = require('../models/user')
class verifyValueController{

    async availableValueForUser(idCategorie,name,email,birth,phone){
        var result = new Object()
        const typeName = typeof name;
        const typeCategorie = typeof idCategorie ;
        const typeMail = typeof email;
        const typeBirth = typeof birth;
        const typePhone = typeof phone;
    
        if (typeMail !== "string" 
            ||typeName !== "string"
            ||typeCategorie !== "number"
            ||typeBirth !== "string"
            ||typePhone !== "string") result[false] = "Format des variables incorrects";
        else if(idCategorie == 0 || idCategorie > 3) result[false] = "La variable idCategorie doit se trouver entre 1 et 3";
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
}
module.exports = new verifyValueController()