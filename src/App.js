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
          <div className="page-header">
            <h1><Link to="/">Javascript Fingerprint<small> 브라우져를 식별하기 위한 자바스크립트 라이브러리</small></Link></h1>
          </div>
          <div className="col-lg-3">
            <ul className="nav nav-pills nav-stacked">
              <NavItem to="/valve">Valve/fingerprintjs2</NavItem>
              <NavItem to="/client">ClientJS</NavItem>
              <NavItem to="/fingerprint">fingerprint</NavItem>
              <NavItem to="/rynr">rynr/fingerprint.js</NavItem>
              <NavItem to="/carlo">carlo/jquery-browser-fingerprint</NavItem>
            </ul>
          </div>
          <div className="col-lg-9">
            <Route exact path="/" component={Home}/>
            <Route path="/valve" component={Valve}/>
            <Route path="/client" component={Client}/>
            <Route path="/fingerprint" component={Fingerprint}/>
            <Route path="/rynr" component={Rynr}/>
            <Route path="/carlo" component={Carlo}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
