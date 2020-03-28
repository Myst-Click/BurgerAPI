'use strict'

const User = require('../models/user');

class UserController{

    async createUser(idCategorieUser,name,password,birth,email,adresse,phone,monnaie){
        var newUser = new User({
            idCategorieUser : idCategorieUser,
            name:name,
            password: password,
            birth : birth,
            email : email,
            adresse : adresse,
            phone : phone,
            monnaie : monnaie
        });

        newUser.save(function(err){
            if(err) throw err;
        });

        return newUser;
    }

   
    async getById(id){
        return  User.findOne({
            _id : id
        });
    };
}
module.exports = new UserController();