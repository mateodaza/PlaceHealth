import React from 'react';
import { PageHeader, Form, FormGroup, FormControl, ControlLabel, Col, Button, ButtonToolbar} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from '../ReactComponents/Navbar.jsx';

import { observer, observable } from 'mobx-react';
import localStore from '../../../../src/localStore.js'
import auth from '../../../../src/auth.js';
import bcrypt from 'bcryptjs';

//Database
import dbuser from '../../../../../api/src/models/users.js';

@observer export default class Login extends React.Component {

    constructor(){
        super();
        this.state = {
            email: '',
            pass: '',
        };
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    login(event){
        event.preventDefault();
        //Check authentication from database, if true generate token.
        // localStore.dispose();  //To clean the store
        // localStore.reset();   //To reset default values
        let user = new dbuser();
        let password = this.state.pass;
        user.findUser(this.state.email, function (data){
            let userData = data.n;
            if(userData.pass !== undefined){
                bcrypt.compare(password, userData.pass, function(err, res) {
                    if(res===true){
                        localStore.userEmail = userData.email;
                        localStore.sessionToken = auth.generateToken(userData);
                        localStore.isLogged = true;
                        window.location.assign("/#/auth");
                    }
                });
            }else{
                this.setState({email: '', pass: ''});
                alert('Have you joined us?');
            }
        }.bind(this));

    }

    render() {
        return (
            <div>
                <Navbar type="navbar loginNavbar"/>

                <div className="divContainer">
                    <PageHeader className="pageHeader"> Login </PageHeader>
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
                        <FormGroup>
                            <Col smOffset={2} sm={10}>
                                <ButtonToolbar>
                                    <LinkContainer to="#">
                                        <Button type="submit" className="formBtn1" onClick={this.login.bind(this)}>
                                            Log in
                                        </Button>
                                    </LinkContainer>
                                    <LinkContainer to="/signup">
                                        <Button type="submit" className="formBtn2">
                                            or Sign up!
                                        </Button>
                                    </LinkContainer>
                                </ButtonToolbar>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        );
    }
}