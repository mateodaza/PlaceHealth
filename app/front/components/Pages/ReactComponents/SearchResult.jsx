import React from 'react';
import { PageHeader, ListGroup, ListGroupItem, Accordion, Panel } from 'react-bootstrap';

import { observer } from 'mobx-react';
import localStore from '../../../../src/localStore.js'
import Navbar from '../ReactComponents/MainHomeNavbar.jsx';
import Footer from '../ReactComponents/MainHomeFooter.jsx';

let results = [{
      id: '1',
      name: 'Result 1',
      info: 'Description of result 1'
    },
    {
      id: '2',
      name: 'Result 2',
      info: 'Description of result 2'
    }];

@observer export default class SearchResult extends React.Component {
    render() {
        return (
            <div >
                <Navbar/>
                <div className="divcontainer">
                    <PageHeader className="pageHeader"> Results for <q>{localStore.navSearchItem}</q> </PageHeader>

                    <Accordion className="searchResults">
                        {
                            results.map(function(listValue){
                                return <Panel header={listValue.name} key={listValue.id} eventKey={listValue.id}>
                                    {listValue.info}
                                </Panel>
                            })
                        }
                    </Accordion>

                </div>
                <Footer/>
            </div>
        )
    }

}