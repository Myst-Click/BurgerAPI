const UserController = require('../controllers').UserController;

class AuthMiddleware {

    static auth() {
        return async function(req, res, next) {
            const token = req.headers['authorization'];
            const session = await UserController.userFromToken(token);
            if(!session) {
                res.status(403).json({
                    token : token
                }).end();
                return;
            }
            const dateNow = Date.now();
            const dateNowString = dateNow.toString();
            const tmp = parseInt(dateNowString) - parseInt(session.dateStart);
            const diffMin = tmp % 60; 
            if(diffMin > 20){
                res.status(403).end();
                return;
            }   
            req.user = session.User;
            next();
        };
    }
}

module.exports = AuthMiddleware;