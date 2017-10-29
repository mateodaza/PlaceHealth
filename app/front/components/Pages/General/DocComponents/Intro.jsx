import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import { observer } from 'mobx-react';

@observer export default class Intro extends React.Component {
    render() {
        return (
            <div >
                <h3>Introducción</h3>
                <div className='divContainer'>
                    <p> Info acá  </p>
                </div>
            </div>
        )
    }

}