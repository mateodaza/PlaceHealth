import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import { observer } from 'mobx-react';

@observer export default class Intro extends React.Component {
    render() {
        return (
            <div >
                <h3>Introduccion</h3>
                <p> Set some info </p>
            </div>
        )
    }

}