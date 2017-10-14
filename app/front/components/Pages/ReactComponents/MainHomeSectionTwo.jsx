import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Timeline } from 'react-twitter-widgets';

import { observer } from 'mobx-react';
import localStore from '../../../../src/localStore.js'

@observer export default class MainHomeSectionTwo extends React.Component {
    render() {
        return (
            <div className="sectionOne">
                <section >
                    <div className="subSection">
                        <h3>more info</h3>
                    </div>
                </section>
                <section >
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