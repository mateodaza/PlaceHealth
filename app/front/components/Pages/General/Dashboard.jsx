import React from 'react';
import { PageHeader} from 'react-bootstrap';
import Navbar from '../ReactComponents/Navbar.jsx';
import Footer from '../ReactComponents/Footer.jsx';

export default class AuthTest extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
                <div className="divcontainer">
                    <PageHeader className="pageHeader">Dashboard</PageHeader>
                </div>
                <Footer />
            </div>
        );
    }
}