import React from 'react';
import { BrowserRouter, Route, Link, Switch, HashRouter, Redirect } from 'react-router-dom'

import { observer } from 'mobx-react'
import localStore from '../src/localStore.js'
import auth from '../src/auth.js';

import Home from './components/Pages/General/Home.jsx';
import NotFound from './components/Pages/General/NotFound.jsx';
import Login from './components/Pages/General/Login.jsx';
import Search from './components/Pages/ReactComponents/SearchResult.jsx';
import Footer from './components/Pages/ReactComponents/Footer.jsx';
import Auth from './components/Pages/General/Dashboard.jsx';
import SignUp from './components/Pages/General/SignUp.jsx';
import Doc from './components/Pages/General/Documentation.jsx';
import Services from './components/Pages/General/Services.jsx';

@observer export default class App extends React.Component {
  constructor(){
  	super();
  	this.state = {
  		title : "TBA",
  	};
  }

  loggedIn(){
      auth.validateToken(localStore.sessionToken);
      return localStore.isLogged;
  }

  render() {
    return (

      <HashRouter>
        <div >
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/login' render={() => (
                this.loggedIn() ? (
                    <Home/>
                ) : (
                    <Login />
                )
            )}/>
            <Route path='/search/*' component={Search}/>
            <Route path='/signup' render={() => (
                this.loggedIn() ? (
                    <Home/>
                ) : (
                    <SignUp />
                )
            )}/>
            <Route path='/services' component={Services}/>
            <Route path='/doc' component={Doc}/>
              <Route path='/auth' render={() => (
                this.loggedIn() ? (
                    <Auth/>
                ) : (
                    <Redirect to='/' />
                )
            )}/>
            <Route path='*' component={NotFound}/>
          </Switch>
            <Footer />
        </div>
     </HashRouter>

    );
  }
}