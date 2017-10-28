import React from 'react';
import { PageHeader} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from '../ReactComponents/Navbar.jsx';

import { observer } from 'mobx-react';

@observer export default class NotFound extends React.Component {

    render() {
        return (
            <div>
              <Navbar type="navbar loginNavbar"/>
              <div className="divContainer">
                <PageHeader className="pageHeader"> Page not found :(</PageHeader>
              </div>
            </div>
        );
    }
}