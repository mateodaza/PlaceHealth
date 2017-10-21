import db from '../database.js';


export default class clients {

    try(){
        alert('My name jeff');
    }
    //DO REAL QUERIES
    createDoctor(id, nombre, email, password, callback){
        let cypherQuery = "CREATE (n: Doctor {doctorid: {id}, name:{name}, email:{email}, pass:{pass} }) RETURN n";
        db.query(cypherQuery, {id: id, name: nombre, email: email, pass: password}, function(err, results) {
            if (err) {
                console.error('Error saving new node to database:', err);
                return callback(err);
            } else {
                let result = results[0];
                console.log('Node saved to database with id:', result.id);
                return callback(result);
            }
        });
    }

    findDoctor(em, callback){
        let cypherQuery = "MATCH (n:Doctor { email: {email}}) RETURN n ";
        db.query(cypherQuery, {email: em}, function(err, results) {
            if (err) {
                return callback(err);
            } else {
                let result = results[0];
                return callback(result);
            }
        });
    }



}