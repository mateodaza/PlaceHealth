import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import MdAccountBox from 'react-icons/lib/md/account-box';
import MdSearch from 'react-icons/lib/md/search';

import { observer } from 'mobx-react';
import localStore from '../../../../src/localStore.js';

import auth from '../../../../src/auth.js';

@observer export default class MainHomeNavbar extends React.Component {
    constructor(){
        super();
        this.state = {
            searchItem: '',
        };
    }

    handleSearchItemChange(e) {
        this.setState({searchItem: e.target.value});
    }

    search(){
        localStore.navSearchItem = this.state.searchItem;
    }

    logout(){
        localStore.reset();   //To reset default values
    }

    render() {
        return (
            <div  className={this.props.type}>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#" style={{color:'whitesmoke'}}> <strong>PlaceHealth</strong></a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Navbar.Brand >
                        <a href="#" style={{color:'whitesmoke', opacity:0.8}}>Services</a>
                    </Navbar.Brand>
                    <Navbar.Brand>
                        <a href="#" style={{color:'whitesmoke' , opacity:0.8}}>About</a>
                    </Navbar.Brand>
                    <Nav >
                        {
                            localStore.isLogged && (   //Change this token plz.
                                <LinkContainer to={'/auth'}>
                                    <NavItem eventKey={1}>Dashboard</NavItem>
                                </LinkContainer>
                            )
                        }
                    </Nav>
                    {
                        localStore.isLogged ? (
                            <LinkContainer to={'/'}>
                                <Navbar.Form pullRight className="navbarLog">
                                    <a href="#" onClick={this.logout.bind(this)}>
                                        <p>Logout</p>
                                        <MdAccountBox size={34} color='whitesmoke'/>
                                    </a>
                                </Navbar.Form>
                            </LinkContainer>
                        ): (
                            <LinkContainer to={'/login'}>
                                <Navbar.Form pullRight className="navbarLog">
                                    <a href="#" style={{color: 'whitesmoke'}}>
                                        <p>Login</p>
                                        <MdAccountBox size={34} color='whitesmoke'/>
                                    </a>
                                </Navbar.Form>
                            </LinkContainer>
                        )
                    }

                    <Navbar.Form pullRight>
                        <FormGroup>
                            <FormControl type="input" placeholder="Search" value={this.state.searchItem}
                                         onChange={this.handleSearchItemChange.bind(this)}
                                         onKeyPress={event => {
                                             if (event.key === "Enter") {
                                                 this.search();
                                                 window.location.replace("/#/search");
                                             }
                                         }}
                            />
                            {' '}
                            <LinkContainer to={'/search'}>
                                <a onClick={this.search.bind(this)}>
                                    <MdSearch size={22} color='whitesmoke'/>
                                </a>
                            </LinkContainer>
                        </FormGroup>
                    </Navbar.Form>
                </Navbar>
            </div>
        )
    }

}
