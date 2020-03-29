const UserController = require('../controllers').UserController;

class AuthMiddleware {

    static auth() {
        return async function(req, res, next) {
            const token = req.headers['authorization'];
            const session = await UserController.userFromToken(token);
            if(!session) {
                res.status(403).end();
                return;
            }
            const tmp = Date.now - session.dateStart;
            tmp = Math.floor((tmp-diff.sec)/60);
            const diffMin = tmp % 60; 
            if(diffMin > 20){
                res.status(403).end();
                return;
            }     
            req.user = session.user;
            next();
        };
    }
}

module.exports = AuthMiddleware;