import storedObservable from 'mobx-stored'

const defaultUser = {
 email : '',
 password : '',
 idHash : '',
 isLogged : false,

 name : '',
 lastname : '',
 picture : 'http://i.imgur.com/AIVIVIk.png',
 phone : 0,
 type:'',
 result : [],
 selection : '',
 selectedField : '',

 selectState : false,
 sessions : [],
 mentorInfo : [],
 mentorTopics : [],
 allTopics : [],
 allFields : [],

};

const observableUserProfile = storedObservable('user', defaultUser, 500);

export default observableUserProfile;
