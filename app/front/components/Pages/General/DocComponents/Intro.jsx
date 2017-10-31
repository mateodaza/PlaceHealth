import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import { observer } from 'mobx-react';

@observer export default class Intro extends React.Component {
    render() {
        return (
            <div className='divContainer'>
                <h3>Introducción</h3>
                <p> Info acá  </p>
            </div>
        )
    }

}