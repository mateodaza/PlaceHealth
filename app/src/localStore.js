import storedObservable from 'mobx-stored'

const defaultUser = {
    navSearchItem : '',
    sessionToken : 1011,
    isLogged: false,
    userEmail: '',
    userData: []
};

const observableUser = storedObservable('user', defaultUser, 500);

export default observableUser;
