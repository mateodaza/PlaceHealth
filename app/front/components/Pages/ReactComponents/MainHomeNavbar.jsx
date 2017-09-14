import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import MdAccountBox from 'react-icons/lib/md/account-box';
import MdSearch from 'react-icons/lib/md/search';

import { observer } from 'mobx-react';
import localStore from '../../../../src/localStore.js'

@observer export default class MainHomeNavbar extends React.Component {
    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">Logo/Name</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav className="navbar">
                    <LinkContainer to={'/about'}>
                        <NavItem eventKey={1}>About</NavItem>
                    </LinkContainer>
                    <NavDropdown eventKey={2} title="Dropdown" id="basic-nav-dropdown">
                        <MenuItem eventKey={2.1}>Action</MenuItem>
                        <MenuItem eventKey={2.2}>Another action</MenuItem>
                        <MenuItem eventKey={2.3}>Another One</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey={2.4}>Separated link</MenuItem>
                    </NavDropdown>
                </Nav>
                <LinkContainer to={'/login'}>
                    <Navbar.Form pullRight className="navbarLog">
                        <a href="#">
                            <p>Login</p>
                            <MdAccountBox size={34} color='lightsteelblue'/>
                        </a>
                    </Navbar.Form>
                </LinkContainer>

                <Navbar.Form pullRight>
                    <FormGroup>
                        <FormControl type="text" placeholder="Search" />
                    </FormGroup>
                    {' '}
                    <a href="#">
                        <MdSearch size={22} />
                    </a>
                </Navbar.Form>
            </Navbar>
        )
    }

}
