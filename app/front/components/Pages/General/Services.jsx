import React from 'react';
import { PageHeader, Button} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from '../ReactComponents/Navbar.jsx';

import { observer } from 'mobx-react';
import localStore from '../../../../src/localStore.js';

@observer export default class Services extends React.Component {


    lookForSelected(e){
        e.preventDefault();
        localStore.navSearchItem = e.target.value;
        window.location=('/#/search/'+localStore.navSearchItem.replace(/\s/g, ''));
    }

    componentDidMount(){
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <div>
                <Navbar type="navbar loginNavbar"/>
                <div className="divContainer">
                    <PageHeader className="pageHeader"> Nuestros Servicios </PageHeader>
                    <div className='servicesBox'>
                        <div>
                            <h2 className="subPageHeader"> Servicios </h2>
                            {
                                localStore.searchSuggestions.Service !== undefined &&(
                                    localStore.searchSuggestions.Service.map((i)=>{
                                        return <span key={i}><Button className='btnList' value={i} onClick={this.lookForSelected.bind(this)}> {i} </Button><br/></span>
                                     })
                                )
                            }
                        </div>
                        <div>
                            <h2 className="subPageHeader"> Especialidades </h2>
                            {
                                localStore.searchSuggestions.Specialty !== undefined &&(
                                    localStore.searchSuggestions.Specialty.map((i)=>{
                                        return <span key={i}><Button className='btnList' value={i} onClick={this.lookForSelected.bind(this)}> {i} </Button><br/></span>
                                     })
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}