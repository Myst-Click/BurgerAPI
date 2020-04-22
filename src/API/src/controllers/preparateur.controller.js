const Command = require('../models/commande');
const Produits = require('../models/produits');
const Menu = require('../models/menu');
var mongoose = require('mongoose')
const VerifyValueController = require('../controllers/verifyValue.controller')

class PreparateurController{
  async getCommandes(){
      return await Command.find({
          isDone : false
      })
  }

  async setCommandeDone(id){
      var command = Command.find(){
          _id : id
      }
      if(!command){
          return null;
      }
      command.isDone : true;
      return true;
  }

}

module.exports = new PreparateurController();
