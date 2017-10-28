import React from 'react';
import { PageHeader, Tabs, Tab, Alert, Modal, Button, Col, ListGroup, ListGroupItem, Form, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
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
            showModSpecialtyModal: false,
            showUpdateInfoModal: false,
            checkInfo: false,

            centerPhone: '',
            centerAddress: '',
            centerName: '',
            centerDescription: '',

            newCenterAddress: '',
            newCenterPhone: '',

            type: '',
            userData: [],
            allUserData:[],

            selected: 1,
            selectedCenter: '',
            selectedSpecialty: '',
            selectedService: '',
            clickedSpecialty: '',
            clickedSpecialtyInfo: [],

            appointments: []
        }
        this.getData();
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    close() {
        this.setState({ showUpdateInfoModal: false, showSpecialtyModal: false, showModSpecialtyModal:false, showServiceModal: false });
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

    setMedicalCenterInfo(e){
        e.preventDefault();
        let user = new dbuser();
        user.setDocSpecialtyRelation(localStore.userEmail, this.state.clickedSpecialty,this.state.centerName,
                                this.state.centerAddress, this.state.centerPhone, this.state.centerDescription, function (result) {
                this.getData();
                this.close();
        }.bind(this));

    }

    setSpecialty(e){
        e.preventDefault();
        let user = new dbuser();
        if(this.state.selectedSpecialty !== '') {
            if(this.state.type === 'Doctor'){
                user.setDocToSpecialty(localStore.userEmail, this.state.selectedSpecialty, function (result) {
                    this.getData();
                    this.close();
                }.bind(this));
            }else{
                if(this.state.type === 'Center'){
                    user.setCenterToSpecialty(localStore.userEmail, this.state.selectedSpecialty, function (result) {
                        this.getData();
                        this.close();
                    }.bind(this));
                }
            }
        }
    }

    setService(e){
        e.preventDefault();
        let user = new dbuser();
        if(this.state.selectedService !== ''){
            user.setCenterToService(localStore.userEmail, this.state.selectedService, function(result){
                this.getData();
                this.close();
            }.bind(this));
        }
    }

    getData(){
        let user = new dbuser();
        user.findUser(localStore.userEmail, function (data){
            this.setState({type : data[Object.keys(data)[1]][0], userData: data.n});
            //update component
            this.setState();
        }.bind(this));

        //Get All INFO
        user.getAllUserInfo(localStore.userEmail, function (data){
            this.setState({allUserData: data});
            //CheckInfo
            this.checkInfo();
            this.setState();
        }.bind(this));

        //Get All Centers
        this.getCenters();

        //Get All Specialties
        this.getSpecialties();

        //Get All Services
        this.getServices();

        //Get All Appointments
        this.getAppointments();

    }

    openSetSpecialty(e){
        e.preventDefault();
        let clickedSpecialInfo = [];
        this.state.allUserData.map((i)=>{
            let j=i[Object.keys(i)[2]];
            if(j.name === e.target.value){
                clickedSpecialInfo = i[Object.keys(i)[1]].properties;
            }
        });
        this.setState({clickedSpecialtyInfo: clickedSpecialInfo, centerName: clickedSpecialInfo.name,
            centerAddress: clickedSpecialInfo.address, showModSpecialtyModal: true, clickedSpecialty:[e.target.value],
            centerPhone: clickedSpecialInfo.phone, centerDescription: clickedSpecialInfo.description})
    }

    checkInfo(){
        let check = false;
        if(this.state.type === 'Doctor'){
            this.state.allUserData.map((i)=>{
                let j=i[Object.keys(i)[1]].properties;
                if(Object.keys(j).length===0 || j.name==="" ||
                    j.address==="" || j.phone==="" || j.description===""){
                    check = true;
                }
            });
        }else{
            let j = this.state.userData;
            if( j.phone === '' || j.address === '' || j.phone === undefined || j.address === undefined){
                check = true;
            }else{
                this.setState({newCenterAddress: j.address, newCenterPhone: j.phone});
            }
        }
        this.setState({checkInfo: check});
    }

    getSpecialties(){
        let user = new dbuser();
        user.getSpecialties(function (data){
            localStore.allSpecialties = data;
        }.bind(this));
    }

    getCenters(){
        let user = new dbuser();
        user.getCenters(function (data){
            localStore.allCenters = data;
        }.bind(this));
    }

    getServices(){
        let user = new dbuser();
        user.getServices(function (data){
            localStore.allServices = data;
        }.bind(this));
    }

    getAppointments(){
        let user = new dbuser();
        user.getAppointments(localStore.userEmail, function (data){
            this.setState({appointments: data});
            console.log(this.state.appointments);
        }.bind(this));
    }

    updateCenterInfo(){
        let user = new dbuser();
        user.updateCenterInfo(localStore.userEmail, this.state.newCenterAddress, this.state.newCenterPhone,function (data){
            this.getData();
            this.close();
        }.bind(this));
    }

    render() {
        return (
            <div >
                <Navbar type="navbar loginNavbar"/>
                <div className="divContainer">
                    <PageHeader className="pageHeader"> Welcome </PageHeader>

                    <Tabs className='tab'  defaultActiveKey={1} id="noanim-tab-example">
                        <Tab eventKey={1} title={<h4 style={{color: 'rgba(10,42,79,1)'}}> Profile </h4>}>
                            <div className="divContainer smokeDiv">
                                {
                                    this.state.checkInfo === true &&(
                                        <Alert bsStyle="danger">
                                            <strong>Holy guacamole!</strong> Seems like you are missing some information.
                                            Check that all fields are completed!
                                        </Alert>
                                     )
                                }

                                {
                                    this.state.type === 'Doctor'?(
                                        <div className="infoContainer">
                                                <ListGroupItem>
                                                    <div className='infoContainerStuff'>
                                                        <h3 style={{color: 'rgba(10,42,79,0.8)'}}> General Info </h3><br/>
                                                        <h3> Name: <span style={{color: 'grey'}}> {this.state.userData.name} </span></h3>
                                                        <h3> Email: <span style={{color: 'grey'}}>  {localStore.userEmail} </span></h3>
                                                    </div>
                                                </ListGroupItem>
                                            { /*
                                                <Button type="submit" bsSize="small" className="formBtn1"
                                                        name="showCenterModal" onClick={this.open.bind(this)}>
                                                    Set Medical Center
                                                </Button>
                                            */
                                            }
                                                <ListGroupItem >
                                                    <div className='infoContainerStuff'>
                                                    <h3 style={{color: 'rgba(10,42,79,0.8)'}}> Specialties </h3><br/>
                                                    <div style={{marginBottom: '1em'}}>
                                                        <ListGroup>
                                                        {
                                                            this.state.allUserData.map((i)=>{
                                                                let j=i[Object.keys(i)[2]];
                                                                let k=i[Object.keys(i)[1]].properties;
                                                                if(j.type === 'specialty'){
                                                                    return  <div key={j.id}>
                                                                                <ListGroupItem key={j.id} >
                                                                                     <h3>{j.name}</h3>
                                                                                    <h4> <strong>Medical Center Name:</strong> {k.name}</h4>
                                                                                    <h4> <strong>Medical Center Address:</strong> {k.address}</h4>
                                                                                    <h4> <strong>Medical Center Phone Number:</strong> {k.phone}</h4>
                                                                                    <h4> <strong>Service Description:</strong> {k.description}</h4>
                                                                                    <Button value={j.name} onClick={this.openSetSpecialty.bind(this)}> Edit </Button>
                                                                                </ListGroupItem>
                                                                            </div>
                                                                }
                                                            })
                                                        }
                                                        </ListGroup>
                                                    </div>
                                                    <Button type="submit" style={{float: 'right', margin: '8px'}} bsSize="lg" className="formBtn1"
                                                             name="showSpecialtyModal" onClick={this.open.bind(this)}>
                                                                Add New Specialty
                                                    </Button>
                                                    </div>
                                                </ListGroupItem>
                                        </div>
                                    ):(

                                        //MEDICAL CENTER
                                        <div className="infoContainer">
                                                <ListGroupItem >
                                                    <div className='infoContainerStuff'>
                                                        <h3 style={{color: 'rgba(10,42,79,0.8)'}}> General Info </h3><br/>
                                                        <h3> Name: <span style={{color: 'grey'}}> {this.state.userData.name} </span></h3>
                                                        <h3> Email: <span style={{color: 'grey'}}>  {localStore.userEmail} </span></h3>
                                                        <h3> Address: <span style={{color: 'grey'}}> {this.state.userData.address} </span></h3>
                                                        <h3> Phone Number: <span style={{color: 'grey'}}>  {this.state.userData.phone} </span></h3>
                                                        <Button style={{margin: '8px'}} type="submit" bsSize="small" className="formBtn1"
                                                                name="showUpdateInfoModal" onClick={this.open.bind(this)}>
                                                            Update Info
                                                        </Button>
                                                    </div>
                                                </ListGroupItem>
                                                <ListGroupItem >
                                                    <div className='infoContainerStuff'>
                                                        <h3 style={{color: 'rgba(10,42,79,0.8)'}}> Services </h3><br/>
                                                        <div style={{marginBottom: '1em'}}>
                                                            <ListGroup>
                                                            {
                                                                this.state.allUserData.map((i)=>{
                                                                    let j=i[Object.keys(i)[2]];
                                                                    if(j.type === 'service') {
                                                                        return <ListGroupItem key={j.id}>
                                                                            <h4> {j.name}</h4>
                                                                        </ListGroupItem>
                                                                    }
                                                                })
                                                            }
                                                            </ListGroup>
                                                        </div>
                                                        <Button style={{margin: '8px'}} type="submit" bsSize="small" className="formBtn1"
                                                                name="showServiceModal" onClick={this.open.bind(this)}>
                                                            Add New Service
                                                        </Button>
                                                    </div>
                                                </ListGroupItem>
                                                <ListGroupItem >
                                                    <div className='infoContainerStuff'>
                                                        <h3 style={{color: 'rgba(10,42,79,0.8)'}}> Specialties </h3><br/>
                                                        <div style={{marginBottom: '1em'}}>
                                                            <ListGroup>
                                                            {
                                                                this.state.allUserData.map((i)=>{
                                                                    let j=i[Object.keys(i)[2]];
                                                                    if(j.type === 'specialty') {
                                                                        return <ListGroupItem key={j.id}>
                                                                            <h4> {j.name}</h4>
                                                                        </ListGroupItem>
                                                                    }
                                                                })
                                                            }
                                                            </ListGroup>
                                                        </div>
                                                        <Button type="submit" style={{margin: '8px'}} bsSize="small" className="formBtn1"
                                                                name="showSpecialtyModal" onClick={this.open.bind(this)}>
                                                            Add New Specialty
                                                        </Button>
                                                    </div>
                                                </ListGroupItem>
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
                                            <FormGroup controlId="formServices">
                                                <Col componentClass={ControlLabel} sm={2}>
                                                    Select Service
                                                </Col>
                                                <Col componentClass={ControlLabel} sm={10}>
                                                    <FormControl componentClass="select" name="selectedService" placeholder="Select Service" onChange={this.handleChange.bind(this)}>
                                                        <option value={""} />
                                                        {
                                                            localStore.allServices.map((i)=> {
                                                                return <option value={i.name} key={i.name}> {i.name} </option>
                                                            })
                                                        }
                                                    </FormControl>
                                                </Col>
                                            </FormGroup>
                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button type="submit" bsSize="small" className="formBtn1"
                                                name="setService" onClick={this.setService.bind(this)}>
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
                                                <FormControl componentClass="select" name="selectedSpecialty" placeholder="Select Specialty" onChange={this.handleChange.bind(this)}>
                                                    <option value={""} />
                                                    {
                                                        localStore.allSpecialties.map((i)=> {
                                                            return <option value={i.name} key={i.name}> {i.name} </option>
                                                        })
                                                    }
                                                </FormControl>
                                            </Col>
                                        </FormGroup>
                                     </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button type="submit" bsSize="small" className="formBtn1"
                                            name="setMedCenter" onClick={this.setSpecialty.bind(this)}>
                                            Set Specialty
                                        </Button>
                                     </Modal.Footer>
                                </Modal>
                                {/*-----------------------*/}
                                {/*MODAL FOR SETTING MEDICAL CENTER*/}
                                <Modal show={this.state.showModSpecialtyModal} onHide={this.close.bind(this)}>
                                    <Modal.Header closeButton>
                                         <Modal.Title>{this.state.clickedSpecialty}</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Tabs activeKey={this.state.selected}  onSelect={this.handleSelect.bind(this)} id="noanim-tab-example">
                                             <Tab eventKey={1} title="General Information">
                                                <Form style={{marginTop: '1em'}} horizontal className="logForm">
                                                 <FormGroup controlId="formSpecialty">
                                                 <Col componentClass={ControlLabel} sm={4}>
                                                     Medical Center Name
                                                 </Col>
                                                 <Col sm={10} md={8}>
                                                    <FormControl type="text" name="centerName" placeholder="Name" value={this.state.centerName} onChange={this.handleChange.bind(this)}/>
                                                 </Col>
                                                  </FormGroup>
                                                    <FormGroup controlId="formSpecialty">
                                                        <Col componentClass={ControlLabel} sm={4}>
                                                            Medical Center Address
                                                        </Col>
                                                        <Col sm={10} md={8}>
                                                            <FormControl type="text" name="centerAddress" placeholder="Address" value={this.state.centerAddress} onChange={this.handleChange.bind(this)}/>
                                                        </Col>
                                                    </FormGroup>
                                                <FormGroup controlId="formSpecialty">
                                                  <Col componentClass={ControlLabel} sm={4}>
                                                      Medical Center Phone Number
                                                  </Col>
                                                    <Col sm={10} md={8}>
                                                        <FormControl type="text" name="centerPhone" placeholder="Phone Number" value={this.state.centerPhone} onChange={this.handleChange.bind(this)}/>
                                                  </Col>
                                                </FormGroup>
                                                    <FormGroup controlId="formControlsTextarea">
                                                        <Col componentClass={ControlLabel} sm={4}>
                                                           Service Description
                                                        </Col>
                                                        <Col sm={10} md={8}>
                                                            <FormControl style={{minHeight: '20em'}} componentClass="textarea" name="centerDescription" placeholder="Description" value={this.state.centerDescription} onChange={this.handleChange.bind(this)}/>
                                                        </Col>
                                                    </FormGroup>
                                                 </Form>
                                             </Tab>
                                        </Tabs>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button type="submit" bsSize="small" className="formBtn1"
                                                name="setMedCenter" onClick={this.setMedicalCenterInfo.bind(this)}>
                                            Set Information
                                        </Button>
                                    </Modal.Footer>
                                 </Modal>
                                {/*-----------------------*/}
                                {/* END DOCTOR PART*/}

                                {/*MODAL FOR SETTING MEDICAL CENTER*/}
                                <Modal show={this.state.showUpdateInfoModal} onHide={this.close.bind(this)}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Update Info</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form style={{marginTop: '1em'}} horizontal className="logForm">
                                            <FormGroup controlId="formSpecialty">
                                                <Col componentClass={ControlLabel} sm={4}>
                                                    Medical Center Address
                                                </Col>
                                                <Col sm={10} md={8}>
                                                    <FormControl type="text" name="newCenterAddress" placeholder="Address" value={this.state.newCenterAddress} onChange={this.handleChange.bind(this)}/>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup controlId="formSpecialty">
                                                <Col componentClass={ControlLabel} sm={4}>
                                                    Medical Center Phone Number
                                                </Col>
                                                <Col sm={10} md={8}>
                                                    <FormControl type="text" name="newCenterPhone" placeholder="Phone Number" value={this.state.newCenterPhone} onChange={this.handleChange.bind(this)}/>
                                                </Col>
                                            </FormGroup>
                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button type="submit" bsSize="small" className="formBtn1"
                                                name="setMedCenter" onClick={this.updateCenterInfo.bind(this)}>
                                            Update Information
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                        </Tab>


                        <Tab style={{backgroundColor: 'whitesmoke'}} eventKey={2} title={<h4 style={{color: 'rgba(10,42,79,1)'}}> Appointments </h4>}>
                            <div className="appointmentContainer smokeDiv">
                                {
                                    Object.keys(this.state.appointments).length !== 0 &&(
                                        this.state.appointments.map((i, index)=>{
                                            return <ListGroupItem key={i.r.id} header={<h3> <strong>{i.r.properties.service}</strong> </h3>}>
                                                    <div className='appointmentContainerStuff'>
                                                        <h4> <strong>Name: </strong> {i.m.name}</h4>
                                                        <h4> <strong>ID: </strong> {i.m.userId}</h4>
                                                        <h4> <strong>Email: </strong> {i.m.email}</h4>
                                                        <h4> <strong>Note: </strong> {i.r.properties.patientDesc}</h4>
                                                    </div>
                                            </ListGroupItem>
                                        })
                                    )
                                }
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        );
    }
}