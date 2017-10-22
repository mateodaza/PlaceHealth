import db from '../database.js';

export default class clients {

    try(){
        alert('My name jeff');
    }

    createUser(id, nombre, email, password, type, callback){
        let cypherQuery = '';
        if(type === "Doctor"){
            cypherQuery = "CREATE (n: Doctor {doctorid: {id}, name:{name}, email:{email}, pass:{pass} }) RETURN n";
        }else{
            if(type === "Center"){
                cypherQuery = "CREATE (n: Center {doctorid: {id}, name:{name}, email:{email}, pass:{pass} }) RETURN n";
            }
        }
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

    findUser(em, callback){
        let cypherQuery = "MATCH (n { email: {email}}) RETURN n,labels(n) ";
        db.query(cypherQuery, {email: em}, function(err, results) {
            if (err) {
                return callback(err);
            } else {
                let result = results[0];
                return callback(result);
            }
        });
    }

    getCenters(callback){
        let cypherQuery = "MATCH (n:Center) RETURN n ";
        db.query(cypherQuery, function(err, results) {
            if (err) {
                return callback(err);
            } else {
                let result = results;
                return callback(result);
            }
        });
    }

    getAllUserInfo(em, callback){
        let cypherQuery = "MATCH (n { email: {email}})-[r]-(m) RETURN n,r,m ";
        db.query(cypherQuery, {email: em}, function(err, results) {
            if (err) {
                return callback(err);
            } else {
                let result = results;
                return callback(result);
            }
        });
    }

    setDocToExistingCenter(docEmail, centerName, callback){
        let cypherQuery = "MATCH (n:Doctor {email: {docEmail} }) " +
                        "MERGE (t:Center {name: {centerName}}) "+
                         "CREATE UNIQUE (n)-[:TRABAJA_EN] -> (t)";
        db.query(cypherQuery, {docEmail: docEmail, centerName: centerName}, function(err, results) {
            if (err) {
                console.error('Error creating new relation', err);
                return callback(err);
            } else {
                let result = results[0];
                console.log('Relation saved to database with id:', result);
                return callback(result);
            }
        });
    }


}