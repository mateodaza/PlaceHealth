import React from 'react';
import { PageHeader, ListGroup, ListGroupItem, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Modal from './AppointmentModal.jsx';

import { observer } from 'mobx-react';
import localStore from '../../../../src/localStore.js'
import Navbar from './Navbar.jsx';
//Database
import dbuser from '../../../../../api/src/models/users.js';

const tooltip = (
    <Tooltip id="tooltip"><strong>Hey!</strong> let them know that you are interested in their service.</Tooltip>
);

@observer export default class SearchResult extends React.Component {
    constructor(){
        super();
        this.state = {
            searchItem: localStore.navSearchItem,
            searchResult: [],
            openModal: false,
            clickedItem: []
        };
    }

    componentDidMount(){
        let user = new dbuser();
        user.getInfoSearh(localStore.navSearchItem, function(result) {
            this.setState({searchResult: result});
            localStore.navSearchItem = '';
        }.bind(this));
    }

    open(e){
        e.preventDefault();
        let item = this.state.searchResult[e.target.value];
        this.setState({openModal: true, clickedItem: item });
    }

    close(){
        this.setState({openModal: false});
    }

    render() {
        return (
            <div>
                <Navbar type="navbar loginNavbar"/>
                <div className="divContainer">
                    <PageHeader className="pageHeader"> Results for {this.state.searchItem} </PageHeader>
                    <ListGroup>
                        <div className="searchContainer smokeDiv">
                        {
                            Object.keys(this.state.searchResult).length !== 0 ?(
                                  this.state.searchResult.map((i, index)=>{
                                    return <ListGroupItem key={i.r.id}>
                                        <div className='searchContainerStuff'>
                                              {
                                                  i.m.address !== undefined ?(
                                                      <div>
                                                          <h4 style={{marginBottom:'0'}}><strong> {i.m.name} </strong></h4>
                                                          <h4>{i.r.type}  {i.n.name}</h4>
                                                          <p> <strong>Address: </strong>{i.m.address}</p>
                                                            <p> <strong>Phone Number: </strong>{i.m.phone}</p>
                                                      </div>
                                                  ):(
                                                      <div>
                                                          <h4 style={{marginBottom:'0'}}><strong> Dr. {i.m.name} </strong></h4>
                                                          <h4>{i.r.type}  {i.n.name}</h4>
                                                          <p> <strong>Address: </strong>{i.r.properties.address}</p>
                                                          <p> <strong>Phone Number: </strong>{i.r.properties.phone}</p>
                                                      </div>
                                                  )
                                              }
                                        </div>
                                              <div>
                                                  <OverlayTrigger placement="right" overlay={tooltip}>
                                                     <Button bsSize="large" value={index} onClick={this.open.bind(this)}> Contact </Button>
                                                  </OverlayTrigger>
                                              </div>
                                          </ListGroupItem>
                                })
                            ):(
                                <div className='searchContainer'>
                                    <h3> Nothing was found :( </h3>
                                </div>
                            )
                        }
                        </div>
                        {
                            this.state.openModal === true &&(
                                <Modal show={true} item={this.state.clickedItem} onHide={this.close.bind(this)}/>
                            )
                        }

                    </ListGroup>
                </div>
            </div>
        )
    }

}