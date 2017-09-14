import React from 'react';
import { BrowserRouter, Route, Link, Switch, HashRouter } from 'react-router-dom'

import { observer } from 'mobx-react'
import localStore from '../src/localStore.js'

import Home from './components/Pages/General/Home.jsx';
import NotFound from './components/Pages/General/NotFound.jsx';
import About from './components/Pages/General/About.jsx';
import Login from './components/Pages/General/Login.jsx';


@observer export default class App extends React.Component {
  constructor(){
  	super();
  	this.state = {
  		title : "TBA",
  	};
  }

  render() {
    return (
      <HashRouter>
        <div>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path='/about' component={About}/>
            <Route path='/login' component={Login}/>
            <Route path='*' component={NotFound}/>
          </Switch>
        </div>
     </HashRouter>

    );
  }
}