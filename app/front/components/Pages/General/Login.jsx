import React from 'react';
import { PageHeader, Form, FormGroup, FormControl, ControlLabel, Col, Button, ButtonToolbar} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from '../ReactComponents/MainHomeNavbar.jsx';
import Footer from '../ReactComponents/MainHomeFooter.jsx';

export default class Login extends React.Component {

    constructor(){
        super();
        this.state = {
            email: '',
            pass: '',
        };
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="divcontainer">
                    <PageHeader className="pageHeader"> Login </PageHeader>
                    <Form horizontal className="logForm">
                        <FormGroup controlId="formHorizontalEmail">
                            <Col componentClass={ControlLabel} sm={2}>
                                Email
                            </Col>
                            <Col sm={10} md={4}>
                                <FormControl type="email" placeholder="Email" value={this.state.email}/>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalPassword">
                            <Col componentClass={ControlLabel} sm={2}>
                                Password
                            </Col>
                            <Col sm={10} md={4}>
                                <FormControl type="password" placeholder="Password" value={this.state.pass}/>
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Col smOffset={2} sm={10}>
                                <ButtonToolbar>
                                    <Button bsStyle="custom" type="submit" className="formBtn1">
                                        Log in
                                    </Button>
                                    <LinkContainer to="#">
                                        <Button bsStyle="custom" type="submit" className="formBtn2" >
                                            or Sign up!
                                        </Button>
                                    </LinkContainer>
                                </ButtonToolbar>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
                <Footer />
            </div>
        );
    }
}