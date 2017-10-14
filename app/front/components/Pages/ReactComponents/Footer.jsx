import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import { observer } from 'mobx-react';
import localStore from '../../../../src/localStore.js'

@observer export default class MainHomeFooter extends React.Component {
    render() {
        return (
            <div className="footer">
                <h3>FOOTER</h3>
                <h4> 2017 </h4>
            </div>
        )
    }

}