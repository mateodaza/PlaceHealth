import storedObservable from 'mobx-stored'

const defaultUser = {

    navSearchItem : '',
    sessionToken : 1011,

};

const observableUser = storedObservable('user', defaultUser, 500);

export default observableUser;
