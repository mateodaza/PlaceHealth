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
                    <PageHeader className="p
                    ageHeader"> Results for <q>{this.state.searchItem}</q> </PageHeader>
                    <ListGroup>
                        {
                            Object.keys(this.state.searchResult).length !== 0 &&(
                                  this.state.searchResult.map((i, index)=>{
                                    return <ListGroupItem key={i.r.id}>
                                              <span> {i.m.name}  {i.r.type}  {i.n.name}</span>
                                              <div><br/>
                                                  <OverlayTrigger placement="right" overlay={tooltip}>
                                                     <Button bsSize="small" value={index} onClick={this.open.bind(this)}> Contact </Button>
                                                  </OverlayTrigger>
                                              </div>
                                          </ListGroupItem>
                                })
                            )
                        }
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