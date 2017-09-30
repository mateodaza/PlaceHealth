import localStore from './localStore.js';

class auth{
    loggedIn(token){
        if(localStore.sessionToken == token){
            return true;
        }else{
            return false;
        }
    }
}

export default new auth;
