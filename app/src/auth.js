import localStore from './localStore.js';
import jwt from 'jsonwebtoken';

class auth{

    generateToken(user){
        return jwt.sign(user, "shhhhh");
    }

    validateToken(token){
        jwt.verify(token,
            "shhhhh",
            function(err, decoded) {
                if (err) {
                    localStore.isLogged = false;
                } else {
                    localStore.isLogged = true;
                }
            });
    }
}

export default new auth;
