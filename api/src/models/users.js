import db from '../database.js';
//import nodemailer from 'nodemailer';

export default class clients {

    try(){
        alert('My name jeff');
    }

    sendMail(userMail, voucherCode){
        /*
        // TO DO AT THE BACK 

        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        nodemailer.createTestAccount((err, account) => {

            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: 'ujir2as4cghrifqr@ethereal.email',
                    pass: 'FxrrsWEkejrUHeCpAs'
                }
            });

            // setup email data with unicode symbols
            let mailOptions = {
                from: '"Place Health 👻" <foo@blurdybloop.com>', // sender address
                to: {userEmail}, // list of receivers
                subject: 'Place Health Request ✔', // Subject line
                text: 'Tu código promocional es: '+{voucherCode}, // plain text body
                html: '<b>Hello world?</b>' // html body
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            });
        });
        */
    }

    createUser(id, nombre, email, password, type, callback){
        let cypherQuery = '';
        if(type === "Doctor"){
            cypherQuery = "CREATE (n: Doctor {doctorid: {id}, name:{name}, email:{email}, pass:{pass}, state:'false' }) RETURN n";
        }else{
            if(type === "Center"){
                cypherQuery = "CREATE (n: Center {doctorid: {id}, name:{name}, email:{email}, pass:{pass}, state:'false' }) RETURN n";
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

    getServices(callback){
        let cypherQuery = "MATCH (n:Service) RETURN n ";
        db.query(cypherQuery, function(err, results) {
            if (err) {
                return callback(err);
            } else {
                let result = results;
                return callback(result);
            }
        });
    }

    getSpecialties(callback){
        let cypherQuery = "MATCH (n:Specialty) RETURN n ";
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

    getAllServices(callback){
        let cypherQuery = "MATCH (n:Service) RETURN n ";
        db.query(cypherQuery, function(err, results) {
            if (err) {
                return callback(err);
            } else {
                let result = results;
                return callback(result);
            }
        });
    }

    getAllSpecialties(callback){
        let cypherQuery = "MATCH (n:Specialty) RETURN n ";
        db.query(cypherQuery, function(err, results) {
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

    setDocToSpecialty(docEmail, specialtyName, callback){
        let cypherQuery = "MATCH (n:Doctor {email: {docEmail} }) " +
            "MERGE (t:Specialty {name: {specialtyName}}) "+
            "CREATE UNIQUE (n)-[:ESPECIALISTA_EN] -> (t)";
        db.query(cypherQuery, {docEmail: docEmail, specialtyName: specialtyName}, function(err, results) {
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

    setCenterToSpecialty(docEmail, specialtyName, callback){
        let cypherQuery = "MATCH (n:Center {email: {docEmail} }) " +
            "MERGE (t:Specialty {name: {specialtyName}}) "+
            "CREATE UNIQUE (n)-[:ESPECIALIZA_EN] -> (t)";
        db.query(cypherQuery, {docEmail: docEmail, specialtyName: specialtyName}, function(err, results) {
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

    setCenterToService(centerEmail, serviceName, callback){
        let cypherQuery = "MATCH (n:Center {email: {centerEmail} }) " +
            "MERGE (t:Service {name: {serviceName}}) "+
            "CREATE UNIQUE (n)-[:OFRECE] -> (t)";
        db.query(cypherQuery, {centerEmail: centerEmail, serviceName: serviceName}, function(err, results) {
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

    setDocSpecialtyRelation(doc, specialty, name, address, phone, description , callback){
        let cypherQuery = "MATCH (n:Doctor {email: {doc} })-[r:ESPECIALISTA_EN]->(t:Specialty {name: {specialty}}) " +
            "SET r.name={name}, r.address={address}, r.phone={phone}, r.description={description}";
        db.query(cypherQuery, {doc: doc, specialty: specialty, name: name, address: address, phone: phone, description: description}, function(err, results) {
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

    updateCenterInfo(centerEmail, address, phone, callback){
        let cypherQuery = "MATCH (n:Center {email: {centerEmail} }) " +
            "SET n.address={address}, n.phone={phone}"
        db.query(cypherQuery, {centerEmail: centerEmail, address: address, phone: phone}, function(err, results) {
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

    getInfoSearh(name, callback){
        //Lon.*'
        let cypherQuery = "MATCH (n {name: {name}})-[r]-(m) " +
                        "WHERE n.type =~ 's.*' " +
                        "RETURN n,r,m";
        db.query(cypherQuery, {name: name}, function(err, results) {
            if (err) {
                return callback(err);
            } else {
                let result = results;
                return callback(result);
            }
        });
    }

    setAppointment(email, service, username, userId, userEmail, userDesc, code, callback){
        let cypherQuery = "MATCH (n {email: {email} }) " +
            "MERGE (t:Patient {name: {username}, userId: {userId}, email:{userEmail}}) "+
            "CREATE UNIQUE (t)-[r:SOLICITA]-> (n) "+
            "SET r.patientName={username}, r.code={code},r.service={service}, r.patientId={userId}, r.patientEmail={userEmail}, r.patientDesc={userDesc} ";
        db.query(cypherQuery, {email: email, service: service, username: username,
                                userId: userId, userEmail: userEmail, userDesc: userDesc, code: code}, function(err, results) {
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

    getAppointments(email, callback){
        //Lon.*'
        let cypherQuery = "MATCH (n { email: {email} })-[r]-(m:Patient) RETURN n,r,m ";
        db.query(cypherQuery, {email: email}, function(err, results) {
            if (err) {
                return callback(err);
            } else {
                let result = results;
                return callback(result);
            }
        });
    }

    changeStateUser(email, value,  callback){
        let cypherQuery = "MATCH (n {email: {email} }) " +
            "SET n.state={value} RETURN n"
        db.query(cypherQuery, {email: email, value: value}, function(err, results) {
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