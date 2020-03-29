const Command = require('../models/commande');

class CommandeController{

    async getCommandes(id){
        return await Command.find({
            idUser : id
        })
    }
    async getCommandesInProgress(id){
        return await Command.find({
            idUser : id,
            isDone : false
        })
    }
    async getCommandesDone(id){
        return await Command.find({
            idUser : id,
            isDone : true
        })
    }
}
module.exports = new CommandeController();