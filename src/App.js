import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Home from './Home';
import {
  Valve,
  Client,
  Fingerprint,
  Rynr,
  Carlo
} from './Fingerprint';
import NavItem from './NavItem';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="page-header col-xs-12">
            <h1><Link to="/">Javascript Fingerprint<small> 브라우저를 식별하기 위한 자바스크립트 라이브러리</small></Link></h1>
          </div>
          <div className="col-xs-12 col-sm-5 col-md-4 col-lg-3">
            <ul className="nav nav-pills nav-stacked">
              <NavItem to="/valve">Valve/fingerprintjs2</NavItem>
              <NavItem to="/client">ClientJS</NavItem>
            </ul>
          </div>
          <div className="col-xs-12 col-sm-7 col-md-8 col-lg-9">
            <Route exact path="/" component={Home}/>
            <Route path="/valve" component={Valve}/>
            <Route path="/client" component={Client}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
