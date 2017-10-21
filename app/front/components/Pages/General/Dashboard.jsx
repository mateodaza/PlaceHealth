import React from 'react';
import { PageHeader, Tabs, Tab, Alert, Modal, Button, Col, Form, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import Navbar from '../ReactComponents/Navbar.jsx';

import { observer } from 'mobx-react';
import localStore from '../../../../src/localStore.js';
//Database
import dbuser from '../../../../../api/src/models/users.js';

@observer export default class Dashboard extends React.Component {
    constructor(){
        super();
        this.state={
            showSpecialtyModal : false,
            showCenterModal: false,
            centerPhone: '',
            centerAddress: ''
        }
    }

    close(e) {
        this.setState({ showSpecialtyModal: false, showCenterModal:false });
    }

    open(e) {
        this.setState({ [e.target.name]: true });
    }

    componentDidMount(){
        this.getData();
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    getData(){
        let user = new dbuser();
        user.getAllUserInfo(localStore.userEmail, function (data){
            localStore.userData = data;
            console.log(localStore.userData);
        });
    }

    render() {
        return (
            <div>
                <Navbar type="navbar loginNavbar"/>
                <div className="divContainer">
                    <PageHeader className="pageHeader"> Welcome Doc! </PageHeader>
                    <Tabs defaultActiveKey={1} id="noanim-tab-example">
                        <Tab eventKey={1} title="Profile">
                            <div className="divContainer">
                                <Alert bsStyle="danger">
                                    <strong>Holy guacamole!</strong> Set your information so people can see you!
                                </Alert>
                                <Col xs={6} md={4} >
                                    <h3> Name: <span style={{color: 'grey'}}> jeff </span></h3>
                                    <h3> Email: <span style={{color: 'grey'}}>  {localStore.userEmail} </span></h3>
                                </Col>
                                <Col xs={6} md={4} >
                                    <h3> Medical Center </h3>
                                    <div style={{marginBottom: '1em'}}>
                                        Medical info here pls
                                    </div>
                                    <Button type="submit" bsSize="small" className="formBtn1"
                                        name="showCenterModal" onClick={this.open.bind(this)}>
                                        Set Medical Center
                                    </Button>
                                </Col>
                                <Col xsHidden md={4} >
                                    <h3> Specialties </h3>
                                    <div style={{marginBottom: '1em'}}>
                                        Sepcialty info here pls
                                    </div>
                                    {/* According to type */}
                                    <Button type="submit" bsSize="small" className="formBtn1"
                                            name="showSpecialtyModal" onClick={this.open.bind(this)}>
                                        Add New Specialty
                                    </Button>
                                </Col>


                                {/*MODAL FOR SETTING SPECIALTIES*/}
                                <Modal show={this.state.showSpecialtyModal} onHide={this.close.bind(this)}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Set Specialty</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form horizontal className="logForm">
                                            <FormGroup controlId="formSPecialty">
                                                <Col componentClass={ControlLabel} sm={2}>
                                                    Select Specialty
                                                </Col>
                                                    List here
                                            </FormGroup>
                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button type="submit" bsSize="small" className="formBtn1"
                                                name="setMedCenter" >
                                            Set Specialty
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                                {/*-----------------------*/}
                                {/*MODAL FOR SETTING MEDICAL CENTER*/}
                                <Modal show={this.state.showCenterModal} onHide={this.close.bind(this)}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Set Medical Center</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Tabs defaultActiveKey={1} id="noanim-tab-example">
                                            <Tab eventKey={1} title="Your Own Medical Center">
                                                <Form style={{marginTop: '1em'}} horizontal className="logForm">
                                                    <FormGroup controlId="formSPecialty">
                                                        <Col componentClass={ControlLabel} sm={2}>
                                                            Address
                                                        </Col>
                                                        <Col sm={10} md={4}>
                                                            <FormControl type="text" name="centerAddress" placeholder="Address" value={this.state.centerAddress} onChange={this.handleChange.bind(this)}/>
                                                        </Col>
                                                    </FormGroup>
                                                    <FormGroup controlId="formSPecialty">
                                                        <Col componentClass={ControlLabel} sm={2}>
                                                            Phone Number
                                                        </Col>
                                                        <Col sm={10} md={4}>
                                                            <FormControl type="text" name="centerPhone" placeholder="Phone Number" value={this.state.centerPhone} onChange={this.handleChange.bind(this)}/>
                                                        </Col>
                                                    </FormGroup>
                                                </Form>
                                            </Tab>
                                            <Tab eventKey={2} title="Existing Medical Center">
                                                --- List and select here ---
                                            </Tab>
                                        </Tabs>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button type="submit" bsSize="small" className="formBtn1"
                                                name="setMedCenter" >
                                            Set Medical Center
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                                {/*-----------------------*/}
                            </div>
                        </Tab>
                        <Tab eventKey={2} title="Appointments">
                            Tab 2 content
                        </Tab>
                    </Tabs>
                </div>
            </div>
        );
    }
}