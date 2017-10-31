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
            ready: false
        };
    }

    componentDidMount(){
        this.getStuff();
    }

    async getStuff(){
        //Get Info for looking up stuff
        let user = new dbuser();
        let stuff = {Service: [], Specialty: [] };

        await user.getAllServices( function(result){
            result.map((i)=> {
                stuff.Service.push(i.name);
            });

        });
        await user.getAllSpecialties( function(res){
            res.map((i)=> {
                stuff.Specialty.push(i.name);
            })
            localStore.searchSuggestions = stuff;
            this.setState({ready: true});
        }.bind(this));
    }

    search(){
        let path = window.location.href.split('/');
        window.location=('/#/search/'+localStore.navSearchItem.replace(/\s/g, ''));
        if(path[path.length-2] !== '#'){
            setTimeout(function(){
                window.location.reload();
            }, 400);
        }
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
                            <a href="#" style={{fontSize: '150%', color:'whitesmoke'}}>
                                <strong>PlaceHealth</strong>
                            </a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem eventKey={1} href="#/doc">
                                <span style={{fontSize: '150%', color:'whitesmoke' , opacity:0.8}}>Documentación</span>
                            </NavItem>
                        </Nav>
                        <Nav>
                            <NavItem eventKey={2} href="#/auth">
                            {
                                localStore.isLogged && (   //Change this token plz. or not
                                    <span style={{fontSize: '150%', color:'whitesmoke' , opacity:0.8}}>Dashboard</span>
                                )
                            }
                            </NavItem>
                        </Nav>
                        <Nav pullRight>
                            {
                                localStore.isLogged ? (
                                    <NavItem eventKey={3} href="#" >
                                        <span style={{fontSize: '150%', color: 'whitesmoke', opacity:0.8}} onClick={this.logout.bind(this)}>
                                            Logout
                                        </span>
                                    </NavItem>
                                ): (
                                    <NavItem eventKey={3} href="#/login" className="navbarLog">
                                        <span style={{fontSize: '150%', color: 'whitesmoke', opacity:0.8}}>
                                            Login
                                        </span>
                                        /*<MdAccountBox size={34} color='whitesmoke'/>*/
                                    </NavItem>
                                )
                            }
                        </Nav>
                        <Nav pullRight>
                            <Navbar.Form pullRight>
                                <div onKeyPress={event => {
                                    if (event.key === "Enter") {
                                        this.search();
                                    }
                                }}>
                                    {
                                        this.state.ready === true &&(
                                            <div>
                                                <FormGroup>
                                                    <Suggest/>
                                                </FormGroup>
                                                <FormGroup style={{marginLeft: '1em'}}>
                                                    <LinkContainer to={'/search/'+localStore.navSearchItem.replace(/\s/g, '')}>
                                                        <a onClick={this.search}>
                                                            <MdSearch size={22} color='whitesmoke'/>
                                                        </a>
                                                    </LinkContainer>
                                                </FormGroup>
                                            </div>
                                        )
                                    }
                                </div>
                            </Navbar.Form>
                        </Nav>

                    </Navbar.Collapse>
                </Navbar>






            </div>
        )
    }

}
