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
            showServiceModal: false,
            showCenterModal: false,
            centerPhone: '',
            centerAddress: '',
            type: '',
            userData: [],
            allUserData:[],
            selected: 1,
            selectedCenter: ''
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    close(e) {
        this.setState({ showSpecialtyModal: false, showCenterModal:false, showServiceModal: false });
    }

    open(e) {
        this.setState({ [e.target.name]: true });
    }

    handleSelect(key) {
        this.setState({selected: key});
    }

    componentDidMount(){
        this.getData();
    }

    setMedicalCenter(e){
        e.preventDefault();
        let user = new dbuser();
        if(Number(this.state.selected) === 1){ // Own Medical Center

        }else{  //Existing Medical Center
            alert(this.state.selectedCenter);
            user.setDocToExistingCenter(localStore.userEmail, this.state.selectedCenter, function(result){
                this.getData();
            });
        }
    }

    getData(){
        let user = new dbuser();
        user.findUser(localStore.userEmail, function (data){
            this.setState({type : data[Object.keys(data)[1]][0], userData: data.n})
        }.bind(this));

        //Get All INFO
        user.getAllUserInfo(localStore.userEmail, function (data){
            console.log(data);
            this.setState({allUserData: data});
        }.bind(this));

        //Get All Centers
        this.getCenters();

    }

    getCenters(){
        let user = new dbuser();
        user.getCenters(function (data){
            localStore.allCenters = data;
        }.bind(this));
    }

    render() {
        return (
            <div>
                <Navbar type="navbar loginNavbar"/>
                <div className="divContainer">
                    <PageHeader className="pageHeader"> Welcome </PageHeader>

                    <Tabs defaultActiveKey={1} id="noanim-tab-example">
                        <Tab eventKey={1} title="Profile">
                            <div className="divContainer">
                                <Alert bsStyle="danger">
                                    <strong>Holy guacamole!</strong> Set your information so people can see you!
                                </Alert>

                                {
                                    this.state.type === 'Doctor'?(
                                        <div>
                                            <Col xs={6} md={4} >
                                                <h3> General Info </h3>
                                                <h3> Name: <span style={{color: 'grey'}}> {this.state.userData.name} </span></h3>
                                                <h3> Email: <span style={{color: 'grey'}}>  {localStore.userEmail} </span></h3>
                                            </Col>
                                            <Col xs={6} md={4} >
                                                <h3> Medical Center </h3>
                                                <div style={{marginBottom: '1em'}}>
                                                    {
                                                        this.state.allUserData.map((i)=>{
                                                            console.log(i[Object.keys(i)[2]]);
                                                            let j=i[Object.keys(i)[2]];
                                                            return <div key={j.id}>
                                                                        <h4> {j.name}</h4>
                                                                    </div>
                                                        })
                                                    }
                                                </div>
                                                <Button type="submit" bsSize="small" className="formBtn1"
                                                        name="showCenterModal" onClick={this.open.bind(this)}>
                                                    Set Medical Center
                                                </Button>
                                            </Col>
                                            <Col xsHidden md={4} >
                                                <h3> Specialties </h3>
                                                <div style={{marginBottom: '1em'}}>
                                                    Specialty info here pls
                                                </div>
                                                <Button type="submit" bsSize="small" className="formBtn1"
                                                         name="showSpecialtyModal" onClick={this.open.bind(this)}>
                                                            Add New Specialty
                                                </Button>
                                            </Col>
                                        </div>
                                    ):(
                                        <div>
                                            <Col xs={6} md={4} >
                                                <h3> General Info </h3>
                                                <h3> Name: <span style={{color: 'grey'}}> {this.state.userData.name} </span></h3>
                                                <h3> Email: <span style={{color: 'grey'}}>  {localStore.userEmail} </span></h3>
                                            </Col>
                                            <Col xsHidden md={4} >
                                                <h3> Services </h3>
                                                <div style={{marginBottom: '1em'}}>
                                                    Services info here pls
                                                </div>
                                                <Button type="submit" bsSize="small" className="formBtn1"
                                                        name="showServiceModal" onClick={this.open.bind(this)}>
                                                    Add New Service
                                                </Button>
                                            </Col>
                                        </div>
                                    )
                                }

                                {/*MODAL FOR SETTING SERVICES*/}
                                <Modal show={this.state.showServiceModal} onHide={this.close.bind(this)}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Set Service</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form horizontal className="logForm">
                                            <FormGroup controlId="formSPecialty">
                                                <Col componentClass={ControlLabel} sm={2}>
                                                    Select Service
                                                </Col>
                                                <Col componentClass={ControlLabel} sm={10}>
                                                    <FormControl componentClass="select" placeholder="select">
                                                        <option value="select">select</option>
                                                        <option value="other">...</option>
                                                    </FormControl>
                                                </Col>
                                            </FormGroup>
                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button type="submit" bsSize="small" className="formBtn1"
                                                name="setService" >
                                            Set New Service
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                                {/*-----------------------*/}
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
                                            <Col componentClass={ControlLabel} sm={10}>
                                            <FormControl componentClass="select" placeholder="select">
                                                <option value="select">select</option>
                                                <option value="other">...</option>
                                            </FormControl>
                                            </Col>
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
                                        <Tabs activeKey={this.state.selected}  onSelect={this.handleSelect.bind(this)} id="noanim-tab-example">
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
                                            {/*THE OTHER TAB*/}
                                             <Tab eventKey={2} title="Existing Medical Center">
                                                 <Form style={{marginTop: '1em'}} horizontal className="logForm">
                                                     <FormGroup controlId="formSpecialty">
                                                            <Col componentClass={ControlLabel} sm={12}>
                                                                 <FormControl componentClass="select" name="selectedCenter" placeholder="Select Medical Center" onChange={this.handleChange.bind(this)}>
                                                                     <option value={"SELECT ONE"} > Selecto one option please. </option>
                                                                     {
                                                                         localStore.allCenters.map((i)=> {
                                                                             return <option value={i.name} key={i.id}> {i.name} </option>
                                                                         })
                                                                     }
                                                                 </FormControl>
                                                             </Col>
                                                     </FormGroup>
                                                 </Form>
                                             </Tab>
                                        </Tabs>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button type="submit" bsSize="small" className="formBtn1"
                                                name="setMedCenter" onClick={this.setMedicalCenter.bind(this)}>
                                            Set Medical Center
                                        </Button>
                                    </Modal.Footer>
                                 </Modal>
                                {/*-----------------------*/}
                                {/* END DOCTOR PART*/}
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