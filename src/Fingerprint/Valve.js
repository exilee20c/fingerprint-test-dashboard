import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Fingerprint2 from 'fingerprintjs2';

class Valve extends Component {
  constructor() {
    super();

    this.state = {
      fingerprint: ""
    };
  }

  getFingerprint() {
    let that = this;
    new Fingerprint2().get(function(result, components) {
      that.setState({
        fingerprint: {
          result: result, //a hash, representing your device fingerprint
          components: components // an array of FP components
        }
      });
    });
  }

  componentDidMount() {
    this.getFingerprint();
  }

  render() {
    return (
      <div>
        <div className="page-header">
          <h1>fingerprintjs2<small> by Valve</small></h1>
        </div>
        <ol className="breadcrumb">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/">Fingerprint</Link></li>
          <li className="active">fingerprintjs2</li>
        </ol>
        <div className="alert alert-info" role="alert">
          A hash, representing your device fingerprint
          <strong> {this.state.fingerprint.result} </strong>
          has been generated!
        </div>
      </div>
    );
  }
}

export default Valve;