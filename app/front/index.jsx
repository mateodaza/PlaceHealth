import React from 'react';
import { BrowserRouter, Route, Link, Switch, HashRouter, Redirect } from 'react-router-dom'

import { observer } from 'mobx-react'
import localStore from '../src/localStore.js'

import Home from './components/Pages/General/Home.jsx';
import NotFound from './components/Pages/General/NotFound.jsx';
import Login from './components/Pages/General/Login.jsx';
import Search from './components/Pages/ReactComponents/SearchResult.jsx';
import Footer from './components/Pages/ReactComponents/Footer.jsx';
import Auth from './components/Pages/General/Dashboard.jsx';


@observer export default class App extends React.Component {
  constructor(){
  	super();
  	this.state = {
  		title : "TBA",
  	};
  }

  loggedIn(){
    return true;
  }

  render() {
    return (

      <HashRouter>
        <div >
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path='/login' component={Login}/>
            <Route path='/search' component={Search}/>
            <Route path="/auth" render={() => (
                this.loggedIn() ? (
                    <Auth/>
                ) : (
                    <Redirect to="/" />
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