import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import MdAccountBox from 'react-icons/lib/md/account-box';
import MdSearch from 'react-icons/lib/md/search';
import Suggest from './AutoSuggest.jsx';

import { observer } from 'mobx-react';
import localStore from '../../../../src/localStore.js';

//Database
import dbuser from '../../../../../api/src/models/users.js';

@observer export default class MainHomeNavbar extends React.Component {
    constructor(){
        super();
        this.state = {
            searchItem: '',
        };
    }

    componentDidMount(){
        //Get Info for looking up stuff
        let user = new dbuser();
        let stuff = {Service: [], Specialty: [] };

        user.getAllServices((result) =>{
            result.map((i)=> {
                stuff.Service.push(i.name);
            });
            user.getAllSpecialties((res)=>{
                res.map((i)=> {
                    stuff.Specialty.push(i.name);
                })
                localStore.searchSuggestions = stuff;
            });
        })

    }




    handleSearchItemChange(e) {
        this.setState({searchItem: e.target.value});
    }

    logout(){
        localStore.reset();   //To reset default values
    }

    render() {
        return (
            <div  className={this.props.type}>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#" style={{color:'whitesmoke'}}> <strong>PlaceHealth</strong></a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Navbar.Brand >
                        <a href="#" style={{color:'whitesmoke', opacity:0.8}}>Services</a>
                    </Navbar.Brand>
                    <Navbar.Brand>
                        <a href="#" style={{color:'whitesmoke' , opacity:0.8}}>About</a>
                    </Navbar.Brand>
                    <Navbar.Brand >
                        {
                            localStore.isLogged && (   //Change this token plz.
                                <a href="#/auth" style={{color:'whitesmoke' , opacity:0.8}}>Dashboard</a>
                            )
                        }
                    </Navbar.Brand>
                    {
                        localStore.isLogged ? (
                            <Navbar.Brand>
                                <LinkContainer to={'/'}>
                                    <Navbar.Form pullRight className="navbarLog">
                                        <a href="#" style={{color: 'whitesmoke'}} onClick={this.logout.bind(this)}>
                                            <p>Logout</p>
                                            <MdAccountBox size={34} color='whitesmoke'/>
                                        </a>
                                    </Navbar.Form>
                                </LinkContainer>
                            </Navbar.Brand>
                        ): (
                            <Navbar.Brand>
                                <LinkContainer to={'/login'}>
                                    <Navbar.Form pullRight className="navbarLog">
                                        <a href="#" style={{color: 'whitesmoke'}}>
                                            <p>Login</p>
                                            <MdAccountBox size={34} color='whitesmoke'/>
                                        </a>
                                    </Navbar.Form>
                                </LinkContainer>
                            </Navbar.Brand>
                        )
                    }

                    <Navbar.Form pullRight>
                        {
                            /*
                            <FormGroup>
                                <FormControl type="input" placeholder="Search" value={this.state.searchItem}
                                             onChange={this.handleSearchItemChange.bind(this)}
                                             onKeyPress={event => {
                                                 if (event.key === "Enter") {
                                                     this.search();
                                                     window.location.replace("/#/search");
                                                 }
                                             }}
                                />
                                {' '}
                                <LinkContainer to={'/search'}>
                                    <a onClick={this.search.bind(this)}>
                                        <MdSearch size={22} color='whitesmoke'/>
                                    </a>
                                </LinkContainer>
                            </FormGroup>
                             */
                        }
                        <div onKeyPress={event => {
                            if (event.key === "Enter") {
                                window.location=('/#/search/'+localStore.navSearchItem.replace(/\s/g, ''));
                                window.location.reload();
                            }
                        }}>
                            <FormGroup>
                                <Suggest/>
                            </FormGroup>
                            <FormGroup style={{marginLeft: '1em'}}>
                                <a onClick={ ()=>{window.location = ('/#/search/'+localStore.navSearchItem.replace(/\s/g, ''));
                                                        window.location.reload();}}>
                                     <MdSearch size={22} color='whitesmoke'/>
                                </a>
                            </FormGroup>
                        </div>
                    </Navbar.Form>
                </Navbar>
            </div>
        )
    }

}
