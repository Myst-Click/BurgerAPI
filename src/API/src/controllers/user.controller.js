'use strict'

const User = require('../models/user');
const Session = require('../models/session');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
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
    async checkout(monnaie,user){
        console.log(user);
        console.log(monnaie,user.monnaie)
        if(user.monnaie < monnaie) return "Commande non validée";
        else{
            user.monnaie -= monnaie;
            user.save(function(err){
                if(err) return "Commande non validée";
            });
            return "Commande validée";
        }
    }
    async setMonnaie(monnaie,idUser){
        var user = await this.getById(idUser);
        console.log(user)
        user.monnaie += monnaie;
        user.save(function(err){
            if(err) return false;
        });
        return true;
    }
    async login(email, password) {
        const user = await User.findOne({
            email : email
        });
        if(!user) {
            return null;
        }
        if(!bcrypt.compareSync(password,user.password)){
            return null;
        }
        const token = jwt.sign({email:email,password:password},'RESTFULAPIs');
        const creationDate = Date.now();
        var session = new Session({
            User : user,
            token : token,
            dateStart : creationDate.toString()
        })
        session.save(function(err){
            if(err) throw err;
        });
        return session;
    }
    async userFromToken(token) {
        return Session.findOne({
                token
        });
    }

    async logout(id){
        return await Session.deleteMany(
            {
                "User._id" : id 
            }
          );
    }
   
    async getById(id){
        return  await User.findOne({
            _id : id
        });
    };
}
module.exports = new UserController();