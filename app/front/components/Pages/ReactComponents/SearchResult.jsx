import React from 'react';
import { PageHeader, ListGroup, ListGroupItem, Accordion, Panel } from 'react-bootstrap';

import { observer } from 'mobx-react';
import localStore from '../../../../src/localStore.js'
import Navbar from './Navbar.jsx';
//Database
import dbuser from '../../../../../api/src/models/users.js';

@observer export default class SearchResult extends React.Component {
    constructor(){
        super();
        this.state = {
            searchItem: localStore.navSearchItem,
            searchResult: []
        };
    }

    componentDidMount(){
        let user = new dbuser();
        user.getInfoSearh(localStore.navSearchItem, function(result) {
            this.setState({searchResult: result});
        }.bind(this));
    }

    render() {
        return (
            <div >
                <Navbar type="navbar loginNavbar"/>
                <div className="divContainer">
                    <PageHeader className="pageHeader"> Results for <q>{this.state.searchItem}</q> </PageHeader>
                    <ListGroup>
                        {
                            Object.keys(this.state.searchResult).length !== 0 &&(
                                  this.state.searchResult.map((i)=>{
                                    return <ListGroupItem>
                                        <a>{i.m.name} - {i.r.type} - {i.n.name}</a>
                                    </ListGroupItem>
                                })
                            )
                        }

                    </ListGroup>
                </div>
            </div>
        )
    }

}