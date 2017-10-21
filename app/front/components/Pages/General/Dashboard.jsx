import React from 'react';
import { PageHeader, Tabs, Tab} from 'react-bootstrap';
import Navbar from '../ReactComponents/Navbar.jsx';

import { observer } from 'mobx-react';
import localStore from '../../../../src/localStore.js';

@observer export default class Dashboard extends React.Component {
    constructor(){
        super();
    }
    componentDidMount(){
        console.log(localStore);
    }
    render() {
        return (
            <div>
                <Navbar type="navbar loginNavbar"/>
                <div className="divContainer">
                    <PageHeader className="pageHeader"> Welcome {localStore.userEmail}</PageHeader>
                    <Tabs defaultActiveKey={1} id="noanim-tab-example">
                        <Tab eventKey={1} title="Profile">Tab 1 content</Tab>
                        <Tab eventKey={2} title="Appointments">Tab 2 content</Tab>
                    </Tabs>
                </div>
            </div>
        );
    }
}