import React from 'react';
import { Modal, Form, FormControl, FormGroup, Col, Button, ControlLabel} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { observer } from 'mobx-react';
import localStore from '../../../../src/localStore.js'

//Database
import dbuser from '../../../../../api/src/models/users.js';

@observer export default class AppointmentModal extends React.Component {
    constructor(props){
        super(props);
        this.state={
            showModal: this.props.show,
            userName: '',
            userId:'',
            userEmail: '',
            userDescription: ''
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    setAppointment(){
        let user = new dbuser();
        if(this.state.userName !== '' && this.state.userId !== '' &&
            this.state.userEmail !== '' && this.state.userDescription !== ''){
              user.setAppointment(this.props.item.m.email, this.props.item.n.name, this.state.userName,
                                        this.state.userId, this.state.userEmail, this.state.userDescription, function(result){
                        this.props.onHide();
              }.bind(this));
        }else{
            alert("Please complete all the fields");
        }

    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Contact with <strong>{this.props.item.m.name}</strong> for <strong>{this.props.item.n.name}</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form style={{marginTop: '1em'}} horizontal className="logForm">
                        <FormGroup controlId="formSpecialty">
                            <Col componentClass={ControlLabel} sm={4}>
                                Your Name
                            </Col>
                            <Col sm={10} md={8}>
                                <FormControl type="text" name="userName" placeholder="Name" value={this.state.userName} onChange={this.handleChange.bind(this)}/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="formSpecialty">
                            <Col componentClass={ControlLabel} sm={4}>
                                Your Identification
                            </Col>
                            <Col sm={10} md={8}>
                                <FormControl type="text" name="userId" placeholder="Identification" value={this.state.userId} onChange={this.handleChange.bind(this)}/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="formSpecialty">
                            <Col componentClass={ControlLabel} sm={4}>
                                Email
                            </Col>
                            <Col sm={10} md={8}>
                                <FormControl type="text" name="userEmail" placeholder="Email" value={this.state.userEmail} onChange={this.handleChange.bind(this)}/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="formSpecialty">
                            <Col componentClass={ControlLabel} sm={4}>
                                Note or Descripion
                            </Col>
                            <Col sm={10} md={8}>
                                <FormControl style={{minHeight: '20em'}} componentClass="textarea" type="text" name="userDescription" placeholder="Note or Descripion" value={this.state.userDescription} onChange={this.handleChange.bind(this)}/>
                            </Col>
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit"  onClick={this.props.onHide}>Cancel</Button>
                    <Button type="submit"  className="formBtn1"
                            name="setAppointment" onClick={this.setAppointment.bind(this)}>
                        Contact
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

}