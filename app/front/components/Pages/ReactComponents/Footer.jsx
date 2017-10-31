import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import { observer } from 'mobx-react';
import localStore from '../../../../src/localStore.js'

@observer export default class MainHomeFooter extends React.Component {

    render() {
        return (
            <footer>
                <div className='footer'>
                    <div className='footerDiv'>
                        <h4> <strong>PlaceHealth</strong> </h4>
                        <a href='#'><h5> Home</h5> </a>
                        <a href='#/doc'> <h5>Documentación </h5></a>
                        <a href='#/services'> <h5>Servicios </h5></a><br/>
                    </div>
                    <div className='footerDiv'>
                        <h4> <strong>About</strong> </h4>
                        <h5><a href='#'> About us </a></h5>
                        <h5><a href='#'> Privacy Policy </a></h5>
                        <h5><a href='#'> Terms of Service </a></h5><br/>
                    </div>
                    <div className='footerDiv'>
                        <h4> <strong>Connect</strong> </h4>
                        <h5> <a href='#'> Twitter </a> </h5>
                        <h5> <a href='#'> Facebook </a> </h5><br/>
                    </div>
                </div>
            </footer>
        )
    }

}