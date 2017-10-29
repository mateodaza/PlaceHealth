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
                        <h2>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lectus felis,
                            gravida ac leo et, iaculis commodo felis. Fusce fermentum scelerisque ante,
                            in ultrices velit posuere a. Ut dolor massa, tempus at ante et, semper placerat nunc.
                        </h2>
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