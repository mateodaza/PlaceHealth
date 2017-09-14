import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Timeline } from 'react-twitter-widgets';
import Feed from './CuteFeed.jsx';
import doctors from '../../../../../res/doctors.js';
import services from '../../../../../res/services.js';

import { observer } from 'mobx-react';
import localStore from '../../../../src/localStore.js'

@observer export default class MainHomeSectionOne extends React.Component {
    render() {
        return (
            <div className="sectionOne">
                <section className="secOne">
                    <h3>Professionals</h3>
                    <Feed valuesList={doctors} backgcolor="#b0c4de"/>
                </section>
                <section className="secTwo">
                    <h3>Services</h3>
                    <Feed valuesList={services} backgcolor="#becee4"/>
                </section>
                <section className="secThree">
                    <h3>News</h3>
                    <Timeline
                        dataSource={{
                            sourceType: 'profile',
                            screenName: 'DoctorCatMd'
                        }}
                        options={{
                            username: 'doctorcatmd',
                            height: '514',
                            padding: 'px'
                        }}
                        onLoad={() => console.log('Timeline is loaded!')}
                    />
                </section>
            </div>
        )
    }

}