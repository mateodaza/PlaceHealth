import React from 'react';
import { PageHeader, Radio, Form, FormGroup, FormControl, ControlLabel, Col, Button, ButtonToolbar} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from '../ReactComponents/Navbar.jsx';
import bcrypt from 'bcryptjs';

import { observer } from 'mobx-react';
import localStore from '../../../../src/localStore.js'
import auth from '../../../../src/auth.js';
//Database
import user from '../../../../../api/src/models/users.js';

@observer export default class SignUp extends React.Component {

    constructor(){
        super();
        this.state = {
            email: '',
            pass: '',
            pass2: '',
            specialty: '',
            name: '',
            type: 0,
            notValidated: true
        };
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    getType(e){
        this.setState({type: e.target.value, notValidated: false});
    }

    signUp(e){
        e.preventDefault();
        let pass = this.state.pass;
        let name = this.state.name;
        let email = this.state.email;
        let type = this.state.type;

        if(this.state.pass === this.state.pass2){
            bcrypt.hash(pass, 8, function(err, hash) {
                if(email !=='' && name !=='' && Number(type) !== 0){
                    if(Number(type) === 1){  //1= doctor, 2=center
                        //Registration Doctor
                        let doctor = new user();
                        let id = new Date().getTime();
                        doctor.createUser(id, name, email, hash, "Doctor", function (data){
                            if(typeof data !== 'undefined'){
                                alert('Success!');
                                localStore.userEmail = email;
                                localStore.sessionToken = auth.generateToken(data);
                                localStore.isLogged = true;
                                window.location = ("/#/auth");
                            } else{
                                alert('Sorry, I cannot do that.');
                            }
                        });
                    }else{
                        let center = new user();
                        let id = new Date().getTime();
                        center.createUser(id, name, email, hash, "Center", function (data){
                            if(typeof data !== 'undefined'){
                                alert('Success!');
                                localStore.userEmail = email;
                                localStore.sessionToken = auth.generateToken(data);
                                localStore.isLogged = true;
                                window.location = ("/#/auth");
                            } else{
                                alert('Sorry, I cannot do that.');
                            }
                        });
                    }
                }else{
                    alert("Please fill all fields.");
                }
            });
        }else{
            alert("Please verify your password.");
            this.setState({pass: '', pass2: ''});
        }
    }
    render() {
        return (
            <div>
                <Navbar type="navbar loginNavbar"/>
                <div className="divContainer">
                    <PageHeader className="pageHeader"> Registration Form </PageHeader>
                    <Form horizontal className="logForm">
                        <FormGroup controlId="formHorizontalEmail">
                            <Col componentClass={ControlLabel} sm={2}>
                                Email
                            </Col>
                            <Col sm={10} md={4}>
                                <FormControl type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange.bind(this)}/>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalPassword">
                            <Col componentClass={ControlLabel} sm={2}>
                                Password
                            </Col>
                            <Col sm={10} md={4}>
                                <FormControl type="password" name="pass" placeholder="Password" value={this.state.pass} onChange={this.handleChange.bind(this)}/>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalPassword">
                            <Col componentClass={ControlLabel} sm={2}>
                                Verify Password
                            </Col>
                            <Col sm={10} md={4}>
                                <FormControl type="password" name="pass2" placeholder="Verify Password" value={this.state.pass2} onChange={this.handleChange.bind(this)}/>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalPassword">
                            <Col componentClass={ControlLabel} sm={2}>
                                Nombre
                            </Col>
                            <Col sm={10} md={4}>
                                <FormControl type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleChange.bind(this)}/>
                            </Col>
                        </FormGroup>

                        <FormGroup >
                            <Col componentClass={ControlLabel} sm={2}>
                                Tipo Perfil
                            </Col>
                            <Col sm={2} md={1}>
                                <Radio name="radioGroup" value={1} onClick={this.getType.bind(this)}>
                                    Doctor
                                </Radio>
                            </Col>
                            <Col sm={2} md={2}>
                                <Radio name="radioGroup" value={2} onClick={this.getType.bind(this)}>
                                    Centro Médico
                                </Radio>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col smOffset={2} sm={10}>
                                 <ButtonToolbar >
                                     <Button type="submit" onClick={this.signUp.bind(this)} disabled={this.state.notValidated}>Sign up</Button>
                                 </ButtonToolbar>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        );
    }
}