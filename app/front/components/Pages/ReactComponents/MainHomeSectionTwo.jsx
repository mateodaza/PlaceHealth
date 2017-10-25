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
                        <h2> You can feel comfortable knowing that you&rsquo;re getting the best care available,
                            with a commitment to service, and all the luxuries of a state-of-the-art centre.
                            Expect a truly great experience. </h2>
                    </div>
                </section>
                <section style={{backgroundColor: 'rgba(10,42,79,0.7)', color: 'whitesmoke', paddingTop:'0', paddingBottom:'2em', paddingLeft:'2em', paddingRight:'2em'}}>
                    <h3>News</h3>
                    <Timeline
                        dataSource={{
                            sourceType: 'profile',
                            screenName: 'IntegrahealthTO'
                        }}
                        options={{
                            username: 'IntegrahealthTO',
                            height: '720',
                            padding: 'em'
                        }}
                        onLoad={() => console.log('Timeline is loaded!')}
                    />
                </section>
            </div>
        )
    }

}